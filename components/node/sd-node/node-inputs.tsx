import React from "react";
import { Position } from "reactflow";
import NodeHandle from "./node-handle";

interface NodeInputsProps {
  data: {
    required: {
      name: string;
      type: string;
    }[],
    optional: {
      name: string;
      type: string;
    }[]
  };
  selected: boolean;
}

const NodeInputs = ({ data, selected }: NodeInputsProps) => {
  if (!data?.required.length && !data?.optional.length) return <div />;
  return (
    <div className="flex-1">
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
    </div>
  );
};

export default React.memo(NodeInputs);
