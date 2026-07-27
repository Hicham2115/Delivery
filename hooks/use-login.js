import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { api } from "@/lib/axios";
import { getErrorMessage } from "@/lib/get-error-message";

export function useLogin() {
  return useMutation({
    mutationFn: async (data) => (await api.post("/auth/login", data)).data,
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
