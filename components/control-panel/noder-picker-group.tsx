"use client";

import PreviewNode from "../node/sd-node/preview-node";
import { NodeItem, Widget } from "@/types";
import { startCase } from "lodash-es";
import { motion } from "framer-motion";
import React, { useCallback, useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

/**
 * @title Node Selector Group Component Properties
 */
interface NodePickerGroupProps {
  /**
   * @title Group Category
   */
  cat: string;

  /**
   * @title Group Data
   */
  data: Widget[];

  /**
   * @title Add Node Event Callback Function
   * @param nodeItem - Node Item
   */
  onAddNode: (nodeItem: NodeItem) => void;

  /**
   * @title Expand/Collapse State
   */
  expand: boolean;
}

const NodePickerGroup = ({
  cat,
  data,
  onAddNode,
  expand,
}: NodePickerGroupProps) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [expandedItems, setExpandedItems] = useState<string[]>(
    expand ? [cat] : []
  );

  const handleDrag = useCallback(
    (event: React.DragEvent<HTMLDivElement> | any, i: Widget) => {
      event.dataTransfer.setData("application/reactflow", JSON.stringify(i));
      event.dataTransfer.effectAllowed = "move";
    },
    []
  );

  const handleMouseEnter = (index: number) => {
    setOpen(true);
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (expand) {
      setExpandedItems([cat]);
    } else {
      setExpandedItems([]);
    }
  }, [expand, cat]);

  return (
    <Accordion
      type="multiple"
      value={expandedItems}
      onValueChange={setExpandedItems}
    >
      <AccordionItem
        value={cat}
        className="rounded-md px-4 bg-muted dark:bg-background"
      >
        <AccordionTrigger className="py-3 text-sm text-left">
          {startCase(cat)}
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex mb-3 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-800 to-transparent" />
          <div className="flex flex-wrap items-baseline justify-start">
            {data.map((i, index) => (
              <button
                key={i.name}
                className={cn(
                  "cursor-grab shadow-sm mr-1 my-1",
                  "px-3 py-2 rounded-full border border-neutral-300 dark:border-neutral-600 bg-background text-neutral-700 dark:text-neutral-200 text-xs hover:-translate-y-1 transform transition duration-200 hover:shadow-md"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  onAddNode({ widget: i });
                }}
                draggable
                onDragStart={(event) => handleDrag(event, i)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {startCase(i.name)}
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
      {open && activeIndex !== null && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{
            x: { type: "spring", stiffness: 50, damping: 10 },
            duration: 0.2,
          }}
          className="fixed w-[350px] z-[60] md:left-[400px] top-1/2 transform -translate-y-1/2 shadow-xl rounded-lg"
        >
          <PreviewNode data={data[activeIndex]} />
        </motion.div>
      )}
    </Accordion>
  );
};

export default React.memo(NodePickerGroup);
