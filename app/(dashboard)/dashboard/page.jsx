"use client";

import { Calendar, Store, TrendingUp, Wallet } from "lucide-react";

import { EvolutionChart } from "@/components/dashboard/evolution-chart";
import { OperationalSummary } from "@/components/dashboard/operational-summary";
import { PerformanceDonut } from "@/components/dashboard/performance-donut";
import { StatCard } from "@/components/dashboard/stat-card";
import { StatusPipeline } from "@/components/dashboard/status-pipeline";
import { TopProducts } from "@/components/dashboard/top-products";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardStats } from "@/hooks/use-dashboard-stats";

export default function DashboardHomePage() {
  const { data, isPending } = useDashboardStats();

  if (isPending || !data) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-32 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6 rounded-xl bg-card/60 p-6 ring-1 ring-white/10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3">
          <span className="inline-flex w-fit items-center gap-2 text-xs font-semibold tracking-wide text-gold uppercase">
            <TrendingUp className="size-3.5" />
            SwiftWay performance
          </span>
          <h1 className=" text-3xl font-semibold tracking-tight text-foreground">
            Tableau de bord client
          </h1>
          <p className="max-w-xl text-base text-muted-foreground">
            Vue claire sur vos colis, vos bons, vos factures et votre
            performance de livraison.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-background/40 px-3 py-1.5 text-sm text-muted-foreground">
              <Store className="size-4 text-gold" />
              Magasin: <span className="text-foreground">{data.storeName}</span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-background/40 px-3 py-1.5 text-sm text-muted-foreground">
              <Calendar className="size-4 text-gold" />
              Période:{" "}
              <span className="text-foreground">
                {data.period.from} - {data.period.to}
              </span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-background/40 px-3 py-1.5 text-sm text-muted-foreground">
              <Wallet className="size-4 text-gold" />
              Net livré:{" "}
              <span className="text-foreground">
                {data.netDelivered.toLocaleString("fr-FR")} DH
              </span>
            </span>
          </div>
        </div>

        <div className="w-full lg:w-auto">
          <PerformanceDonut rate={data.deliveryRate} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.stats.map((stat) => (
          <StatCard
            key={stat.key}
            icon={stat.icon}
            label={stat.label}
            sublabel={stat.sublabel}
            value={stat.value}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <EvolutionChart data={data.evolution} />
        <OperationalSummary items={data.operationalSummary} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <StatusPipeline
          items={data.statusPipeline}
          total={data.stats[0].value}
        />
        <TopProducts products={data.topProducts} />
      </div>
    </div>
  );
}
