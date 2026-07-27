import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function StatusPipeline({ items, total }) {
  return (
    <Card className="border-none bg-card/60 ring-1 ring-white/10">
      <CardHeader>
        <CardTitle className="text-lg font-semibold font-sans">
          Pipeline des statuts
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground">{item.label}</span>
              <span className="font-mono font-medium text-muted-foreground tabular-nums">
                {item.value}
              </span>
            </div>
            <Progress value={total ? (item.value / total) * 100 : 0}>
              <span className="sr-only">
                {item.label}: {item.value}
              </span>
            </Progress>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
