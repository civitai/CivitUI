"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { PlayIcon, FilePlusIcon, UpdateIcon, PinTopIcon, PinBottomIcon, TrashIcon, GearIcon } from "@radix-ui/react-icons";
import { WorkflowPageComponent } from "./workflow-page";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
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

  const { onSubmit, queue, onDeleteFromQueue, promptError, onEdgesAnimate } =
    useAppStore(
      useShallow((state) => ({
        onSubmit: state.onSubmit,
        queue: state.queue,
        onDeleteFromQueue: state.onDeleteFromQueue,
        promptError: state.promptError,
        onEdgesAnimate: state.onEdgesAnimate,
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
      {/* TODO: Fix MultiStepLoader */}
      <Loader loadingStates={nodes} loading={loading} />

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

  const handleSheetTriggerClick = () => {
    setIsSheetOpen(!isSheetOpen);
  };

  return (
    <Sheet modal={true} open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <div className="fixed right-4 top-4 flex flex-col gap-3 m-2">
        <TooltipProvider delayDuration={0}>
          <QueuePromptButton />

          <TooltipButton content="Save/load workflows">
            <SheetTrigger asChild>
              <Button
                onClick={() => handleSheetTriggerClick()}
                className="relative rounded-3xl shadow-lg hover:bg-background hover:rounded-lg transition-all duration-200 h-12 w-12"
                variant="outline"
              >
                <FilePlusIcon />
              </Button>
            </SheetTrigger>
          </TooltipButton>

          <TooltipButton content="Recalculate node positions">
            <SheetTrigger asChild>
              <Button
                onClick={() => handleSheetTriggerClick()}
                className="relative rounded-3xl shadow-lg hover:bg-background hover:rounded-lg transition-all duration-200 h-12 w-12"
                variant="outline"
              >
                <UpdateIcon />
              </Button>
            </SheetTrigger>
          </TooltipButton>

          <TooltipButton content="Toggle parameter dropdowns">
            <SheetTrigger asChild>
              <Button
                onClick={() => handleSheetTriggerClick()}
                className="relative rounded-3xl shadow-lg hover:bg-background hover:rounded-lg transition-all duration-200 h-12 w-12"
                variant="outline"
              >
                <PinBottomIcon />
              </Button>
            </SheetTrigger>
          </TooltipButton>

          <TooltipButton content="Clear graph">
            <SheetTrigger asChild>
              <Button
                onClick={() => handleSheetTriggerClick()}
                className="relative rounded-3xl shadow-lg hover:bg-background hover:rounded-lg transition-all duration-200 h-12 w-12"
                variant="outline"
              >
                <TrashIcon />
              </Button>
            </SheetTrigger>
          </TooltipButton>

          <TooltipButton content="Settings">
            <SheetTrigger asChild>
              <Button
                onClick={() => handleSheetTriggerClick()}
                className="relative rounded-3xl shadow-lg hover:bg-background hover:rounded-lg transition-all duration-200 h-12 w-12"
                variant="outline"
              >
                <GearIcon />
              </Button>
            </SheetTrigger>
          </TooltipButton>
        </TooltipProvider>
      </div>
      <SheetContent side={"left"} className="overflow-y-scroll">
        <WorkflowPageComponent />
      </SheetContent>
    </Sheet>
  );
};

export default React.memo(ControlPanel);