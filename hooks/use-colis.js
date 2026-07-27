import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/axios";

const ETAT_LABELS = {
  FACTURE: "Facturé",
  NON_FACTURE: "Non facturé",
};

const STATUS_LABELS = {
  NOUVEAU: "Nouveau",
  RAMASSAGE: "Ramassage",
  EN_COURS: "En cours",
  LIVRE: "Livré",
  RETOURNE: "Retourné",
};

function mapColis(colis) {
  return {
    ...colis,
    prix: Number(colis.prix),
    etat: ETAT_LABELS[colis.etat] ?? colis.etat,
    status: STATUS_LABELS[colis.status] ?? colis.status,
  };
}

export function useColis() {
  return useQuery({
    queryKey: ["colis"],
    queryFn: async () => {
      const { data } = await api.get("/colis");
      return data.colis.map(mapColis);
    },
  });
}
