import {
  InstantSearchProps,
  RefinementList,
  Hits,
  Configure,
} from "react-instantsearch";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import { SearchBy } from "./search-input";
import { Hit } from "./hit";
export const dynamic = "force-dynamic";

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
        <Hits
          hitComponent={Hit}
          classNames={{
            list: "grid grid-cols-4 gap-6",
          }}
        />
      </div>
    </InstantSearchNext>
  );
}
