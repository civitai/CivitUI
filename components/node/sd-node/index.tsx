import React, { useMemo } from "react";
import { NodeProps } from "reactflow";
import { useShallow } from "zustand/react/shallow";

import NodeImgPreview from "./node-img-preview";
import NodeInputs from "./node-inputs";
import NodeOutputs from "./node-ouputs";
import NodeParams from "./node-params";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useAppStore } from "@/store";
import { Widget } from "@/types";
import { checkInput } from "@/utils";

const SdNode = ({ id, data: { input, output } }: NodeProps<Widget>) => {
  const { imagePreviews, inputImgPreviews } = useAppStore(
    useShallow((st) => ({
      imagePreviews: st.graph?.[id]?.images
        ?.map((image, index) => ({ image, index }))
        .filter(Boolean),
      inputImgPreviews: [
        {
          image: {
            filename: st.onGetNodeFieldsData(id, "image"),
            type: "input",
          },
          index: 0,
        },
      ].filter((i) => i.image.filename),
    }))
  );

  const inputsData = {...input.required, ...input.optional};

  const params = useMemo(() => {
    const paramsList: any[] = [];
    Object.entries(inputsData).forEach(([property, inputType]) => {
      if (checkInput.isParameterOrList(inputType)) {
        paramsList.push({
          name: property,
          type: inputType[0],
          input: inputType,
        });
      }
    });
    return paramsList;
  }, [input]);

  const inputs = useMemo(() => {
    const inputsList: any[] = [];
    Object.entries(inputsData).forEach(([property, inputType]) => {
      if (!checkInput.isParameterOrList(inputType)) {
        inputsList.push({ name: property, type: inputType[0] });
      }
    });
    return inputsList;
  }, [input]);

  const { expanded, onExpand } = useAppStore((state) => ({
    expanded: state.expanded,
    onExpand: state.onExpand,
  }));
  // Determine if the current node's accordion should be expanded
  const isExpanded = expanded.includes(id);
  const handleAccordionChange = () => onExpand(id);

  return (
    <>
      <div className="flex items-stretch justify-stretch w-full space-x-6">
        <NodeInputs data={inputs} />
        <NodeOutputs data={output} />
      </div>
      {params.length > 0 && (
        <Accordion
          type="multiple"
          value={isExpanded ? [id] : []}
          onValueChange={handleAccordionChange}
        >
          <AccordionItem value={id}>
            <AccordionTrigger />
            <AccordionContent className="m-0.5">
              <NodeParams data={params} nodeId={id} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      <NodeImgPreview data={imagePreviews || inputImgPreviews} />
    </>
  );
};

export default React.memo(SdNode);
