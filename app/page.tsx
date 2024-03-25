import CanvasContextMenu from "@/components/canvas-context-menu";
import ControlPanel from "@/components/control-panel";
import FlowEditor from "@/components/flow-editor";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="h-screen">
      <Navbar />
      <CanvasContextMenu>
        <FlowEditor />
      </CanvasContextMenu>

      <ControlPanel />
    </div>
  );
}
