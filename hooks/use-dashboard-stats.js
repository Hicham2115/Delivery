import { useMemo } from "react";

import { buildDashboardStats } from "@/lib/dashboard-stats";
import { useColis } from "@/hooks/use-colis";

export function useDashboardStats(dateRange) {
  const { data: colis, isPending, isError } = useColis();

  const data = useMemo(() => {
    if (!colis) return undefined;
    return buildDashboardStats(colis, dateRange);
  }, [colis, dateRange]);

  return { data, isPending, isError };
}
