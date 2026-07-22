import {
  Clock,
  Headphones,
  Hexagon,
  Box,
  IdCard,
  MapPin,
  Package,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { Reveal } from "@/components/reveal";

const STEPS = [
  {
    number: 1,
    icon: IdCard,
    title: "Créer un Compte",
    description:
      "Inscrivez-vous en quelques minutes et accédez à toutes les fonctionnalités de livraison.",
  },
  {
    number: 2,
    icon: Package,
    title: "Créez Votre Commande",
    description:
      "Saisissez les détails de prise en charge et de livraison, choisissez un service et passez votre commande.",
  },
  {
    number: 3,
    icon: Truck,
    title: "Nous la Récupérons",
    description: "Notre équipe reçoit votre commande et la récupère avec soin.",
  },
  {
    number: 4,
    icon: MapPin,
    title: "Suivez et Recevez votre Livraison",
    description:
      "Suivez votre commande en temps réel et faites-la livrer en toute sécurité à destination.",
  },
];

const HIGHLIGHTS = [
  {
    icon: ShieldCheck,
    title: "Sécurisé et Sûr",
    description: "Vos colis sont toujours protégés.",
  },
  {
    icon: Clock,
    title: "Livraison à l'Heure",
    description: "Nous livrons à l'heure, à chaque fois.",
  },
  {
    icon: MapPin,
    title: "Suivi en Temps Réel",
    description: "Suivez vos commandes à tout moment, de n'importe où.",
  },
  {
    icon: Headphones,
    title: "Support 24/7",
    description: "Notre équipe de support est toujours là pour vous aider.",
  },
];

export function HowItWorks() {
  return (
    <section className="dark relative isolate overflow-hidden bg-background py-20 sm:py-24 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -z-10 h-72 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="flex flex-col items-center gap-5 text-center">
          <div className="inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-gold">
            SIMPLE. RAPIDE. FIABLE.
          </div>

          <h2 className="font-heading text-balance text-5xl leading-[1.1] font-semibold tracking-tight text-foreground sm:text-6xl">
            Comment ça <span className="text-gold">Marche</span>
          </h2>

          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold/40" />
            <span className="relative flex size-6 items-center justify-center">
              <Hexagon className="size-6 text-gold" strokeWidth={1.5} />
              <Box className="absolute size-2.5 text-gold" strokeWidth={2} />
            </span>
            <span className="h-px w-8 bg-gold/40" />
          </div>

          <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            De la passation de votre commande à la livraison finale, nous
            rendons le processus fluide et transparent.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <Reveal
              key={step.number}
              delay={index * 0.1}
              className="group relative flex flex-col items-center gap-4 rounded-2xl border border-border bg-card/40 px-6 pt-10 pb-8 text-center transition-all hover:-translate-y-1 hover:border-gold/40 hover:shadow-lg"
            >
              {index > 0 && (
                <>
                  <span
                    aria-hidden
                    className="absolute top-0 left-0 hidden h-px w-6 -translate-x-6 -translate-y-1/2 bg-gold/30 lg:block"
                  />
                  <span
                    aria-hidden
                    className="absolute top-0 left-0 hidden size-1.5 -translate-x-3 -translate-y-1/2 rounded-full bg-gold/60 lg:block"
                  />
                </>
              )}

              <span className="absolute -top-6 left-1/2 flex size-12 -translate-x-1/2 items-center justify-center rounded-full border-2 border-gold bg-background  text-lg font-semibold text-gold shadow-[0_0_20px_-4px_var(--gold)]">
                {step.number}
              </span>

              <span className="flex size-24 shrink-0 items-center justify-center rounded-full border border-gold/20 bg-background/60 text-gold transition-transform group-hover:scale-105">
                <step.icon className="size-10" strokeWidth={1.5} />
              </span>

              <div className="flex flex-col gap-2">
                <p className=" text-lg font-semibold text-foreground">
                  {step.title}
                </p>
                <span className="mx-auto h-px w-6 bg-gold/40" />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 rounded-2xl border border-gold/15 bg-card/40 p-8 shadow-sm">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {HIGHLIGHTS.map((item) => (
              <div key={item.title} className="flex items-center gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-copper/15 text-copper shadow-[0_0_16px_-6px_var(--copper)]">
                  <item.icon className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
