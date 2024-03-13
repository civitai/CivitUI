import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NodeCardProps {
  ref: React.Ref<HTMLDivElement>;
  active: 1 | 0;
  title?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export const NodeCard = ({ ref, active, title, children }: NodeCardProps) => {
  const activeClass = active ? "outline-2 outline-primary" : "";

  return (
    <Card className={`${activeClass}`}>
      <CardHeader className="drag-handle py-3 px-4 bg-muted mb-3 border-b rounded-t-lg">
        <CardTitle className="text-md">{title}</CardTitle>
      </CardHeader>
      <CardContent className="cursor-pointer">{children}</CardContent>
    </Card>
  );
};
