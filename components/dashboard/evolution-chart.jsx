"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  nouveau: { label: "Créés", color: "var(--gold)" },
  livre: { label: "Livré", color: "#a78bfa" },
};

const MODES = ["both", "nouveau", "livre"];
const MODE_LABELS = { both: "Créés / Livré", nouveau: "Créés", livre: "Livré" };

export function EvolutionChart({ data }) {
  const [modeIndex, setModeIndex] = useState(0);
  const mode = MODES[modeIndex];

  return (
    <Card className="border-none bg-card/60 ring-1 ring-white/10">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="font-sans text-lg font-semibold">
          Évolution des colis
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="py-5"
          onClick={() => setModeIndex((index) => (index + 1) % MODES.length)}
        >
          {MODE_LABELS[mode]}
        </Button>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            {(mode === "both" || mode === "nouveau") && (
              <Bar dataKey="nouveau" fill="var(--color-nouveau)" radius={4} />
            )}
            {(mode === "both" || mode === "livre") && (
              <Bar dataKey="livre" fill="var(--color-livre)" radius={4} />
            )}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
