import React from "react";
import { Position } from "reactflow";
import NodeHandle from "./node-handle";

interface NodeOutputsProps {
  data: string[];
  selected: boolean;
}

const NodeOutputs = ({ data, selected }: NodeOutputsProps) => {
  if (!data?.length) return <div />;
  return (
    <div className="flex-1">
      {data.map((item, i) => (
        <NodeHandle
          key={i}
          slotType={item}
          label={item}
          type="source"
          position={Position.Right}
          isRequired
          selected={selected}
        />
      ))}
    </div>
  );
};

export default React.memo(NodeOutputs);
