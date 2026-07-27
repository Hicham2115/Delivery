import Link from "next/link";
import { ArrowLeft, PackagePlus } from "lucide-react";

import { ColisForm } from "@/components/dashboard/colis-form";
import { Button } from "@/components/ui/button";

export default function NewColisPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-xl bg-gradient-to-br from-gold/20 via-card/60 to-card/60 p-6 ring-1 ring-white/10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
            <PackagePlus className="size-5" />
          </span>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Nouveau colis</h1>
            <p className="text-base text-muted-foreground">
              Remplissez les informations du colis puis cliquez sur Enregistrer.
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          nativeButton={false}
          className="border-white/15 bg-white/5 py-5 text-foreground hover:bg-white/10"
          render={<Link href="/dashboard/colis" />}
        >
          <ArrowLeft className="size-4" />
          Voir la liste des colis
        </Button>
      </div>

      <ColisForm />
    </div>
  );
}
