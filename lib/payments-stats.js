import { getDeliveryFee, getNetAmount } from "@/lib/delivery-fees";

const MONTH_LABELS_FR = [
  "Jan",
  "Fév",
  "Mar",
  "Avr",
  "Mai",
  "Juin",
  "Juil",
  "Août",
  "Sep",
  "Oct",
  "Nov",
  "Déc",
];

function buildEvolution(colis) {
  const now = new Date();
  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
    return {
      key: `${date.getFullYear()}-${date.getMonth()}`,
      month: MONTH_LABELS_FR[date.getMonth()],
      montant: 0,
    };
  });
  const byKey = new Map(months.map((entry) => [entry.key, entry]));

  colis.forEach((row) => {
    const createdAt = new Date(row.createdAt);
    const key = `${createdAt.getFullYear()}-${createdAt.getMonth()}`;
    const entry = byKey.get(key);
    if (!entry) return;
    entry.montant += getNetAmount(row);
  });

  return months.map(({ key, ...rest }) => rest);
}

export function buildPaymentsStats(colis) {
  const factures = colis
    .filter((row) => row.etat === "Facturé")
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  const totalGross = factures.reduce((sum, row) => sum + row.prix, 0);
  const totalFees = factures.reduce((sum, row) => sum + getDeliveryFee(row.ville), 0);
  const totalNet = totalGross - totalFees;
  const count = factures.length;
  const average = count > 0 ? totalNet / count : 0;

  return {
    factures,
    count,
    totalGross,
    totalFees,
    totalNet,
    average,
    evolution: buildEvolution(factures),
  };
}
