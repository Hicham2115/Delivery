import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { api } from "@/lib/axios";
import { getErrorMessage } from "@/lib/get-error-message";

export function useDeleteColis() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => (await api.delete(`/colis/${id}/delete`)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colis"] });
      toast.success("Colis supprimé avec succès.");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
