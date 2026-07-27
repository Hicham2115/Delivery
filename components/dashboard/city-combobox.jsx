"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MOROCCAN_CITIES } from "@/lib/cities";
import { cn } from "@/lib/utils";

export function CityCombobox({ id, value, onChange, onBlur }) {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) onBlur?.();
      }}
    >
      <PopoverTrigger
        render={
          <Button
            id={id}
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="h-11 w-full justify-between rounded-lg border-white/15 bg-white/5 font-normal"
          />
        }
      >
        <span className={cn(!value && "text-muted-foreground")}>
          {value || "Rechercher une ville..."}
        </span>
        <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0" align="start">
        <Command>
          <CommandInput placeholder="Rechercher une ville..." />
          <CommandList>
            <CommandEmpty>Aucune ville trouvée.</CommandEmpty>
            <CommandGroup>
              {MOROCCAN_CITIES.map((city) => (
                <CommandItem
                  key={city}
                  value={city}
                  onSelect={() => {
                    onChange(city);
                    setOpen(false);
                  }}
                >
                  <Check className={cn("size-4", value === city ? "opacity-100" : "opacity-0")} />
                  {city}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
