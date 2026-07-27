"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getDeliveryFee, getNetAmount } from "@/lib/delivery-fees";
import { STATUS_BADGE_CLASS } from "@/lib/colis-badges";

const PAGE_SIZE = 10;

export function PaymentsTable({ factures }) {
  const [page, setPage] = useState(1);

  const pageCount = Math.max(1, Math.ceil(factures.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const paginated = factures.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <Card className="border-none bg-card/60 ring-1 ring-white/10">
      <CardContent className="flex flex-col gap-4">
        <div className="overflow-hidden rounded-lg border border-white/10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code d&apos;envoi</TableHead>
                <TableHead>Destinataire</TableHead>
                <TableHead>Ville</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Frais</TableHead>
                <TableHead className="text-right">Net payé</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="py-8 text-center text-muted-foreground">
                    Aucun colis facturé pour le moment.
                  </TableCell>
                </TableRow>
              )}
              {paginated.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium text-foreground">{row.code}</TableCell>
                  <TableCell>{row.destinataire}</TableCell>
                  <TableCell>{row.ville}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={STATUS_BADGE_CLASS[row.status]}>
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono">{row.prix} DH</TableCell>
                  <TableCell className="font-mono text-muted-foreground">
                    -{getDeliveryFee(row.ville)} DH
                  </TableCell>
                  <TableCell className="text-right font-mono font-semibold text-gold">
                    {getNetAmount(row)} DH
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{factures.length} colis facturés</span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="py-5"
              disabled={currentPage <= 1}
              onClick={() => setPage((value) => Math.max(1, value - 1))}
            >
              Précédent
            </Button>
            <span>
              Page {currentPage} / {pageCount}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="py-5"
              disabled={currentPage >= pageCount}
              onClick={() => setPage((value) => Math.min(pageCount, value + 1))}
            >
              Suivant
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
