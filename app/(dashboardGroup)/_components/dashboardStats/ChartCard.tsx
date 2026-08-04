import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export function ChartCard({ title, description, icon: Icon, children }: ChartCardProps) {
  return (
    <Card className="border-border/60 shadow-xs">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-primary" />
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full pt-4">{children}</div>
      </CardContent>
    </Card>
  );
}