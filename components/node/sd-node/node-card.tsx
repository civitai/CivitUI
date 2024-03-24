import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NodeResizeControl, ResizeControlVariant } from "reactflow";

interface NodeCardProps {
  active: 1 | 0;
  title?: React.ReactNode;
  className?: string;
  preview?: boolean;
  children: React.ReactNode;
}

export const NodeCard = ({
  active,
  title,
  preview = false,
  children,
}: NodeCardProps) => {
  const activeClass = active ? "shadow-lg" : "";
  return (
    <div className="relative p-[1.5px] z-0">
      {active ? (
        <div className="overflow-hidden absolute inset-0 z-[-1] rounded-xl">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        </div>
      ) : null}

      <Card
        className={`${activeClass} drag-handle hover:shadow-lg transition-all duration-200 rounded-xl`}
      >
        <CardHeader className="relative py-3 px-4 bg-muted mb-3 border-b rounded-t-xl z-10">
          <CardTitle className="text-md">{title}</CardTitle>
          {!preview && (
            <NodeResizeControl
              position="right"
              variant={"line" as ResizeControlVariant}
              style={{ borderWidth: "5px", borderColor: "transparent" }}
            />
          )}
        </CardHeader>

        <CardContent className="h-full w-full bg-background z-10 rounded-b-xl">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};
