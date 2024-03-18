import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NodeResizeControl, ResizeControlVariant } from "reactflow";

interface NodeCardProps {
  active: 1 | 0;
  title?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export const NodeCard = ({ active, title, children }: NodeCardProps) => {
  const activeClass = active ? "outline-2 outline-primary" : "";

  return (
    <Card
      className={`${activeClass} relative drag-handle hover:shadow-md transition-all duration-200 rounded-xl`}
    >
      <CardHeader className="py-3 px-4 bg-muted mb-3 border-b rounded-t-xl">
        <CardTitle className="text-md">{title}</CardTitle>
      </CardHeader>

      <CardContent>{children}</CardContent>
      <NodeResizeControl
        position="right"
        variant={"line" as ResizeControlVariant}
        style={{ borderWidth: "5px", borderColor: "transparent" }}
      />
    </Card>
  );
};
