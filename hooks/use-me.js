import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/axios";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => (await api.get("/auth/me")).data.user,
  });
}
