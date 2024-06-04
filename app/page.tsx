"use client";

import CanvasContextMenu from "@/components/canvas-context-menu";
import ControlPanel from "@/components/control-panel";
import FlowEditor from "@/components/flow-editor";
import Navbar from "@/components/navbar";
import { ReactFlowProvider } from "reactflow";

export default function Home() {
  return (
    <div className="h-screen">
      <Navbar />
      <ReactFlowProvider>
        <CanvasContextMenu>
          <FlowEditor />
        </CanvasContextMenu>
      </ReactFlowProvider>

      <ControlPanel />
    </div>
  );
}
