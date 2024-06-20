"use client";

import NodeContextMenu from "@/components/node-menu";
import ControlPanel from "@/components/control-panel";
import FlowEditor from "@/components/flow-editor";
import Toaster from "@/components/toaster";
import { ReactFlowProvider } from "reactflow";

export default function Home() {
  return (
    <div className="h-screen">
      <Toaster />
      <ReactFlowProvider>
        <NodeContextMenu>
          <FlowEditor />
        </NodeContextMenu>
      </ReactFlowProvider>
      <ControlPanel />
    </div>
  );
}
