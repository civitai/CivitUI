import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NodeCardProps {
  active: 1 | 0;
  title?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const NodeCard = ({ active, title, style, children }: NodeCardProps) => {
  const activeClass = active ? "outline-2 outline-primary" : "";

  return (
    <Card className={`${activeClass}`} style={style}>
      <CardHeader className="py-3 px-4 bg-muted mb-3 border-b">
        <CardTitle className="text-md">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
