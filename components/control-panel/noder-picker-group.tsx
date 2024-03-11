"use client";

import PreviewNode from "../node/sd-node/preview-node";
import { NodeItem, Widget } from "@/types";
import { startCase } from "lodash-es";
import React, { useCallback, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

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
}

const NodePickerGroup = ({ cat, data, onAddNode }: NodePickerGroupProps) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // State to track the active item index

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
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Accordion type="multiple" defaultValue={[cat]}>
        <AccordionItem value={cat}>
          <AccordionTrigger className="pb-2 text-sm text-left">
            {startCase(cat)}
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap items-baseline justify-start">
              {data.map((i, index) => (
                <PopoverTrigger key={i.name}>
                  <Badge
                    className="cursor-grab mr-1 my-1"
                    // onClick={(e) => {
                    //   e.preventDefault();
                    //   onAddNode({ widget: i });
                    // }}
                    draggable
                    onDragStart={(event) => handleDrag(event, i)}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {startCase(i.name)}
                  </Badge>
                </PopoverTrigger>
              ))}
            </div>
          </AccordionContent>
          {open && activeIndex !== null && (
            <PopoverContent
              side="right"
              className="w-[400px] z-[60] p-0 border-0"
              sideOffset={50}
            >
              <PreviewNode data={data[activeIndex]} />
            </PopoverContent>
          )}
        </AccordionItem>
      </Accordion>
    </Popover>
  );
};

export default React.memo(NodePickerGroup);
