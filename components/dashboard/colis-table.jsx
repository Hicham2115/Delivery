"use client";

import { useMemo, useState } from "react";
import { Download, Eye, Info, Pencil } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useColisStore } from "@/stores/use-colis-store";

const PAGE_SIZE_OPTIONS = ["10", "25", "50"];
const ALL = "tous";

const ETAT_BADGE_CLASS = {
  "Facturé": "border-violet-400/40 text-violet-400",
  "Non facturé": "border-muted-foreground/40 text-muted-foreground",
};

const STATUS_BADGE_CLASS = {
  "Livré": "border-emerald-400/40 text-emerald-400",
  "Ramassage": "border-amber-400/40 text-amber-400",
  "En cours": "border-sky-400/40 text-sky-400",
  "Retourné": "border-red-400/40 text-red-400",
  "Nouveau": "border-gold/40 text-gold",
};

function exportColisCsv(rows, filename) {
  const header = ["Code d'envoi", "Destinataire", "Téléphone", "Etat", "Status", "Ville", "Prix"];
  const lines = rows.map((row) =>
    [row.code, row.destinataire, row.telephone, row.etat, row.status, row.ville, row.prix]
      .map((value) => `"${String(value).replace(/"/g, '""')}"`)
      .join(","),
  );
  const csv = [header.join(","), ...lines].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function ColisTable() {
  const colis = useColisStore((state) => state.colis);
  const [search, setSearch] = useState("");
  const [etatFilter, setEtatFilter] = useState(ALL);
  const [statusFilter, setStatusFilter] = useState(ALL);
  const [villeFilter, setVilleFilter] = useState(ALL);
  const [pageSize, setPageSize] = useState("10");
  const [page, setPage] = useState(1);

  const villes = useMemo(
    () => Array.from(new Set(colis.map((row) => row.ville))).sort(),
    [colis],
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return colis.filter((row) => {
      if (etatFilter !== ALL && row.etat !== etatFilter) return false;
      if (statusFilter !== ALL && row.status !== statusFilter) return false;
      if (villeFilter !== ALL && row.ville !== villeFilter) return false;
      if (!query) return true;
      return [row.code, row.destinataire, row.telephone, row.ville]
        .join(" ")
        .toLowerCase()
        .includes(query);
    });
  }, [colis, search, etatFilter, statusFilter, villeFilter]);

  const pageSizeNumber = Number(pageSize);
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSizeNumber));
  const currentPage = Math.min(page, pageCount);
  const paginated = filtered.slice(
    (currentPage - 1) * pageSizeNumber,
    currentPage * pageSizeNumber,
  );

  function resetToFirstPage(callback) {
    setPage(1);
    callback();
  }

  return (
    <Card className="border-none bg-card/60 ring-1 ring-white/10">
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <Select
            value={etatFilter}
            onValueChange={(value) => resetToFirstPage(() => setEtatFilter(value))}
          >
            <SelectTrigger className="w-40">
              <SelectValue>{(value) => (value === ALL ? "Etat (tous)" : value)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>Etat (tous)</SelectItem>
              {Object.keys(ETAT_BADGE_CLASS).map((etat) => (
                <SelectItem key={etat} value={etat}>
                  {etat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={statusFilter}
            onValueChange={(value) => resetToFirstPage(() => setStatusFilter(value))}
          >
            <SelectTrigger className="w-40">
              <SelectValue>{(value) => (value === ALL ? "Status (tous)" : value)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>Status (tous)</SelectItem>
              {Object.keys(STATUS_BADGE_CLASS).map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={villeFilter}
            onValueChange={(value) => resetToFirstPage(() => setVilleFilter(value))}
          >
            <SelectTrigger className="w-40">
              <SelectValue>{(value) => (value === ALL ? "Ville (toutes)" : value)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>Ville (toutes)</SelectItem>
              {villes.map((ville) => (
                <SelectItem key={ville} value={ville}>
                  {ville}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="ml-auto flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="py-5"
              onClick={() => exportColisCsv(filtered, "colis.csv")}
            >
              <Download className="size-4" />
              Exporter les colis
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="py-5"
              onClick={() => exportColisCsv(filtered, "etat-colis.csv")}
            >
              <Download className="size-4" />
              Télécharger Etat
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Afficher
            <Select
              value={pageSize}
              onValueChange={(value) => resetToFirstPage(() => setPageSize(value))}
            >
              <SelectTrigger className="w-20" size="sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            entrées par page
          </div>

          <Input
            value={search}
            onChange={(e) => resetToFirstPage(() => setSearch(e.target.value))}
            placeholder="Rechercher..."
            className="h-9 w-56 rounded-lg border-white/15 bg-white/5"
          />
        </div>

        <div className="overflow-hidden rounded-lg border border-white/10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code d&apos;envoi</TableHead>
                <TableHead>Destinataire</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Etat</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ville</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="py-8 text-center text-muted-foreground">
                    Aucun colis trouvé.
                  </TableCell>
                </TableRow>
              )}
              {paginated.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium text-foreground">{row.code}</TableCell>
                  <TableCell>{row.destinataire}</TableCell>
                  <TableCell>{row.telephone}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={ETAT_BADGE_CLASS[row.etat]}>
                      {row.etat}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={STATUS_BADGE_CLASS[row.status]}>
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{row.ville}</TableCell>
                  <TableCell className="font-mono">{row.prix} DH</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1.5">
                      <Button variant="outline" size="icon-sm" aria-label="Voir">
                        <Eye className="size-3.5" />
                      </Button>
                      <Button variant="outline" size="icon-sm" aria-label="Détails">
                        <Info className="size-3.5" />
                      </Button>
                      <Button variant="outline" size="icon-sm" aria-label="Modifier">
                        <Pencil className="size-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {filtered.length} colis{filtered.length !== colis.length ? ` (sur ${colis.length})` : ""}
          </span>
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
