"use client";

import { useState } from "react";
import { Bell, Eye, EyeOff, Wallet } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

const BALANCE = 21449;

export function DashboardTopbar() {
  const [showBalance, setShowBalance] = useState(false);

  return (
    <header className="dark flex h-16 shrink-0 items-center justify-between gap-4 border-b border-sidebar-border bg-background px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-white" />
        <Separator orientation="vertical" className="h-6" />
        <div className="flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-3 py-1.5 text-sm">
          <Wallet className="size-4 text-gold" />
          <span className="text-muted-foreground">Solde disponible</span>
          <span className="font-mono font-semibold text-foreground tabular-nums">
            {showBalance
              ? `${BALANCE.toLocaleString("fr-FR")} DH`
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
        <button
          type="button"
          aria-label="Notifications"
          className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold hover:bg-gold/20"
        >
          <Bell className="size-4.5" />
        </button>
        <Avatar>
          <AvatarFallback className="bg-gold/15 text-gold">SW</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
