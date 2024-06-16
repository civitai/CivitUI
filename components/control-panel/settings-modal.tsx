import { Dialog, DialogTrigger, DialogPortal, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Button } from "@/components/ui/button";

export const SettingsModal = ({ setOpen }: any) => (
    <DialogPortal>
      <DialogContent className="fixed inset-0 z-50 flex items-center flex-col justify-center p-4">
        <div className="bg-black p-6 rounded-lg shadow-lg relative">
            <DialogTitle className="text-lg font-bold">Settings</DialogTitle>
            {/* Add your settings form or content here */}
            <div className="mt-4 flex justify-end space-x-2">
              <DialogClose asChild>
                <Button className="absolute top-2 right-2 p-1 bg-transparent hover:bg-transparent border-none shadow-none" onClick={() => setOpen(false)} variant="outline">
                    <Cross2Icon />
                </Button>
              </DialogClose>
            </div>
        </div>
      </DialogContent>
    </DialogPortal>
);