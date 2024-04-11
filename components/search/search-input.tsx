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
  const { refine } = useSearchBox();

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
        <BrowsingLevel filters={type} />
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
  const {
    start: active,
    range,
    refine,
  } = useRange({ attribute: "lastVersionAtUnix" });

  const startDate =
    active[0] && active[0] !== -Infinity ? new Date(active[0]) : null;
  const endDate =
    active[1] && active[1] !== Infinity ? new Date(active[1]) : null;
  const maxDate = range.max ? new Date(range.max) : undefined;
  const minDate = range.min ? new Date(range.min) : undefined;

  const onSetTimePeriod = (period: "all" | "year" | "month") => {
    let startTimestamp, endTimestamp;

    if (period === "all") {
      startTimestamp = range.min;
      endTimestamp = range.max;
    } else {
      const now = new Date();
      endTimestamp = now.getTime();

      if (period === "year") {
        const oneYearAgo = new Date(
          now.getFullYear() - 1,
          now.getMonth(),
          now.getDate()
        );
        startTimestamp = oneYearAgo.getTime();
      } else if (period === "month") {
        const oneMonthAgo = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate()
        );
        startTimestamp = oneMonthAgo.getTime();
      }
    }

    refine([startTimestamp, endTimestamp]);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Clock4 className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            {startDate && endDate
              ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
              : "All Time"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={!startDate && !endDate}
          onCheckedChange={() => onSetTimePeriod("all")}
        >
          All Time
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={
            startDate &&
            endDate &&
            startDate.getFullYear() === endDate.getFullYear() - 1
          }
          onCheckedChange={() => onSetTimePeriod("year")}
        >
          Past Year
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={
            startDate &&
            endDate &&
            startDate.getMonth() === endDate.getMonth() - 1
          }
          onCheckedChange={() => onSetTimePeriod("month")}
        >
          Past Month
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
