"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { buildCustomerStats } from "@/lib/customer-stats";

const SKELETON_ROWS = 5;

export function AdminCustomersTable() {
  const { data: colis = [], isLoading, isError } = useAdminColis();
  const [search, setSearch] = useState("");

  const customers = useMemo(() => buildCustomerStats(colis), [colis]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return customers;
    return customers.filter((customer) =>
      [customer.name, customer.email].join(" ").toLowerCase().includes(query),
    );
  }, [customers, search]);

  return (
    <Card className="border-none bg-card/60 ring-1 ring-white/10">
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Clients
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
                <TableHead>Client</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Colis</TableHead>
                <TableHead>Facturés</TableHead>
                <TableHead>Total net payé</TableHead>
                <TableHead>Dernière activité</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading &&
                Array.from({ length: SKELETON_ROWS }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: 6 }).map((__, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <Skeleton className="h-4 w-20" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              {isError && (
                <TableRow>
                  <TableCell colSpan={6} className="py-8 text-center text-destructive">
                    Erreur lors du chargement des clients.
                  </TableCell>
                </TableRow>
              )}
              {!isLoading && !isError && filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                    Aucun client trouvé.
                  </TableCell>
                </TableRow>
              )}
              {filtered.map((customer) => (
                <TableRow key={customer.userId}>
                  <TableCell className="font-medium text-foreground">{customer.name}</TableCell>
                  <TableCell className="text-muted-foreground">{customer.email}</TableCell>
                  <TableCell className="font-mono">{customer.totalColis}</TableCell>
                  <TableCell className="font-mono">{customer.colisFactures}</TableCell>
                  <TableCell className="font-mono font-medium text-gold">
                    {customer.totalNet} DH
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(new Date(customer.lastActivity), "dd/MM/yyyy")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="text-sm text-muted-foreground">
          {filtered.length} client{filtered.length !== 1 ? "s" : ""}
        </div>
      </CardContent>
    </Card>
  );
}
