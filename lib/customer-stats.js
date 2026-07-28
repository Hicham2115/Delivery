import { getNetAmount } from "@/lib/delivery-fees";

export function buildCustomerStats(colis) {
  const byUser = new Map();

  colis.forEach((row) => {
    const key = row.userId;
    if (!byUser.has(key)) {
      byUser.set(key, {
        userId: key,
        name: `${row.user?.name ?? ""} ${row.user?.lastName ?? ""}`.trim(),
        email: row.user?.email ?? "",
        totalColis: 0,
        colisFactures: 0,
        totalNet: 0,
        lastActivity: row.createdAt,
      });
    }

    const customer = byUser.get(key);
    customer.totalColis += 1;
    if (new Date(row.createdAt) > new Date(customer.lastActivity)) {
      customer.lastActivity = row.createdAt;
    }
    if (row.etat === "Facturé") {
      customer.colisFactures += 1;
      customer.totalNet += getNetAmount(row);
    }
  });

  return Array.from(byUser.values()).sort((a, b) => b.totalNet - a.totalNet);
}
