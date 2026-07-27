import Link from "next/link";
import { Plus } from "lucide-react";

import { ColisTable } from "@/components/dashboard/colis-table";
import { Button } from "@/components/ui/button";

export default function ColisListPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <nav className="font-sans text-sm text-muted-foreground">
            <Link href="/dashboard" className="hover:text-foreground font-sans">
              Accueil
            </Link>
            {" / "}
            <span>Colis</span>
            {" / "}
            <span className="text-foreground">Liste des colis</span>
          </nav>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Liste des colis
          </h1>
        </div>
        <Button
          render={<Link href="/dashboard/colis/new" />}
          nativeButton={false}
          className="bg-gold py-5 font-semibold text-gold-foreground hover:bg-gold/85"
        >
          <Plus className="size-4" />
          Ajouter colis
        </Button>
      </div>

      <ColisTable />
    </div>
  );
}
