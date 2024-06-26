import React from "react";
import { Position } from "reactflow";
import NodeHandle from "./node-handle";

interface NodeInputsProps {
  data: {
    name: string;
    type: string;
  }[];
  selected: boolean;
}

const NodeInputs = ({ data, selected }: NodeInputsProps) => {
  if (!data?.length) return <div />;
  return (
    <div className="flex-1">
      {data.map(({ name, type }, i) => (
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
