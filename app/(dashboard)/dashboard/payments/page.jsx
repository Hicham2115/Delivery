"use client";

import { useMemo } from "react";
import { Banknote, Receipt, TrendingUp, Wallet } from "lucide-react";

import { PaymentsChart } from "@/components/dashboard/payments-chart";
import { PaymentsTable } from "@/components/dashboard/payments-table";
import { StatCard } from "@/components/dashboard/stat-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useColis } from "@/hooks/use-colis";
import { buildPaymentsStats } from "@/lib/payments-stats";

function PaymentsSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-32 rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-80 rounded-xl" />
      <Skeleton className="h-96 rounded-xl" />
    </div>
  );
}

export default function PaymentsPage() {
  const { data: colis, isPending } = useColis();

  const stats = useMemo(() => {
    if (!colis) return undefined;
    return buildPaymentsStats(colis);
  }, [colis]);

  if (isPending || !stats) {
    return <PaymentsSkeleton />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Paiements
        </h1>
        <p className="text-base text-muted-foreground">
          Suivi des colis facturés et des montants versés.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Wallet}
          label="Net payé"
          sublabel="Total versé (DH)"
          value={stats.totalNet}
        />
        <StatCard
          icon={Receipt}
          label="Colis facturés"
          sublabel="Nombre total"
          value={stats.count}
        />
        <StatCard
          icon={TrendingUp}
          label="Moyenne par colis"
          sublabel="Net moyen (DH)"
          value={Math.round(stats.average)}
        />
        <StatCard
          icon={Banknote}
          label="Frais de livraison"
          sublabel="Retenus au total (DH)"
          value={stats.totalFees}
        />
      </div>

      <PaymentsChart data={stats.evolution} />

      <PaymentsTable factures={stats.factures} />
    </div>
  );
}
