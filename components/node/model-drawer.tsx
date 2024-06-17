import React from "react";
import { startCase } from "lodash-es";

import { Button } from "@/components/ui/button";
import { BoxesContainer } from "@/components/ui/interactive-bg-boxes";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

interface ModelDrawerProps {
  type: string;
}

const ModelDrawerComponent = ({ type }: ModelDrawerProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">
          Select
        </Button>
      </SheetTrigger>
      <SheetContent
        className="h-[80vh]"
        side="bottom"
        onContextMenu={(e) => e.preventDefault()}
      >
        <div className="mx-auto w-full py-4 px-32 overflow-y-scroll">
          <div className="relative w-full overflow-hidden bg-background flex flex-col justify-start pt-20 pb-14">
            <div
              className="absolute inset-0 w-full h-full bg-background z-20 pointer-events-none"
              style={{
                maskImage:
                  "radial-gradient(circle at center, transparent, white 80%)",
              }}
            />
            <BoxesContainer />
            <h1
              className={
                "w-fit md:text-4xl text-xl font-semibold relative z-20"
              }
            >
              {startCase(type)} Models
            </h1>
            <p className="w-fit text-muted-foreground font-light mt-2 relative z-20 tracking-wide">
              Select a model to use in the workflow.
            </p>
          </div>
          <div className="w-fit md:text-4xl text-xl font-semibold absolute right-48 top-32 z-20">
            <input
              name="search"
              type="text"
              className="px-9 flex h-6 w-full rounded-md border border-input bg-black text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Search..."
              // onChange={handleKeywordsChange}
              onKeyDown={e => e.stopPropagation()}
            />
            <div
              className="absolute inset-y-0 left-0 pl-2  
                flex items-center  
                pointer-events-none"
            >
              <MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div className="flex mb-12 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent" />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export const ModelDrawer = React.memo(ModelDrawerComponent)