"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Phone, Rocket } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { AuthDialog } from "@/components/auth-dialog";

const TRUST_ITEMS = [
  "Aucune carte bancaire requise",
  "Configuration en quelques minutes",
  "Annulation à tout moment",
];

export function Cta() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signup");

  const openAuth = (mode) => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  return (
    <section className="dark relative isolate overflow-hidden bg-background py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="relative isolate overflow-hidden rounded-3xl border border-border border-l-2 border-l-gold bg-card/90 px-6 py-16 text-center shadow-2xl shadow-black/40 ring-1 ring-white/5 sm:px-12 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 left-1/2 -z-10 h-72 w-175 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl"
          />

          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold">
              <Rocket className="size-3.5" />
              Commencez Dès Aujourd&apos;hui
            </div>

            <h2 className="font-heading text-balance text-4xl leading-[1.15] font-semibold tracking-tight text-foreground sm:text-5xl">
              Prêt à Livrer en Toute{" "}
              <span className="text-gold">Confiance ?</span>
            </h2>

            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Rejoignez des milliers d&apos;entreprises et de particuliers qui
              font confiance à SwiftWay pour une livraison rapide, sécurisée et
              fiable — à chaque fois.
            </p>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                size="lg"
                className="h-12 w-full gap-2 rounded-lg bg-gold px-6 text-base text-gold-foreground hover:bg-gold/85 sm:w-auto"
                onClick={() => openAuth("signup")}
              >
                Créer une Commande
                <ArrowRight />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 w-full gap-2 rounded-lg border-copper/30 px-6 text-base text-copper hover:bg-copper/10 hover:text-copper sm:w-auto"
                // onClick={() => openAuth("signup")}
              >
                <Phone />
                Contacter les Ventes
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2">
              {TRUST_ITEMS.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground"
                >
                  <Check className="size-3.5 text-gold" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <AuthDialog
        open={authOpen}
        onOpenChange={setAuthOpen}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </section>
  );
}
