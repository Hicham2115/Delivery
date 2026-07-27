"use client";

import { ColisForm } from "@/components/dashboard/colis-form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function ColisEditSheet({ colis, onOpenChange }) {
  return (
    <Sheet open={Boolean(colis)} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto data-[side=right]:w-full data-[side=right]:sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>Modifier le colis</SheetTitle>
        </SheetHeader>
        <div className="px-4 pb-4">
          {colis && (
            <ColisForm colis={colis} onSuccess={() => onOpenChange(false)} />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
