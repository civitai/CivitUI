"use client";

import {
  connectSortBy,
  connectRefinementList,
  connectSearchBox,
} from "react-instantsearch-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SortByItem {
  label: string;
  value: string;
}

// Define the props expected by your component explicitly
interface CustomSortByProps {
  items: SortByItem[];
  refine: (value: string) => void;
  currentRefinement: string;
}

// Use the connectSortBy HOC with an explicit function parameter type
export const SortBy = connectSortBy<CustomSortByProps>(
  (props: CustomSortByProps) => {
    const { items, refine, currentRefinement } = props;
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <ListFilter className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              {items.find((item) => item.value === currentRefinement)?.label}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {items.map((item) => (
            <DropdownMenuCheckboxItem
              key={item.value}
              onClick={() => refine(item.value)}
              checked={item.value === currentRefinement}
            >
              {item.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);

interface RefinementListItem {
  label: string;
  value: string;
  isRefined: boolean;
}

interface CustomRefinementListProps {
  items: RefinementListItem[];
  refine: (value: string) => void;
}

export const RefinementList = connectRefinementList<CustomRefinementListProps>(
  ({ items, refine }) => (
    <div>
      {items.map((item) => (
        <button
          key={item.value}
          onClick={() => refine(item.value)}
          style={{ background: item.isRefined ? "blue" : "transparent" }}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
);

export const SearchBox = connectSearchBox(({ currentRefinement, refine }) => (
  <Input
    type="search"
    value={currentRefinement}
    onChange={(event) => refine(event.currentTarget.value)}
    placeholder="Search..."
  />
));
