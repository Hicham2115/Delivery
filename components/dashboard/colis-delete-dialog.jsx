"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteColis } from "@/hooks/use-delete-colis";

export function ColisDeleteDialog({ colis, onOpenChange }) {
  const deleteColis = useDeleteColis();

  async function handleConfirm() {
    try {
      await deleteColis.mutateAsync(colis.id);
      onOpenChange(false);
    } catch {
      // error toast already surfaced by useDeleteColis's onError
    }
  }

  return (
    <AlertDialog open={Boolean(colis)} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer ce colis ?</AlertDialogTitle>
          <AlertDialogDescription>
            {colis
              ? `Le colis ${colis.code} sera définitivement supprimé. Cette action est irréversible.`
              : null}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteColis.isPending}
            onClick={handleConfirm}
          >
            {deleteColis.isPending ? "Suppression..." : "Supprimer"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
