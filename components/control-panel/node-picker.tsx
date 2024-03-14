"use client";

import { useAppStore } from "@/store";
import type { Widget } from "@/types";
import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useShallow } from "zustand/react/shallow";
import NodePickerGroup from "./node-picker-group";
import { CaretSortIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Toggle } from "../ui/toggle";

const NodePickerComponent: React.FC = () => {
  const { widgets, onAddNode } = useAppStore(
    useShallow((state) => ({
      widgets: state.widgets,
      onAddNode: state.onAddNode,
    }))
  );
  const [category, setCategory] = useState<Record<string, Widget[]>>({});
  const [keywords, setKeywords] = useState<string>("");
  const [expandAll, setExpandAll] = useState<boolean>(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  useEffect(() => {
    const byCategory: Record<string, Widget[]> = {};
    let widgetsValues = Object.values(widgets);
    if (keywords) {
      widgetsValues = widgetsValues.filter((widget) =>
        widget.name.toLowerCase().includes(keywords.toLowerCase())
      );
    }
    for (const widget of widgetsValues) {
      if (byCategory[widget.category]) {
        byCategory[widget.category].push(widget);
      } else {
        byCategory[widget.category] = [widget];
      }
    }
    setCategory(byCategory);
  }, [widgets, keywords]);

  const handleKeywordsChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setKeywords(event.target.value);
    },
    []
  );

  /**
   * Toggles the expand/collapse state of all accordion items.
   * When expanding, applies a trickle-down effect with a delay between each item.
   * The delay increases by 100ms for each item until the 6th item.
   * From the 6th item onwards, a constant delay of 500ms is applied.
   */
  const toggleExpandCollapseAll = () => {
    if (expandAll) {
      setExpandedItems([]);
    } else {
      const itemsToExpand = Object.keys(category);
      itemsToExpand.forEach((item, index) => {
        const delay = index < 6 ? index * 100 : 500;
        setTimeout(() => {
          setExpandedItems((prevExpandedItems) => [...prevExpandedItems, item]);
        }, delay);
      });
    }
    setExpandAll(!expandAll);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 px-2">
        <div className="relative w-full">
          <input
            name="search"
            type="text"
            className="px-9 flex h-9 w-full rounded-md border border-input bg-transparent py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Search..."
            onChange={handleKeywordsChange}
          />
          <div
            className="absolute inset-y-0 left-0 pl-2  
              flex items-center  
              pointer-events-none"
          >
            <MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />
          </div>
        </div>
        <Toggle
          onClick={toggleExpandCollapseAll}
          variant={"outline"}
          className="h-9"
        >
          <CaretSortIcon />
        </Toggle>
      </div>

      <div className="flex flex-col gap-4 overflow-auto px-2">
        {Object.entries(category).map(([cat, items], index) => (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index < 16 ? index * 0.05 : 0.4, // Items after the 16th index will all have the same delay
              duration: 0.2,
            }}
          >
            <NodePickerGroup
              key={cat}
              data={items}
              cat={cat}
              onAddNode={onAddNode}
              expand={expandedItems.includes(cat)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(NodePickerComponent);
