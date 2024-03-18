import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      className={`${activeClass} drag-handle hover:shadow-md transition-all duration-200 rounded-xl`}
    >
      <CardHeader className="py-3 px-4 bg-muted mb-3 border-b rounded-t-xl">
        <CardTitle className="text-md">{title}</CardTitle>
      </CardHeader>
      <CardContent className="cursor-pointer">{children}</CardContent>
    </Card>
  );
};
