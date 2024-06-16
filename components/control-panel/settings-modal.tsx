import { Dialog, DialogTrigger, DialogPortal, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store";
import { EdgeTypeList } from "@/types";
import { useShallow } from "zustand/react/shallow";

export const SettingsModal = ({ setOpen }: any) => {
    const { edgeType, onEdgesType } = useAppStore(
        useShallow((state) => ({
          edgeType: state.edgeType,
          onEdgesType: state.onEdgesType,
        }))
    );

    const settings = [
        {
            label: 'Client Frontend',
            key: 'Comfy.Frontend',
            type: 'combo',
            options: [
                { label: 'classic', value: 'classic' },
                { label: 'sabre', value: 'sabre' },
            ],
        },
        {
            label: 'Edge Type',
            key: 'Comfy.LinkRenderMode',
            type: 'combo',
            options: [
                { label: 'Bezier', value: 1 },
                { label: 'Straight', value: 2 },
                { label: 'Step', value: 0 },
            ],
        }
    ]

    return (
        <DialogPortal>
            <DialogContent className="fixed inset-0 z-50 flex items-center flex-col justify-center p-4">
                <div className="bg-black p-6 rounded-lg shadow-lg relative">
                    <DialogTitle className="text-lg font-bold">Settings</DialogTitle>
                    {/* Add your settings form or content here */}
                    <DialogClose asChild>
                        <Button className="absolute top-2 right-2 p-1 bg-transparent hover:bg-transparent border-none shadow-none" onClick={() => setOpen(false)} variant="outline">
                            <Cross2Icon />
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </DialogPortal>
    );
}