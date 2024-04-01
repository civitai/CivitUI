"use client";

import { PlayIcon } from "@radix-ui/react-icons";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
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
    <>
      {/* TODO: Fix MultiStepLoader */}
      <Loader loadingStates={nodes} loading={loading} />

      <Button
        className={cn(
          "relative rounded-2xl shadow-[0px_0px_12px_rgba(72,66,66,0.5)] bg-gradient-to-b text-white dark:text-black dark:from-white dark:to-blue-50 ring-2 ring-blue-50 ring-opacity-60",
          "from-slate-800 to-slate-700 ring-slate-400",
          "hover:rounded-lg transition-all duration-300"
        )}
        onClick={handleRun}
        size={"icon"}
      >
        <PlayIcon />
      </Button>
    </>
  );
};
