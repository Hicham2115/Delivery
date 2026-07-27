import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/axios";

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => (await api.post("/auth/logout")).data,
    onSuccess: () => {
      queryClient.clear();
    },
  });
}
