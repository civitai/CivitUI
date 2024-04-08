"use client";

import { InstantSearch, InstantSearchProps } from "react-instantsearch";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { MODELS_SEARCH_INDEX } from "./model.parser";
import { routing } from "@/hooks/use-search-state";

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

const searchIndexes = [MODELS_SEARCH_INDEX] as const;

type SearchIndex = (typeof searchIndexes)[number];

export function SearchLayout({
  children,
  indexName,
}: {
  children: React.ReactNode;
  indexName: SearchIndex;
}) {
  return (
    <InstantSearch
      // Needs re-render. Otherwise the prev. index will screw up the app.
      key={indexName}
      searchClient={searchClient}
      indexName={indexName}
      routing={routing}
    >
      {children}
    </InstantSearch>
  );
}

SearchLayout.Filters = function Filters({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
};

SearchLayout.Content = function Content({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
};
