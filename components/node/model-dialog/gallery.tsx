"use client";

import { ModelItem } from "./model-item";
import { useEffect, useState } from "react";
import {
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ArrowDownWideNarrow, Clock4, ListFilter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BoxesContainer } from "@/components/ui/interactive-bg-boxes";

import { useInfiniteHits } from "react-instantsearch-hooks";
import {
  MODELS_SEARCH_INDEX,
  ModelSearchIndexSortBy,
} from "@/components/search/model.parser";
import { SearchLayout } from "@/components/search";
import {
  RefinementList,
  SearchBox,
  SortBy,
} from "@/components/search/search-input";

interface Model {
  id: number;
  name: string;
  description: string;
  modelVersions: {
    id: number;
    name: string;
    images: {
      url: string;
    }[];
    stats: {
      downloadCount: number;
      thumbsUpCount: number;
    };
  }[];
}

export default function Gallery() {
  return (
    <SearchLayout indexName={MODELS_SEARCH_INDEX}>
      <SearchLayout.Filters>
        <SearchBox />
        <RefinementList attribute="version.baseModel" />
        <RefinementList attribute="type" />
        <RefinementList attribute="checkpointType" />
        {/* Add more filters */}
      </SearchLayout.Filters>
      <SearchLayout.Content>
        <SortBy
          items={[
            { label: "Relevancy", value: ModelSearchIndexSortBy[0] as string },
            {
              label: "Most Downloaded",
              value: ModelSearchIndexSortBy[2] as string,
            },
            // ... other sort options
          ]}
          defaultRefinement={ModelSearchIndexSortBy[0]}
        />
        <ModelsHitList />
      </SearchLayout.Content>
    </SearchLayout>
  );
}

function ModelsHitList() {
  const { hits } = useInfiniteHits<any>();

  return (
    <div>
      {hits.map((hit) => (
        <ModelItem key={hit.objectID} hit={hit} />
      ))}
    </div>
  );
}
