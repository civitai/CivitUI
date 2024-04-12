import * as React from "react";
import {
  CheckCircledIcon,
  CheckIcon,
  CircleIcon,
  PlusCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  useClearRefinements,
  useConfigure,
  useRefinementList,
} from "react-instantsearch";

enum NsfwLevel {
  PG = 1,
  PG13 = 2,
  R = 4,
  X = 8,
  XXX = 16,
  Blocked = 32,
}

const browsingLevels = [
  {
    value: NsfwLevel.PG,
    label: "PG",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: NsfwLevel.PG13,
    label: "PG13",
    icon: CircleIcon,
  },
  {
    value: NsfwLevel.R,
    label: "R",
    icon: StopwatchIcon,
  },
  {
    value: NsfwLevel.X,
    label: "X",
    icon: CheckCircledIcon,
  },
];

export const BrowsingLevel = ({
  attributeName = "nsfwLevel",
  filters = "",
}: {
  attributeName?: string;
  filters?: string;
}) => {
  const { items, refine } = useRefinementList({
    attribute: attributeName,
  });

  const { refine: clearRefinements } = useClearRefinements({
    includedAttributes: [attributeName],
  });

  // Determine selected values based on the refinement state
  const selectedValues = items
    .filter((item) => item.isRefined)
    .map((item) => item.value);

  // Construct the nsfwLevel filter
  const nsfwLevelFilter = selectedValues
    .map((value) => `${attributeName}:${value}`)
    .join(" OR ");

  // Combine the nsfwLevel filter with the existing filters
  const combinedFilters = nsfwLevelFilter
    ? `${filters} AND (${nsfwLevelFilter})`
    : filters;

  // Apply the combined filters using useConfigure
  useConfigure({
    filters: combinedFilters,
  });

  // todo: 1. fix command items to be selectable and store browsing level in cookies
  // 2. add browsing level to the search params

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="border-dashed">
            <PlusCircledIcon className="mr-2 h-4 w-4" />
            Browsing Level
            {selectedValues.length > 0 && (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal lg:hidden"
                >
                  {selectedValues.length}
                </Badge>
                <div className="hidden space-x-1 lg:flex">
                  {selectedValues.length > 2 ? (
                    <Badge
                      variant="secondary"
                      className="rounded-sm px-1 font-normal"
                    >
                      {selectedValues.length} selected
                    </Badge>
                  ) : (
                    selectedValues.map((value) => {
                      const option = browsingLevels.find(
                        (opt) => opt.value === Number(value)
                      );
                      return (
                        <Badge
                          key={value}
                          variant="secondary"
                          className="rounded-sm px-1 font-normal"
                        >
                          {option?.label}
                        </Badge>
                      );
                    })
                  )}
                </div>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Browsing Level" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {browsingLevels.map((option) => {
                  const isSelected = selectedValues.includes(
                    option.value.toString()
                  );
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => refine(option.value.toString())}
                      className="data-[disabled]:pointer-events-auto data-[disabled]:opacity-100"
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <CheckIcon className={cn("h-4 w-4")} />
                      </div>
                      {option.icon && (
                        <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                      )}
                      <span>{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              {selectedValues.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => {
                        clearRefinements();
                      }}
                      className="justify-center text-center data-[disabled]:pointer-events-auto data-[disabled]:opacity-100"
                    >
                      Clear filters
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};
