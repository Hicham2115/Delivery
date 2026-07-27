import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { api } from "@/lib/axios";
import { getErrorMessage } from "@/lib/get-error-message";

export function useUpdateColis() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => (await api.put(`/colis/${id}/update`, data)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colis"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
