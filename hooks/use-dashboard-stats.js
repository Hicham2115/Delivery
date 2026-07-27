import { useQuery } from "@tanstack/react-query";

import { dashboardStats } from "@/lib/mock/dashboard-stats";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => dashboardStats,
  });
}
