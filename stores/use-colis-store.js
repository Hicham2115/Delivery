import { create } from "zustand";

let nextId = 100;

const initialColis = [
  { id: "1", code: "ASLH0925543150SD", destinataire: "Mouhamd", telephone: "0698330464", ville: "Asilah", prix: 150, etat: "Facturé", status: "Livré" },
  { id: "2", code: "BRJDID0925543149JV", destinataire: "Client", telephone: "0644692292", ville: "Bir Jdid", prix: 350, etat: "Facturé", status: "Livré" },
  { id: "3", code: "RBT0925543148BQ", destinataire: "Olaya", telephone: "0690401055", ville: "Rabat", prix: 150, etat: "Facturé", status: "Livré" },
  { id: "4", code: "AGA0925543147WQ", destinataire: "Mouhamd", telephone: "0693841479", ville: "Agadir", prix: 150, etat: "Facturé", status: "Livré" },
  { id: "5", code: "CASA0925543146TR", destinataire: "Yassine", telephone: "0661220033", ville: "Casablanca", prix: 220, etat: "Non facturé", status: "Ramassage" },
  { id: "6", code: "TNG0925543145PL", destinataire: "Sara", telephone: "0677889911", ville: "Tanger", prix: 180, etat: "Non facturé", status: "En cours" },
  { id: "7", code: "MRK0925543144KZ", destinataire: "Hamid", telephone: "0655001122", ville: "Marrakech", prix: 275, etat: "Facturé", status: "Retourné" },
];

export const useColisStore = create((set) => ({
  colis: initialColis,
  addColis: (colis) =>
    set((state) => ({
      colis: [{ ...colis, id: String(nextId++) }, ...state.colis],
    })),
}));
