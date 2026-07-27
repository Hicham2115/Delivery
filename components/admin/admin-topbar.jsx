"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/use-logout";

export function AdminTopbar() {
  const router = useRouter();
  const logoutMutation = useLogout();

  return (
    <header className="dark flex h-16 shrink-0 items-center justify-between gap-4 border-b border-sidebar-border bg-background px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-white" />
        <Separator orientation="vertical" className="h-6" />
        <span className="text-sm font-medium text-muted-foreground">
          Gestion des colis
        </span>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="gap-1.5"
        onClick={async () => {
          await logoutMutation.mutateAsync();
          router.push("/admin/login");
        }}
      >
        <LogOut className="size-3.5" />
        Déconnexion
      </Button>
    </header>
  );
}
