"use client";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

const CheckIcon = ({ className }: { className?: string }) => {
  // ... (same as before)
};

const CheckFilled = ({ className }: { className?: string }) => {
  // ... (same as before)
};

type LoadingState = {
  id: string;
  data: {
    name: string;
    nickname?: string;
  };
};

const LoaderCore = ({
  displayedNodes,
  currentNodeName,
}: {
  displayedNodes: LoadingState[];
  currentNodeName?: string;
}) => {
  return (
    <div className="flex relative justify-end max-w-xl flex-col">
      {displayedNodes.slice(-2).map((node, index) => {
        const name = node.data?.nickname || node.data?.name;
        const isActive = name === currentNodeName;
        const isNext = index === displayedNodes.slice(-2).length - 1;

        return (
          <motion.div
            key={node.id}
            className={cn("justify-between flex gap-2 mb-4 items-center")}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isActive || isNext ? 1 : 0.5,
              y: isActive ? 0 : -20,
            }}
            transition={{ duration: 0.5 }}
          >
            <div>
              {!isActive && <CheckIcon />}
              {isActive && (
                <CheckFilled
                  className={cn(
                    "h-4 w-4",
                    "text-black dark:text-lime-500 opacity-100"
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                "text-xs",
                isActive && "text-black dark:text-lime-500 opacity-100"
              )}
            >
              {name}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};

export const MultiStepLoader = ({
  loading,
  className,
}: {
  loading?: boolean;
  className?: string;
}) => {
  const { nodeInProgress } = useAppStore(useShallow((state) => state));
  const [displayedNodes, setDisplayedNodes] = useState<LoadingState[]>([]);

  useEffect(() => {
    if (nodeInProgress) {
      setDisplayedNodes((prevNodes) => {
        const currentNodeIndex = prevNodes.findIndex(
          (node) => node.id === nodeInProgress.id
        );
        if (currentNodeIndex === -1) {
          return [...prevNodes, nodeInProgress];
        }
        return prevNodes;
      });
    }
  }, [nodeInProgress]);

  const currentNodeName =
    displayedNodes[displayedNodes.length - 1]?.data?.nickname ||
    displayedNodes[displayedNodes.length - 1]?.data?.name;

  return (
    <AnimatePresence mode="wait">
      {/* {loading && ( */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={cn("fixed bottom-0 right-8 z-[100] h-[80px]", className)}
      >
        <div className="relative">
          <LoaderCore
            displayedNodes={displayedNodes}
            currentNodeName={currentNodeName}
          />
        </div>
      </motion.div>
      {/* )} */}
    </AnimatePresence>
  );
};
