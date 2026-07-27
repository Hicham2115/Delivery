"use client";

import { useState } from "react";
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const PRESETS = [
  {
    key: "today",
    label: "Aujourd'hui",
    getRange: () => ({ from: startOfDay(new Date()), to: endOfDay(new Date()) }),
  },
  {
    key: "7days",
    label: "7 derniers jours",
    getRange: () => ({ from: startOfDay(subDays(new Date(), 6)), to: endOfDay(new Date()) }),
  },
  {
    key: "lastWeek",
    label: "Semaine dernière",
    getRange: () => {
      const lastWeek = subWeeks(new Date(), 1);
      return {
        from: startOfWeek(lastWeek, { weekStartsOn: 1 }),
        to: endOfWeek(lastWeek, { weekStartsOn: 1 }),
      };
    },
  },
  {
    key: "lastMonth",
    label: "Mois dernier",
    getRange: () => {
      const lastMonth = subMonths(new Date(), 1);
      return { from: startOfMonth(lastMonth), to: endOfMonth(lastMonth) };
    },
  },
  {
    key: "lastYear",
    label: "Année dernière",
    getRange: () => {
      const lastYear = subYears(new Date(), 1);
      return { from: startOfYear(lastYear), to: endOfYear(lastYear) };
    },
  },
];

export function ColisDateFilter({ range, onChange }) {
  const [open, setOpen] = useState(false);
  const [draftRange, setDraftRange] = useState(range);

  function handleOpenChange(next) {
    setOpen(next);
    if (next) setDraftRange(range);
  }

  function applyPreset(preset) {
    onChange(preset.getRange());
    setOpen(false);
  }

  function clear() {
    onChange(null);
    setOpen(false);
  }

  function applyCustomRange() {
    if (!draftRange?.from) return;
    onChange({
      from: startOfDay(draftRange.from),
      to: endOfDay(draftRange.to ?? draftRange.from),
    });
    setOpen(false);
  }

  const label = range
    ? `${format(range.from, "d MMM yyyy", { locale: fr })} – ${format(range.to, "d MMM yyyy", { locale: fr })}`
    : "Date (toutes)";

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="w-56 justify-start py-5 font-normal"
          />
        }
      >
        <CalendarIcon className="size-4 shrink-0" />
        <span className={cn("truncate", !range && "text-muted-foreground")}>{label}</span>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex flex-col divide-y divide-border sm:flex-row sm:divide-x sm:divide-y-0">
          <div className="flex flex-col gap-1 p-2 sm:w-44">
            <Button variant="ghost" size="sm" className="justify-start" onClick={clear}>
              Toutes les dates
            </Button>
            {PRESETS.map((preset) => (
              <Button
                key={preset.key}
                variant="ghost"
                size="sm"
                className="justify-start"
                onClick={() => applyPreset(preset)}
              >
                {preset.label}
              </Button>
            ))}
          </div>
          <div className="flex flex-col gap-2 p-2">
            <Calendar
              mode="range"
              locale={fr}
              selected={draftRange ?? undefined}
              onSelect={(selected) =>
                setDraftRange(
                  selected ? { from: selected.from, to: selected.to ?? selected.from } : null,
                )
              }
              numberOfMonths={1}
            />
            <div className="flex justify-end gap-2 px-2 pb-2">
              <Button
                size="sm"
                disabled={!draftRange?.from}
                className="bg-gold font-semibold text-gold-foreground hover:bg-gold/85"
                onClick={applyCustomRange}
              >
                Appliquer
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
