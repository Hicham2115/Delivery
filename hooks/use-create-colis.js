import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { getErrorMessage } from "@/lib/get-error-message";

function generateTrackingCode(ville) {
  const prefix = ville
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^A-Za-z]/g, "")
    .slice(0, 4)
    .toUpperCase();
  const suffix = Date.now().toString().slice(-8);
  return `${prefix}${suffix}`;
}

export function useCreateColis() {
  return useMutation({
    mutationFn: async (data) =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            code: data.codeSuivi || generateTrackingCode(data.ville),
            destinataire: data.destinataire,
            telephone: data.telephone,
            ville: data.ville,
            adresse: data.adresse,
            prix: data.prix,
            etat: "Non facturé",
            status: "Nouveau",
          });
        }, 500);
      }),
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
