import {
  InstantSearchProps,
  Configure,
  useInfiniteHits,
} from "react-instantsearch";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import { SearchBy } from "./search-input";
import { Hit } from "./hit";
import { useEffect, useRef } from "react";

export const MODELS_SEARCH_INDEX = "models_v8";

const meilisearch = instantMeiliSearch(
  process.env.NEXT_PUBLIC_SEARCH_HOST as string,
  process.env.NEXT_PUBLIC_SEARCH_CLIENT_KEY,
  { primaryKey: "id", keepZeroFacets: true }
);

const searchClient: InstantSearchProps["searchClient"] = {
  ...meilisearch,
  search(requests) {
    return meilisearch.searchClient.search(requests);
  },
};

interface SearchProps {
  type: string;
}

export function Search({ type }: SearchProps) {
  return (
    <InstantSearchNext
      searchClient={searchClient}
      indexName={MODELS_SEARCH_INDEX}
      routing={false}
    >
      <div className="flex flex-col gap-5">
        <SearchBy type={type} />
        <Configure filters={`type=${type}`} />
        <InfiniteHits />
      </div>
    </InstantSearchNext>
  );
}

function InfiniteHits() {
  const { hits, isLastPage, showMore } = useInfiniteHits();
  const sentinelRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // Only call showMore if:
      // - The sentinel comes into view (isIntersecting)
      // - It's not the last page (meaning there are more results to load)
      if (entries[0].isIntersecting && !isLastPage) {
        showMore();
      }
    });

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    // Cleanup the observer on component unmount
    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [isLastPage, showMore]);

  return (
    <div className="grid grid-cols-4 gap-2 space-y-2">
      {hits.map((hit) => (
        <div key={hit.objectID}>
          <Hit hit={hit} />
        </div>
      ))}

      <div ref={sentinelRef} style={{ width: "100%", height: "1px" }}></div>
    </div>
  );
}
