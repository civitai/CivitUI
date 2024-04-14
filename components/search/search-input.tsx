import { useCallback, useRef } from "react";
import { ArrowDownWideNarrow, Clock4, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useSearchBox, useSortBy, useRange } from "react-instantsearch";
import { ModelSearchIndexSortBy } from "./model.parser";
import { BrowsingLevel } from "./browsing-level";

export const SearchBy = ({ type }: { type: string }) => {
  const timerIdRef = useRef<any>(null);
  const timeoutRef = useRef<number>(500);

  // Debounce the search query
  const queryHook = useCallback(
    (query: string, refine: (query: string) => void) => {
      clearTimeout(timerIdRef.current);
      timerIdRef.current = setTimeout(() => refine(query), timeoutRef.current);
    },
    []
  );

  const { refine } = useSearchBox({ queryHook });

  return (
    <div className="flex justify-between">
      <div className="flex gap-3">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            onChange={(event) => {
              refine(event.currentTarget.value);
            }}
            onKeyDown={(event) => {
              event.stopPropagation();
            }}
            placeholder="Search"
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
          />
        </div>
        <BrowsingLevel type={type} />
      </div>

      <div className="flex gap-2">
        <SortBy />
        <FilterByTimePeriod />
      </div>
    </div>
  );
};

export const SortBy = () => {
  const { currentRefinement, options, refine } = useSortBy({
    items: [
      { label: "Highest Rated", value: ModelSearchIndexSortBy[0] as string },
      { label: "Most Downloaded", value: ModelSearchIndexSortBy[2] as string },
      { label: "Most Liked", value: ModelSearchIndexSortBy[3] as string },
      { label: "Newest", value: ModelSearchIndexSortBy[7] as string },
    ],
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex flex-row justify-start gap-2 min-w-[130px]"
        >
          <ArrowDownWideNarrow className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            {
              options.find((option) => option.value === currentRefinement)
                ?.label
            }
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={option.value === currentRefinement}
            onCheckedChange={() => refine(option.value)}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const FilterByTimePeriod = () => {
  const currentDate = new Date();
  const oneYearAgo = new Date(
    currentDate.getFullYear() - 1,
    currentDate.getMonth(),
    currentDate.getDate()
  ).getTime();
  const oneMonthAgo = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    currentDate.getDate()
  ).getTime();

  const { refine, start } = useRange({
    attribute: "lastVersionAtUnix",
  });

  // Determine the current filter based on the start range
  const currentFilter = (() => {
    if (start[0] === oneYearAgo) return "year";
    if (start[0] === oneMonthAgo) return "month";
    return "all"; // Default to "All Time" if no match
  })();

  const handleFilterChange = (timePeriod: "all" | "year" | "month") => {
    let newStart: [number | undefined, number | undefined] = [
      undefined,
      undefined,
    ];
    switch (timePeriod) {
      case "year":
        newStart[0] = oneYearAgo;
        break;
      case "month":
        newStart[0] = oneMonthAgo;
        break;
      // 'all' case already set to [undefined, undefined]
    }
    refine(newStart);
  };

  // Dynamic label based on currentFilter
  const filterLabel = (() => {
    switch (currentFilter) {
      case "all":
        return "All Time";
      case "year":
        return "Past Year";
      case "month":
        return "Past Month";
    }
  })();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Clock4 className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            {filterLabel}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          onSelect={() => handleFilterChange("all")}
          checked={currentFilter === "all"}
        >
          All Time
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          onSelect={() => handleFilterChange("year")}
          checked={currentFilter === "year"}
        >
          Past Year
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          onSelect={() => handleFilterChange("month")}
          checked={currentFilter === "month"}
        >
          Past Month
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
