import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ModelGallery from "./gallery";

export function ModelDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Select
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-6xl h-[900px] p-0 border-0 rounded-lg">
        <ModelGallery />
      </DialogContent>
    </Dialog>
  );
}
