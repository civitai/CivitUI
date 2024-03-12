import { type Widget } from "@/types";
import { checkInput } from "@/utils";
import { startCase } from "lodash-es";
import React, { useMemo } from "react";
import { NodeCard } from "./node-card";

interface SlotProps {
  isRequired: 1 | 0;
  position: "left" | "right";
}

const Slot = ({ isRequired, position }: SlotProps) => (
  <div
    className={`mt-1.5 react-flow__handle ${
      isRequired ? "bg-primary" : "bg-border"
    } ${position === "left" ? "mr-2" : "ml-2"}`}
    style={{ [position]: -3 }}
  />
);

interface PreviewNodeProps {
  data: Widget;
}

const PreviewNode = ({ data }: PreviewNodeProps) => {
  const { outputs, params, inputs } = useMemo(() => {
    const outputs = data.output.map((o) => ({ name: o, type: o }));
    const params: any[] = [];
    const inputs: any[] = [];

    Object.entries(data.input.required).forEach(([property, input]) => {
      if (checkInput.isParameterOrList(input)) {
        params.push({ name: property, type: input[0], input });
      } else {
        inputs.push({ name: property, type: input[0] });
      }
    });

    return { outputs, params, inputs };
  }, [data]);

  return (
    <NodeCard title={data.name} active={0}>
      <div className="flex w-full items-stretch justify-between space-x-6">
        <div className="flex-1">
          {inputs.map((item, index) => (
            <div key={index} className="flex items-center">
              <Slot position="left" isRequired={1} />
              <span className="text-sm">{startCase(item.name)}</span>
            </div>
          ))}
        </div>
        <div className="flex-1 text-right">
          {outputs.map((item, index) => (
            <div key={index} className="flex items-center justify-end">
              <span className="text-sm">{startCase(item.name)}</span>
              <Slot position="right" isRequired={1} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        {params.map((item, index) => (
          <div key={index} className="flex items-center">
            <Slot position="left" isRequired={0} />
            <span className="text-sm">{startCase(item.name)}</span>
          </div>
        ))}
      </div>
    </NodeCard>
  );
};

export default React.memo(PreviewNode);
