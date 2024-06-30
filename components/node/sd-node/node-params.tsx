import NodeHandle from "@/components/node/sd-node/node-handle";
import { Flow } from "@/types";
import React from "react";
import { Position } from "reactflow";
import InputParams from "./input-param";

interface NodeParamsProps {
  nodeId: string;
  data: {
    name: string;
    type: string;
    input: [Flow];
  }[];
  selected: boolean;
  swapItem: (item: any) => void;
}

export const NodeSwappedParams = React.memo(({ data, selected, swapItem }: Omit<NodeParamsProps, 'nodeId'>) => {
  return (
    <>
      {data.map(({ name, type, input }, i) => (
        <NodeHandle
          key={i}
          slotType={type}
          label={name}
          type="target"
          position={Position.Left}
          isRequired
          selected={selected}
          clickable={true}
          onClick={() => swapItem({ name, type, input })}
        />
      ))}
    </>
  )
});

export const NodeParams = React.memo(({ data, nodeId, selected, swapItem }: NodeParamsProps) => {
  return (!data?.length) ? null : (
    <div className="space-y-2">
      {data.map(({ name, type, input }, i) => (
        <div
          key={i}
          className={`text-muted-foreground focus:text-accent-foreground grid ${
            name === "text" ? "grid-cols-1" : "grid-cols-2"
          } items-center gap-2`}
        >
          {name !== "text" && (
            <NodeHandle
              slotType={type}
              label={name}
              type="target"
              position={Position.Left}
              isRequired={false}
              selected={selected}
              clickable={true}
              onClick={() => swapItem({ name, type, input })}
            />
          )}
          {/* {(() => { console.log(name); return 0})()} */}
          <InputParams name={name} id={nodeId} input={input} />
        </div>
      ))}
    </div>
  );
});