"use client";

import { useAppStore } from "@/store";
import type { Widget } from "@/types";
import React, { useCallback, useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import NodePickerGroup from "./noder-picker-group";
import { Button } from "../ui/button";
import { Expand, LayoutDashboard, Menu, Shrink } from "lucide-react";
import { Input } from "../ui/input";

/******************************************************
 ************************* Dom *************************
 ******************************************************/

const NodePickerComponent: React.FC = () => {
  const { widgets, onAddNode } = useAppStore((state) => state, shallow);
  const [category, setCategory] = useState<Record<string, Widget[]>>({});
  const [keywords, setKeywords] = useState<string>("");
  const [globalExpand, setGlobalExpand] = useState<boolean>(true);
  const [cardView, setCardView] = useState<boolean>(false);

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

  const handleCardViewToggle = useCallback(() => {
    setCardView((prevCardView) => !prevCardView);
  }, []);

  const handleExpandAll = useCallback(() => {
    setGlobalExpand(true);
  }, []);

  const handleCollapseAll = useCallback(() => {
    setGlobalExpand(false);
  }, []);

  return (
    <>
      <div className="flex">
        <Input
          placeholder="Input search text"
          onChange={handleKeywordsChange}
        />
        <div className="flex gap-2 ml-2">
          <Button
            aria-label="Switch Card/List View"
            size={"icon"}
            onClick={handleCardViewToggle}
          >
            {cardView ? <LayoutDashboard /> : <Menu />}
          </Button>
          <Button
            aria-label="Expand All"
            size={"icon"}
            onClick={handleExpandAll}
          >
            <Expand className="h-5 w-5" />
          </Button>
          <Button
            aria-label="Collapse All"
            size={"icon"}
            onClick={handleCollapseAll}
          >
            <Shrink />
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {Object.entries(category).map(([cat, items]) => (
          <NodePickerGroup
            key={cat}
            data={items}
            cat={cat}
            onAddNode={onAddNode}
            globalExpand={globalExpand}
            cardView={cardView}
          />
        ))}
      </div>
    </>
  );
};

export default React.memo(NodePickerComponent);
