import React from "react";
import { Position } from "reactflow";
import NodeHandle from "./node-handle";

interface NodeInputsProps {
  data: {
    name: string;
    type: string;
  }[];
}

const NodeInputs: React.FC<NodeInputsProps> = ({ data }) => {
  if (!data?.length) return <div />;
  return (
    <div className="flex-1">
      {data.map(({ name, type }) => (
        <NodeHandle
          key={name}
          slotType={type}
          label={name}
          type="target"
          position={Position.Left}
          isRequired
        />
      ))}
    </div>
  );
};

export default React.memo(NodeInputs);
