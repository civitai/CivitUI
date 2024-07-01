import React from "react";
import { Position } from "reactflow";
import { NodeHandle } from "./node-handle";

interface Input {
  name: string;
  type: string;
}

interface NodeInputsProps {
  data: {
    required: Input[],
    optional: Input[],
  };
  selected: boolean;
}

const NodeInputsComponent = ({ data, selected }: NodeInputsProps) => {
  return (
    <>
      {data.required.map(({ name, type }, i) => (
        <NodeHandle
          key={i}
          slotType={type}
          label={name}
          type="target"
          position={Position.Left}
          isRequired
          selected={selected}
        />
      ))}
      {data.optional.map(({ name, type }, i) => (
        <NodeHandle
          key={i}
          slotType={type}
          label={name}
          type="target"
          position={Position.Left}
          isRequired
          selected={selected}
        />
      ))}
    </>
  );
};

export const NodeInputs = React.memo(NodeInputsComponent);
