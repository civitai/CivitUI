import { Dialog, DialogTrigger, DialogPortal, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@radix-ui/react-dialog';
import { Select, SelectContent, SelectItem, SelectIcon, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

import { MoveIcon } from "@radix-ui/react-icons";
import { Cross2Icon } from '@radix-ui/react-icons';
import { Button } from "@/components/ui/button";
import { startCase } from "lodash-es";
import { useAppStore } from "@/store";
import { edgeTypeList } from "@/types";
import { useShallow } from "zustand/react/shallow";
import { EdgeType } from "@/types";

const TooltipButton = ({ content, children }: any) => 
    <Tooltip>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent side="left" className="text-xs">
        {content}
      </TooltipContent>
    </Tooltip>

type SettingOption<T> = {
    label: string;
    item: (options: T[]) => JSX.Element;
    options: T[];
}

type SettingsOptions = [
    SettingOption<string>, 
    SettingOption<EdgeType>
];

export const SettingsModal = ({ open, setOpen }: any) => {
    const { 
        onUpdateFrontend,
        edgeType,
        onEdgesType,
    } = useAppStore(useShallow((state) => ({
          onUpdateFrontend: state.onUpdateFrontend,
          edgeType: state.edgeType,
          onEdgesType: state.onEdgesType,
        }))
    );

    const settings: SettingsOptions = [
        {
            label: 'Client Frontend',
            item: (options: string[]) => 
                <Select onValueChange={async () => onUpdateFrontend()}>
                    <SelectTrigger className="w-32">
                        <SelectValue placeholder="sabre" />
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((option) => (
                            <SelectItem key={option} value={option}>
                                {option}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>,
            options: ['classic', 'sabre'],
        },
        {
            label: 'Edge Type',
            item: (options: EdgeType[]) =>
                <Select value={edgeType.name} onValueChange={n => onEdgesType(edgeTypeList.find(e => e.name === n) as EdgeType)}>
                    <SelectTrigger className="w-32">
                        <SelectValue placeholder={
                            <div className="flex flex-row justify-start gap-2 items-center w-full">
                                {edgeType.icon}
                                {startCase(edgeType.name)}
                            </div>
                        } />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                        {options.map((option) => (
                            <SelectItem className="w-full" key={option.name} value={option.name}>
                                <div className="flex flex-row justify-start gap-2 items-center w-full">
                                    {option.icon}
                                    {startCase(option.name)}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>,
            options: edgeTypeList,
        }
    ]

    return (
        <DialogPortal>
            <DialogContent className="absolute inset-0 w-96 h-52 p-4 mx-auto my-auto bg-black rounded-[12px]">
                <div className="w-full h-full bg-black p-1 shadow-lg relative">
                    <DialogTitle className="text-lg font-bold mt-0.5 mr-10">Settings</DialogTitle>
                    <DialogClose asChild>
                        <Button className="absolute top-0 right-2 p-1 bg-transparent hover:bg-transparent border-none shadow-none" onClick={() => setOpen(false)} variant="outline">
                            <Cross2Icon />
                        </Button>
                    </DialogClose>
                    <div className="flex flex-col gap-2 mt-4">
                        {settings.map((setting: any) => (
                            <div key={setting.label} className="flex flex-row justify-between items-center gap-1">
                                <label className="text-sm font-semibold">{setting.label}</label>
                                {setting.item(setting.options)}
                            </div>
                        ))}
                    </div>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="flex flex-col gap-2 mt-4" style={{ float: 'right', margin: '6px' }} title="Recalculate Node Positions">
                                <Button
                                    onClick={() => {}}
                                    className="relative rounded-3xl shadow-lg hover:bg-background hover:rounded-lg transition-all duration-200 h-12 w-12"
                                    variant="outline"
                                >
                                    <MoveIcon />
                                </Button>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="left" className="text-xs bg-black text-white">
                                    Recalculate node positions
                            </TooltipContent>
                        </Tooltip>
                </div>
            </DialogContent>
        </DialogPortal>
    );
}
