"use client";

import { Settings } from "lucide-react";

import { SettingsForm } from "@/components/dashboard/settings-form";
import { Skeleton } from "@/components/ui/skeleton";
import { useMe } from "@/hooks/use-me";

function SettingsSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-64 rounded-xl" />
      <Skeleton className="h-48 rounded-xl" />
    </div>
  );
}

export default function SettingsPage() {
  const { data: user, isPending } = useMe();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 rounded-xl bg-gradient-to-br from-gold/20 via-card/60 to-card/60 p-6 ring-1 ring-white/10">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
          <Settings className="size-5" />
        </span>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Paramètres
          </h1>
          <p className="text-base text-muted-foreground">
            Gérez vos informations personnelles et votre mot de passe.
          </p>
        </div>
      </div>

      {isPending || !user ? <SettingsSkeleton /> : <SettingsForm user={user} />}
    </div>
  );
}
