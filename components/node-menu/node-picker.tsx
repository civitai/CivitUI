"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useShallow } from "zustand/react/shallow";

import { useAppStore } from "@/store";
import type { Widget } from "@/types";
import { NodePickerGroup } from "./node-picker-group";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { NodePickerWidgetButton } from "./node-picker-widget-button";
import { ContextMenuSeparator } from "@/components/ui/context-menu";

const NodePickerComponent = ({ setActiveItem }: any) => {
  const { widgets, onAddNode } = useAppStore(
    useShallow((state) => ({
      widgets: state.widgets,
      onAddNode: state.onAddNode,
    }))
  );
  const [category, setCategory] = useState<any>({});
  const [keywords, setKeywords] = useState<string>("");
  const [widgetList, setWidgetList] = useState<Widget[]>([]);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  useEffect(() => {
    const byCategory: any = {};

    const addWidgetToCategory = (categoryPath: string[], widget: Widget) => {
      let currentLevel = byCategory;

      categoryPath.forEach((category, index) => {
        if (!currentLevel[category]) {
          currentLevel[category] = { widgets: [], subcategories: {} };
        }
        if (index === categoryPath.length - 1) {
          currentLevel[category].widgets.push(widget);
        }
        currentLevel = currentLevel[category].subcategories;
      });
    };

    let widgetsValues = Object.values(widgets);
    if (keywords) {
      widgetsValues = widgetsValues.filter((widget) =>
        widget.name.toLowerCase().includes(keywords.toLowerCase())
      );
    }

    for (const widget of widgetsValues) {
      const categoryPath = widget.category.split("/");
      addWidgetToCategory(categoryPath, widget);
    }

    setWidgetList(widgetsValues);
    setCategory(byCategory);
  }, [widgets, keywords]);

  const handleKeywordsChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setKeywords(event.target.value);
    }, []
  );

  return (
    <div className="flex flex-col">
      <div className="flex px-2">
        <div className="relative w-full">
          <input
            name="search"
            type="text"
            className="px-9 flex h-6 w-full rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Search..."
            onChange={handleKeywordsChange}
            onKeyDown={e => e.stopPropagation()}
            autoFocus={true}
          />
          <div
            className="absolute inset-y-0 left-0 pl-2  
              flex items-center  
              pointer-events-none"
          >
            <MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      <ContextMenuSeparator />

      <div className="flex flex-col">
        {
          (keywords === "") ?
            Object.entries(category).map(([cat, items], index) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.01,
                  duration: 0.2,
                }}
              >
                <NodePickerGroup
                  key={cat}
                  category={cat}
                  items={items}
                  setActiveItem={setActiveItem}
                  onAddNode={onAddNode}
                  expandedItems={expandedItems}
                  setExpandedItems={setExpandedItems}
                />
              </motion.div>
            )) :
            Object.values(widgetList).map((w: Widget) => (
              <NodePickerWidgetButton
                key={w.name}
                w={w}
                onAddNode={onAddNode}
                setActiveItem={setActiveItem}
              />
            ))
        }
      </div>
    </div>
  );
};

export const NodePicker = React.memo(NodePickerComponent);