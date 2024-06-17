"use client";

import NodeContextMenu from "@/components/node-menu";
import ControlPanel from "@/components/control-panel";
import FlowEditor from "@/components/flow-editor";
import { ReactFlowProvider } from "reactflow";

export default function Home() {
  return (
    <div className="h-screen">
      <ReactFlowProvider>
        <NodeContextMenu>
          <FlowEditor />
        </NodeContextMenu>
      </ReactFlowProvider>
      <ControlPanel />
    </div>
  );
}
