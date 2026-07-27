import {
  CheckCircle2,
  Package,
  PackagePlus,
  Receipt,
  FileMinus,
  RefreshCw,
  RotateCcw,
  Truck,
  Wallet,
} from "lucide-react";

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

const ACTIVE_STATUSES = ["Nouveau", "Ramassage", "En cours"];

function sumPrix(colis, predicate) {
  return colis.filter(predicate).reduce((sum, row) => sum + row.prix, 0);
}

function countBy(colis, key, value) {
  return colis.filter((row) => row[key] === value).length;
}

function buildEvolution(colis) {
  const now = new Date();
  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
    return {
      key: `${date.getFullYear()}-${date.getMonth()}`,
      month: MONTH_LABELS_FR[date.getMonth()],
      nouveau: 0,
      livre: 0,
    };
  });
  const byKey = new Map(months.map((entry) => [entry.key, entry]));

  colis.forEach((row) => {
    const createdAt = new Date(row.createdAt);
    const key = `${createdAt.getFullYear()}-${createdAt.getMonth()}`;
    const entry = byKey.get(key);
    if (!entry) return;
    entry.nouveau += 1;
    if (row.status === "Livré") entry.livre += 1;
  });

  return months.map(({ key, ...rest }) => rest);
}

function buildPeriod(colis) {
  const to = new Date().toISOString().slice(0, 10);
  if (colis.length === 0) return { from: to, to };
  const earliest = colis.reduce(
    (min, row) => (row.createdAt < min ? row.createdAt : min),
    colis[0].createdAt,
  );
  return { from: earliest.slice(0, 10), to };
}

export function buildDashboardStats(colis) {
  const total = colis.length;
  const livres = countBy(colis, "status", "Livré");
  const ramassage = countBy(colis, "status", "Ramassage");
  const enCours = countBy(colis, "status", "En cours");
  const retournes = countBy(colis, "status", "Retourné");
  const nouveau = countBy(colis, "status", "Nouveau");
  const facture = countBy(colis, "etat", "Facturé");
  const nonFacture = countBy(colis, "etat", "Non facturé");

  const netDelivered = sumPrix(colis, (row) => row.status === "Livré");
  const deliveryRate = total > 0 ? Math.round((livres / total) * 1000) / 10 : 0;

  return {
    period: buildPeriod(colis),
    netDelivered,
    deliveryRate,
    totalColis: total,
    stats: [
      { key: "colis", label: "Colis", sublabel: "Total sur la période", value: total, icon: Package },
      { key: "livres", label: "Livrés", sublabel: "Commandes livrées", value: livres, icon: CheckCircle2 },
      { key: "enCours", label: "En cours", sublabel: "Suivi en cours", value: enCours, icon: RefreshCw },
      { key: "ramassage", label: "Ramassage", sublabel: "En attente de passage", value: ramassage, icon: Truck },
      { key: "retournes", label: "Retournés", sublabel: "Colis retournés", value: retournes, icon: RotateCcw },
      { key: "nouveau", label: "Nouveau", sublabel: "Pas encore traités", value: nouveau, icon: PackagePlus },
      { key: "facture", label: "Facturé", sublabel: "Colis facturés", value: facture, icon: Receipt },
      { key: "nonFacture", label: "Non facturé", sublabel: "Colis non facturés", value: nonFacture, icon: FileMinus },
    ],
    evolution: buildEvolution(colis),
    operationalSummary: [
      {
        key: "valeurTotale",
        label: "Valeur totale",
        sublabel: "Tous les colis (DH)",
        value: sumPrix(colis, () => true),
        icon: Wallet,
      },
      {
        key: "valeurLivree",
        label: "Valeur livrée",
        sublabel: "Colis livrés (DH)",
        value: netDelivered,
        icon: CheckCircle2,
      },
      {
        key: "valeurEnCours",
        label: "Valeur en cours",
        sublabel: "Non livrés (DH)",
        value: sumPrix(colis, (row) => ACTIVE_STATUSES.includes(row.status)),
        icon: RefreshCw,
      },
      {
        key: "valeurRetournee",
        label: "Valeur retournée",
        sublabel: "Colis retournés (DH)",
        value: sumPrix(colis, (row) => row.status === "Retourné"),
        icon: RotateCcw,
      },
    ],
    statusPipeline: [
      { label: "Livrés", value: livres },
      { label: "En cours", value: enCours },
      { label: "Ramassage", value: ramassage },
      { label: "Retournés", value: retournes },
    ],
  };
}
