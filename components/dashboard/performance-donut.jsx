"use client";

import { Cell, Label, Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

const chartConfig = {
  rate: { label: "Livré", color: "var(--gold)" },
  remaining: { label: "Restant", color: "var(--muted)" },
};

export function PerformanceDonut({ rate }) {
  const data = [
    { name: "rate", value: rate },
    { name: "remaining", value: Math.max(0, 100 - rate) },
  ];

  return (
    <Card className="border-none bg-card/60 ring-1 ring-white/10">
      <CardContent className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-44 w-44">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={58}
              outerRadius={78}
              strokeWidth={0}
              startAngle={90}
              endAngle={450}
            >
              <Cell fill="var(--gold)" />
              <Cell fill="var(--muted)" />
              <Label
                content={({ viewBox }) => {
                  const { cx, cy } = viewBox;
                  return (
                    <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan x={cx} y={cy - 10} className="fill-foreground text-2xl font-mono font-semibold">
                        {rate}%
                      </tspan>
                      <tspan x={cx} y={cy + 12} className="fill-muted-foreground text-[10px] uppercase tracking-wide">
                        Taux de livraison
                      </tspan>
                    </text>
                  );
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="text-center sm:text-right">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Performance de la période
          </p>
          <p className="text-lg font-semibold text-foreground">
            Taux de livraison
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
