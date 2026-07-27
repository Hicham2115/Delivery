import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { api } from "@/lib/axios";
import { getErrorMessage } from "@/lib/get-error-message";

export const STATUS_VALUES = {
  Nouveau: "NOUVEAU",
  Ramassage: "RAMASSAGE",
  "En cours": "EN_COURS",
  Livré: "LIVRE",
  Retourné: "RETOURNE",
};

export const ETAT_VALUES = {
  "Facturé": "FACTURE",
  "Non facturé": "NON_FACTURE",
};

export function useAdminUpdateColis() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => (await api.put(`/admin/colis/${id}/update`, data)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-colis"] });
      toast.success("Colis mis à jour avec succès.");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
