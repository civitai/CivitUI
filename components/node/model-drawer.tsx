import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { BoxesContainer } from "@/components/ui/interactive-bg-boxes";
import { Search } from "@/components/search";

export function ModelDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full">
          Select
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[90vh]">
        <div className="mx-auto w-full py-4 px-32 overflow-y-scroll">
          <div className="relative w-full overflow-hidden bg-background flex flex-col justify-start pt-20 pb-14">
            <div
              className="absolute inset-0 w-full h-full bg-background z-20 pointer-events-none"
              style={{
                maskImage:
                  "radial-gradient(circle at center, transparent, white)",
              }}
            />
            <BoxesContainer />
            <h1
              className={
                "w-fit md:text-4xl text-xl font-semibold relative z-20"
              }
            >
              Checkpoint Models
            </h1>
            <p className="w-fit text-muted-foreground font-light mt-2 relative z-20 tracking-wide">
              Select a model to use in the workflow.
            </p>
          </div>

          <div className="flex mb-12 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent" />

          <Search />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
