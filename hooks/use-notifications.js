import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/axios";

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const { data } = await api.get("/notifications");
      return data.notifications;
    },
    refetchInterval: 15000,
  });
}
