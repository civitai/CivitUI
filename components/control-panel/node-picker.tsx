"use client";

import { useAppStore } from "@/store";
import type { Widget } from "@/types";
import React, { useCallback, useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import NodePickerGroup from "./noder-picker-group";
import { HamburgerMenuIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

/******************************************************
 ************************* Dom *************************
 ******************************************************/

const NodePickerComponent: React.FC = () => {
  const { widgets, onAddNode } = useAppStore((state) => state, shallow);
  const [category, setCategory] = useState<Record<string, Widget[]>>({});
  const [keywords, setKeywords] = useState<string>("");

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

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
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

      <div className="flex-1 overflow-auto">
        {Object.entries(category).map(([cat, items]) => (
          <NodePickerGroup
            key={cat}
            data={items}
            cat={cat}
            onAddNode={onAddNode}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(NodePickerComponent);
