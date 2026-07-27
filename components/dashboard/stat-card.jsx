import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({ icon: Icon, label, sublabel, value, size = "default" }) {
  const compact = size === "compact";

  return (
    <Card className="border-none bg-card/60 ring-1 ring-white/10">
      <CardContent
        className={cn("flex flex-col gap-2", compact ? "gap-1.5" : "gap-3")}
      >
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "flex shrink-0 items-center justify-center rounded-lg bg-gold/15 text-gold",
              compact ? "size-7" : "size-9",
            )}
          >
            <Icon className={compact ? "size-3.5" : "size-4.5"} />
          </span>
          <span
            className={cn(
              "font-semibold tracking-wide text-muted-foreground uppercase",
              compact ? "text-[11px]" : "text-xs",
            )}
          >
            {label}
          </span>
        </div>
        <span
          className={cn(
            "font-mono font-semibold text-foreground tabular-nums",
            compact ? "text-2xl" : "text-3xl",
          )}
        >
          {value.toLocaleString("fr-FR")}
        </span>
        <span className={cn("text-muted-foreground", compact ? "text-xs" : "text-sm")}>
          {sublabel}
        </span>
      </CardContent>
    </Card>
  );
}
