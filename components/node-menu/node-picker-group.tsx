"use client";

import { NodeItem, Widget } from "@/types";
import { startCase } from "lodash-es";
import React, { useCallback, useState, useEffect } from "react";
import {
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "@/components/ui/context-menu";
import { cn } from "@/lib/utils";

interface NodePickerGroupProps {
  category: string;
  items: any;
  setActiveItem: (nodeItem: Widget | null) => void;
  onAddNode: (nodeItem: NodeItem) => void;
  expandedItems: string[];
  setExpandedItems: (items: string[]) => void;
}

const NodePickerGroup = ({
  category,
  items,
  setActiveItem,
  onAddNode,
  expandedItems,
  setExpandedItems,
}: NodePickerGroupProps) => {
  const handleDrag = useCallback(
    (event: React.DragEvent<HTMLButtonElement>, i: Widget) => {
      event.dataTransfer.setData("application/reactflow", JSON.stringify(i));
      event.dataTransfer.effectAllowed = "move";
    },
    []
  );

  const handleMouseEnter = (index: number) => {
    setActiveItem(items.widgets[index]);
  };

  const handleMouseLeave = () => {
    setActiveItem(null);
  };

  return (
    <ContextMenuSub>
      <ContextMenuSubTrigger className="text-xs text-left py-0 my-0 px-1 w-full">
        {category}
      </ContextMenuSubTrigger>
      <ContextMenuSubContent className="p-2">
        <div className="flex flex-col items-baseline justify-start">
          {Object.entries(items.subcategories).map(([subCat, subItems]) => (
            <NodePickerGroup
              key={subCat}
              category={subCat}
              items={subItems}
              setActiveItem={setActiveItem}
              onAddNode={onAddNode}
              expandedItems={expandedItems}
              setExpandedItems={setExpandedItems}
            />
          ))}
          {Object.values(items.subcategories).length > 0 && items.widgets.length > 0 && <ContextMenuSeparator />}
          {items.widgets.map((i: Widget, index: number) => (
            <button
              key={i.name}
              className={cn(
                "cursor-click shadow-sm -mt-px w-full text-left",
                "relative z-0 hover:z-50 px-1 py-0.7 rounded border border-neutral-600 transition duration-200 hover:border-white bg-background text-neutral-200 text-xs"
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
      </ContextMenuSubContent>
    </ContextMenuSub>
  );
};

export default React.memo(NodePickerGroup);