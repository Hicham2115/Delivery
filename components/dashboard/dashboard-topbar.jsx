"use client";

import { useMemo, useState } from "react";
import { Eye, EyeOff, Wallet } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NotificationsPopover } from "@/components/dashboard/notifications-popover";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useColis } from "@/hooks/use-colis";
import { getNetAmount } from "@/lib/delivery-fees";

export function DashboardTopbar() {
  const [showBalance, setShowBalance] = useState(false);
  const { data: colis = [] } = useColis();

  const balance = useMemo(
    () =>
      colis
        .filter((row) => row.status === "Livré" && row.etat !== "Facturé")
        .reduce((sum, row) => sum + getNetAmount(row), 0),
    [colis],
  );

  return (
    <header className="dark flex h-16 shrink-0 items-center justify-between gap-4 border-b border-sidebar-border bg-background px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-white" />
        <Separator orientation="vertical" className="h-6" />
        <div className="flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-3 py-1.5 text-sm">
          <Wallet className="size-4 text-gold" />
          <span className="hidden text-muted-foreground sm:inline">
            Solde disponible
          </span>
          <span className="font-mono font-semibold text-foreground tabular-nums">
            {showBalance
              ? `${balance.toLocaleString("fr-FR")} DH`
              : "****** DH"}
          </span>
          <button
            type="button"
            onClick={() => setShowBalance((value) => !value)}
            aria-label={showBalance ? "Masquer le solde" : "Afficher le solde"}
            className="cursor-pointer text-muted-foreground hover:text-foreground"
          >
            {showBalance ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <NotificationsPopover />
        <Avatar>
          <AvatarFallback className="bg-gold/15 text-gold">SW</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
