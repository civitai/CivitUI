import React from "react";
import { Position } from "reactflow";
import NodeHandle from "./node-handle";

interface NodeOutpusProps {
  data: string[];
}

const NodeOutputs: React.FC<NodeOutpusProps> = ({ data }) => {
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
        />
      ))}
    </div>
  );
};

export default React.memo(NodeOutputs);
