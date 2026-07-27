"use client";

import { Ban, Boxes, MapPin, MessageSquare, Phone, Repeat, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ETAT_BADGE_CLASS, STATUS_BADGE_CLASS } from "@/lib/colis-badges";

const OPTION_ITEMS = [
  { key: "interditOuverture", label: "Interdit ouverture colis", icon: Ban },
  { key: "colisARemplacer", label: "Colis à remplacer", icon: Repeat },
  { key: "colisDeStock", label: "Colis de stock", icon: Boxes },
];

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
        <Icon className="size-4" />
      </span>
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
          {label}
        </span>
        <span className="truncate text-sm font-medium text-foreground">
          {value || "—"}
        </span>
      </div>
    </div>
  );
}

export function ColisDetailsDialog({ colis, onOpenChange }) {
  return (
    <Dialog open={Boolean(colis)} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {colis && (
          <>
            <DialogHeader className="gap-3">
              <div className="flex items-start justify-between gap-4 pr-8">
                <div className="flex flex-col gap-1.5">
                  <DialogTitle>Détails du colis</DialogTitle>
                  <span className="truncate font-mono text-xs text-muted-foreground">
                    {colis.code}
                  </span>
                </div>
                <span className="shrink-0 font-mono text-2xl font-semibold text-gold tabular-nums">
                  {colis.prix} DH
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className={ETAT_BADGE_CLASS[colis.etat]}>
                  {colis.etat}
                </Badge>
                <Badge variant="outline" className={STATUS_BADGE_CLASS[colis.status]}>
                  {colis.status}
                </Badge>
              </div>
            </DialogHeader>

            <Separator />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <DetailRow icon={User} label="Destinataire" value={colis.destinataire} />
              <DetailRow icon={Phone} label="Téléphone" value={colis.telephone} />
              <DetailRow icon={MapPin} label="Ville" value={colis.ville} />
              <DetailRow icon={MapPin} label="Adresse" value={colis.adresse} />
              <DetailRow icon={Boxes} label="Quantité" value={colis.quantite} />
            </div>

            {colis.commentaire && (
              <>
                <Separator />
                <DetailRow icon={MessageSquare} label="Commentaire" value={colis.commentaire} />
              </>
            )}

            <Separator />

            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                Options
              </span>
              <div className="flex flex-wrap gap-2">
                {OPTION_ITEMS.filter((option) => colis[option.key]).map((option) => (
                  <span
                    key={option.key}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium text-gold"
                  >
                    <option.icon className="size-3.5" />
                    {option.label}
                  </span>
                ))}
                {OPTION_ITEMS.every((option) => !colis[option.key]) && (
                  <span className="text-sm text-muted-foreground">
                    Aucune option sélectionnée
                  </span>
                )}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
