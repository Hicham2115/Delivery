"use client";

import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAdminColis } from "@/hooks/use-admin-colis";
import { STATUS_VALUES, ETAT_VALUES, useAdminUpdateColis } from "@/hooks/use-admin-update-colis";
import { ETAT_BADGE_CLASS, STATUS_BADGE_CLASS } from "@/lib/colis-badges";
import { getDeliveryFee, getNetAmount } from "@/lib/delivery-fees";
import { cn } from "@/lib/utils";

const SKELETON_ROWS = 5;

export function AdminColisTable() {
  const { data: colis = [], isLoading, isError } = useAdminColis();
  const updateColis = useAdminUpdateColis();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return colis;
    return colis.filter((row) =>
      [row.code, row.destinataire, row.telephone, row.ville, row.user?.name, row.user?.lastName, row.user?.email]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [colis, search]);

  return (
    <Card className="border-none bg-card/60 ring-1 ring-white/10">
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Tous les colis
          </h2>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher..."
            className="h-9 w-64 rounded-lg border-white/15 bg-white/5"
          />
        </div>

        <div className="overflow-hidden rounded-lg border border-white/10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code d&apos;envoi</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Destinataire</TableHead>
                <TableHead>Ville</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Total net</TableHead>
                <TableHead>Etat</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading &&
                Array.from({ length: SKELETON_ROWS }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: 8 }).map((__, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <Skeleton className="h-4 w-20" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              {isError && (
                <TableRow>
                  <TableCell colSpan={8} className="py-8 text-center text-destructive">
                    Erreur lors du chargement des colis.
                  </TableCell>
                </TableRow>
              )}
              {!isLoading && !isError && filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="py-8 text-center text-muted-foreground">
                    Aucun colis trouvé.
                  </TableCell>
                </TableRow>
              )}
              {filtered.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium text-foreground">{row.code}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{row.user?.name} {row.user?.lastName}</span>
                      <span className="text-xs text-muted-foreground">{row.user?.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{row.destinataire}</TableCell>
                  <TableCell>{row.ville}</TableCell>
                  <TableCell className="font-mono">{row.prix} DH</TableCell>
                  <TableCell className="font-mono font-medium text-foreground">
                    {getNetAmount(row)} DH
                  </TableCell>
                  <TableCell>
                    <Select
                      value={row.etat}
                      onValueChange={(value) =>
                        updateColis.mutate({
                          id: row.id,
                          data: { etat: ETAT_VALUES[value] },
                        })
                      }
                    >
                      <SelectTrigger
                        size="sm"
                        className="w-fit min-w-28 justify-start gap-1 border-none bg-transparent p-0 shadow-none hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent"
                      >
                        <Badge
                          variant="outline"
                          className={cn("gap-1.5 border px-2.5 py-1", ETAT_BADGE_CLASS[row.etat])}
                        >
                          <span className="size-1.5 rounded-full bg-current" />
                          {row.etat}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(ETAT_VALUES).map((etat) => (
                          <SelectItem key={etat} value={etat}>
                            {etat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={row.status}
                      onValueChange={(value) =>
                        updateColis.mutate({
                          id: row.id,
                          data: { status: STATUS_VALUES[value] },
                        })
                      }
                    >
                      <SelectTrigger
                        size="sm"
                        className="w-fit min-w-28 justify-start gap-1 border-none bg-transparent p-0 shadow-none hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent"
                      >
                        <Badge
                          variant="outline"
                          className={cn("gap-1.5 border px-2.5 py-1", STATUS_BADGE_CLASS[row.status])}
                        >
                          <span className="size-1.5 rounded-full bg-current" />
                          {row.status}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(STATUS_VALUES).map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="text-sm text-muted-foreground">
          {filtered.length} colis{filtered.length !== colis.length ? ` (sur ${colis.length})` : ""}
        </div>
      </CardContent>
    </Card>
  );
}
