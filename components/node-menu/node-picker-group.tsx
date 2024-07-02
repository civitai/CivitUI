"use client";

import React, { useCallback, useState, useEffect } from "react";
import { startCase } from "lodash-es";

import { NodeItem, Widget } from "@/types";
import { NodePickerWidgetButton } from "./node-picker-widget-button";
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

const NodePickerGroupComponent = ({
  category,
  items,
  setActiveItem,
  onAddNode,
  expandedItems,
  setExpandedItems,
}: NodePickerGroupProps) => {
  return (
    // a nested menu inside the main context menu
    <ContextMenuSub>
      <ContextMenuSubTrigger className="text-xs text-center py-0 my-0 px-1 w-full">
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
          {items.widgets.map((e: Widget) => (
            <NodePickerWidgetButton 
              key={e.name}
              w={e}
              onAddNode={onAddNode}
              setActiveItem={setActiveItem}
            />
          ))}
        </div>
      </ContextMenuSubContent>
    </ContextMenuSub>
  );
};

export const NodePickerGroup = React.memo(NodePickerGroupComponent);