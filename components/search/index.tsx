"use client";

import { InstantSearchProps } from "react-instantsearch";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import {
  Hits,
  Highlight,
  RefinementList,
  DynamicWidgets,
} from "react-instantsearch";
import { SearchInput } from "./search-input";
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

function Hit({ hit }: any) {
  return (
    <>
      <Highlight hit={hit} attribute="name" className="Hit-label" />
      <span className="Hit-price">${hit.price}</span>
    </>
  );
}

export function Search() {
  return (
    <InstantSearchNext
      searchClient={searchClient}
      indexName={MODELS_SEARCH_INDEX}
      routing={false}
    >
      <div className="Container">
        <div>
          <DynamicWidgets fallbackComponent={FallbackComponent} />
        </div>
        <div>
          <SearchInput />
          <Hits hitComponent={Hit} />
        </div>
      </div>
    </InstantSearchNext>
  );
}

function FallbackComponent({ attribute }: { attribute: string }) {
  return <RefinementList attribute={attribute} />;
}
