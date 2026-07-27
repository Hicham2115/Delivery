const CASABLANCA_FEE = 19;
const OTHER_CITY_FEE = 35;

export function getDeliveryFee(ville) {
  return ville?.trim().toLowerCase() === "casablanca" ? CASABLANCA_FEE : OTHER_CITY_FEE;
}

export function getNetAmount(colis) {
  return colis.prix - getDeliveryFee(colis.ville);
}
