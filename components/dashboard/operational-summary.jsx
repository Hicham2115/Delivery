import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/stat-card";

export function OperationalSummary({ items }) {
  return (
    <Card className="border-none bg-card/60 ring-1 ring-white/10">
      <CardHeader>
        <CardTitle className="text-lg font-semibold font-sans">
          Résumé opérationnel
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <StatCard
            key={item.key}
            icon={item.icon}
            label={item.label}
            sublabel={item.sublabel}
            value={item.value}
            size="compact"
          />
        ))}
      </CardContent>
    </Card>
  );
}
