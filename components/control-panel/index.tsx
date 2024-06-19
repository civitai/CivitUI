"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { PlayIcon, FilePlusIcon, MoveIcon, ChevronDownIcon, ChevronUpIcon, TrashIcon, GearIcon } from "@radix-ui/react-icons";
import { WorkflowPage } from "./workflow-page";
import { ClearDialog } from "./clear-dialog";
import { SettingsModal } from "./settings-modal";
import { useAppStore } from "@/store";
import { useShallow } from "zustand/react/shallow";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const nodes = [
  {
    text: "CheckpointLoaderSimple",
  },
  {
    text: "KSampler",
  },
];

const TooltipButton = ({ content, children }: any) => 
  <Tooltip>
    <TooltipTrigger asChild>
      {children}
    </TooltipTrigger>
    <TooltipContent side="left" className="text-xs">
      {content}
    </TooltipContent>
  </Tooltip>

export const QueuePromptButton = () => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const { onSubmit, queue, onDeleteFromQueue, promptError, onEdgesAnimate, expanded, onExpand } =
    useAppStore(
      useShallow((state) => ({
        onSubmit: state.onSubmit,
        queue: state.queue,
        onDeleteFromQueue: state.onDeleteFromQueue,
        promptError: state.promptError,
        onEdgesAnimate: state.onEdgesAnimate,
        onExpand: state.onExpand,
        expanded: state.expanded,
      }))
    );

  useEffect(() => {
    if (promptError !== undefined) {
      toast.error(promptError);
    }
  }, [promptError, count]);

  useEffect(() => {
    onEdgesAnimate(queue.length > 0);
  }, [queue, onEdgesAnimate]);

  const handleRun = useCallback(() => {
    setLoading(true);
    onSubmit();
    setCount((prevCount) => prevCount + 1);
  }, [onSubmit]);

  const queueHasItems = queue.length > 0;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className={cn(
            "relative h-12 w-12 rounded-3xl shadow-lg bg-gradient-to-b text-white dark:text-black dark:from-white dark:to-blue-50 ring-2 ring-blue-50 ring-opacity-60",
            "from-slate-800 to-slate-700 ring-slate-400",
            "hover:rounded-lg transition-all duration-200"
          )}
          onClick={handleRun}
        >
          <PlayIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left" className="text-xs bg-white text-black">
        Queue prompt
      </TooltipContent>
    </Tooltip>
  );
};

const ControlPanel = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const { expanded, onExpand } = useAppStore((state) => ({
    expanded: state.expanded,
    onExpand: state.onExpand,
  }));

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    onExpand();
  }

  return (
    <TooltipProvider delayDuration={0}>
      <div className="fixed right-4 top-4 flex flex-col gap-3 m-2">
        <QueuePromptButton />
        <Sheet modal={true} open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <TooltipButton content="Save/load workflows">
                <SheetTrigger asChild>
                  <Button
                    onClick={() => setIsSheetOpen(!isSheetOpen)}
                    className="relative rounded-3xl shadow-lg hover:bg-background hover:rounded-lg transition-all duration-200 h-12 w-12"
                    variant="outline"
                  >
                    <FilePlusIcon />
                  </Button>
                </SheetTrigger>
              </TooltipButton>
          <SheetContent side={"left"} className="overflow-y-scroll">
            <WorkflowPage />
          </SheetContent>
        </Sheet>
        <TooltipButton content="Recalculate node positions">
          <Button
            onClick={() => {}}
            className="relative rounded-3xl shadow-lg hover:bg-background hover:rounded-lg transition-all duration-200 h-12 w-12"
            variant="outline"
          >
            <MoveIcon />
          </Button>
        </TooltipButton>

        <TooltipButton content="Toggle parameter dropdowns">
          <Button
            onClick={() => handleExpand()}
            className="relative rounded-3xl shadow-lg hover:bg-background hover:rounded-lg transition-all duration-200 h-12 w-12"
            variant="outline"
          >
            {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </Button>
        </TooltipButton>
        <Dialog open={isClearDialogOpen} onOpenChange={setIsClearDialogOpen}>
          <TooltipButton content="Clear graph">
            <DialogTrigger asChild>
              <Button
                onClick={() => setIsClearDialogOpen(true)}
                className="relative rounded-3xl shadow-lg hover:bg-background hover:rounded-lg transition-all duration-200 h-12 w-12"
                variant="outline"
              >
                <TrashIcon />
              </Button>
            </DialogTrigger>
          </TooltipButton>
          <ClearDialog setOpen={setIsClearDialogOpen} />
        </Dialog>
        <Dialog open={isSettingsModalOpen} onOpenChange={setIsSettingsModalOpen}>
          <TooltipButton content="Settings">
            <DialogTrigger asChild>
              <Button
                onClick={() => {}}
                className="relative rounded-3xl shadow-lg hover:bg-background hover:rounded-lg transition-all duration-200 h-12 w-12"
                variant="outline"
              >
                <GearIcon />
              </Button>
            </DialogTrigger>
          </TooltipButton>
          <SettingsModal open={isSettingsModalOpen} setOpen={setIsSettingsModalOpen} />
        </Dialog>
      </div>
    </TooltipProvider>
  );
};

export default React.memo(ControlPanel);