"use client";

import { useEffect, useRef, useState } from "react";
import {
  InstantSearchProps,
  Configure,
  useInfiniteHits,
} from "react-instantsearch";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import { SearchBy } from "./search-input";
import { Hit } from "./hit";
import { Icons } from "../ui/icons";

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

// todo: 1. add suspense when loading data
export function Search({ type }: SearchProps) {
  return (
    <InstantSearchNext
      searchClient={searchClient}
      indexName={MODELS_SEARCH_INDEX}
      routing={false}
    >
      <div className="flex flex-col gap-5">
        <SearchBy type={type} />
        <Configure filters={`type=${type} AND canGenerate=true`} />
        <InfiniteHits />
      </div>
    </InstantSearchNext>
  );
}

function InfiniteHits() {
  const { hits, isLastPage, showMore } = useInfiniteHits();
  const sentinelRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (hits.length > 0) {
      setIsLoading(false); // Set loading false when initial hits are loaded
    }
  }, [hits]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLastPage) {
        setIsLoading(true); // Set loading true when requesting more items
        showMore();
      }
    });

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

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
      {isLoading && (
        <div className="col-span-4 flex justify-center mt-14">
          <Icons.spinner className="w-5 h-5 animate-spin" />
        </div>
      )}
      <div ref={sentinelRef} style={{ width: "100%", height: "1px" }}></div>
    </div>
  );
}
