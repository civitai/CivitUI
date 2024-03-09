import PreviewNode from "../node/sd-node/preview-node";
import { NodeItem, Widget } from "@/types";
import { startCase } from "lodash-es";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../ui/button";
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

const CARD_LIST_PADDING = "8px 4px";

/******************************************************
 *********************** Style *************************
 ******************************************************/

const CardList = styled.div`
  cursor: pointer;
  padding: ${CARD_LIST_PADDING};
`;

/******************************************************
 ************************* Dom *************************
 ******************************************************/

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
   * @title Global Expansion State
   * @default false
   */
  globalExpand: boolean;
  /**
   * @title Card View State
   * @default false
   */
  cardView: boolean;
}
const NodePickerGroup: React.FC<NodePickerGroupProps> = ({
  cat,
  data,
  onAddNode,
  globalExpand,
  cardView,
}) => {
  const [expand, setExpand] = useState<boolean>(true);

  useEffect(() => {
    setExpand(globalExpand);
  }, [globalExpand]);

  const handleDrag = useCallback(
    (event: React.DragEvent<HTMLDivElement> | any, i: Widget) => {
      event.dataTransfer.setData("application/reactflow", JSON.stringify(i));
      event.dataTransfer.effectAllowed = "move";
    },
    []
  );

  const renderCardView = useCallback(() => {
    return (
      <div>
        {data.map((i) => (
          <CardList
            key={i.name}
            draggable
            onDragStart={(event) => handleDrag(event, i)}
            onClick={() => onAddNode({ widget: i })}
          >
            <PreviewNode data={i} />
          </CardList>
        ))}
      </div>
    );
  }, [data, handleDrag, onAddNode]);

  const renderButtonView = useCallback(() => {
    return (
      <div className="flex flex-col space-y-2">
        {data.map((i) => (
          <Popover key={i.name}>
            <PopoverTrigger asChild>
              <Button
                onClick={() => onAddNode({ widget: i })}
                draggable
                onDragStart={(event) => handleDrag(event, i)}
              >
                {startCase(i.name)}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PreviewNode data={i} />
            </PopoverContent>
          </Popover>
        ))}
      </div>
    );
  }, [data, handleDrag, onAddNode]);

  const handleExpandChange = useCallback((expanded: boolean) => {
    setExpand(expanded);
  }, []);

  return (
    <Accordion type="multiple">
      <AccordionTrigger>startCase(cat)</AccordionTrigger>
      <AccordionContent>
        {cardView ? renderCardView() : renderButtonView()}
      </AccordionContent>
    </Accordion>
  );
};

export default React.memo(NodePickerGroup);
