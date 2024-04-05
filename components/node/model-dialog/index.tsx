import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import ModelGallery from "./gallery";

export function ModelDialog() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full">
          Select
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[90vh]">
        <div className="mx-auto w-full py-4 px-32 overflow-y-scroll">
          <ModelGallery />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
