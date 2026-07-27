import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { api } from "@/lib/axios";
import { getErrorMessage } from "@/lib/get-error-message";

export function useCreateColis() {
  return useMutation({
    mutationFn: async (data) => (await api.post("/colis/add", data)).data,
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
