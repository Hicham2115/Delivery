import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CirclePlay,
  Headphones,
  MapPin,
  Package,
  ShieldCheck,
  Star,
  Truck,
  Zap,
} from "lucide-react";

import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import heroImage from "@/app/assets/hero.png";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Sécurisé et Sûr",
    description: "Vos colis sont protégés à 100 %",
  },
  {
    icon: Zap,
    title: "Livraison Rapide",
    description: "Livraison à l'heure, à chaque fois",
  },
  {
    icon: Headphones,
    title: "Support 24/7",
    description: "Nous sommes là pour vous aider à tout moment",
    accent: "copper",
  },
  {
    icon: MapPin,
    title: "Suivi en Temps Réel",
    description: "Sachez où se trouve votre colis à tout moment",
  },
];

const STEPS = [
  { icon: Package, label: "Commande Passée", status: "completed" },
  { icon: Truck, label: "En Transit", status: "current" },
  { icon: MapPin, label: "En Cours de Livraison", status: "upcoming" },
  { icon: Package, label: "Livré", status: "upcoming" },
];

export function Hero() {
  return (
    <section className="dark relative isolate overflow-hidden bg-background lg:min-h-170">
      <div className="absolute inset-0 -z-10">
        <Image
          src={heroImage}
          alt="Camionnette de livraison SwiftWay garée en ville, prête à partir"
          fill
          preload
          sizes="100vw"
          className="object-cover object-right"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
      </div>

      <div className="mx-auto mt-20 flex w-full max-w-7xl flex-col gap-10 px-4 pt-16 pb-12 sm:pt-20 sm:pb-48 lg:pb-56">
        <Reveal className="flex max-w-xl flex-col items-start gap-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold">
            <Star className="size-3.5 fill-gold" />
            Service de Livraison Premium
          </div>

          <h1 className="font-heading text-balance text-4xl leading-[1.1] font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Livrer Plus Que <span className="text-gold">Des Colis.</span>
          </h1>

          <p className="max-w-md text-base leading-relaxed text-white sm:text-lg">
            Une expérience de livraison fluide, de la prise en charge à votre
            porte. Rapide, sécurisée et fiable.
          </p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button
              size="lg"
              className="h-12 w-full font-semibold gap-2 rounded-lg bg-gold px-6 text-base text-gold-foreground hover:bg-gold/85 sm:w-auto"
              nativeButton={false}
              render={<Link href="/signup" />}
            >
              <Package />
              Créer une Commande
              <ArrowRight />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 w-full gap-2 font-semibold rounded-lg border-border bg-background/40 px-6 text-white   backdrop-blur-sm sm:w-auto"
              nativeButton={false}
              render={<Link href="/track" />}
            >
              <CirclePlay />
              Suivre une Commande
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-5 pt-2 sm:gap-x-10">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="flex items-start gap-3">
                <span
                  className={cn(
                    "flex size-11 shrink-0 items-center justify-center rounded-full",
                    feature.accent === "copper"
                      ? "bg-copper/15 text-copper"
                      : "bg-accent-warm/15 text-accent-warm",
                  )}
                >
                  <feature.icon className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {feature.title}
                  </p>
                  <p className="text-xs text-white/90">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal
          delay={0.2}
          className="relative z-20 mx-auto flex w-full max-w-6xl flex-col gap-5 rounded-2xl border border-border border-l-2 border-l-gold bg-card/95 p-5 shadow-2xl shadow-black/40 ring-1 ring-white/5 backdrop-blur-md sm:absolute sm:inset-x-8 sm:bottom-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-6 lg:inset-x-12"
        >
          <div className="flex flex-col gap-1.5">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-gold/10 px-2.5 py-1 text-[11px] font-medium text-gold">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-gold" />
              </span>
              Suivi en Direct
            </span>
            <p className="font-heading text-base leading-tight font-semibold text-foreground">
              Votre Livraison, Notre Priorité
            </p>
          </div>

          <div className="flex items-center overflow-x-auto">
            {STEPS.map((step, index) => (
              <div key={step.label} className="flex items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <span
                    className={cn(
                      "relative flex size-9 shrink-0 items-center justify-center rounded-full border",
                      step.status === "completed" &&
                        "border-gold bg-gold text-gold-foreground shadow-[0_0_14px_-2px_var(--gold)]",
                      step.status === "current" &&
                        "border-gold bg-gold/15 text-gold ring-2 ring-gold/30 ring-offset-2 ring-offset-card",
                      step.status === "upcoming" &&
                        "border-border text-muted-foreground",
                    )}
                  >
                    <step.icon className="size-4" />
                    {step.status === "current" && (
                      <span className="absolute -top-0.5 -right-0.5 flex size-2.5">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold opacity-75" />
                        <span className="relative inline-flex size-2.5 rounded-full border border-card bg-gold" />
                      </span>
                    )}
                  </span>
                  <span
                    className={cn(
                      "text-[11px] whitespace-nowrap",
                      step.status === "upcoming"
                        ? "text-muted-foreground"
                        : "font-medium text-foreground",
                    )}
                  >
                    {step.label}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <span
                    className={cn(
                      "mx-2 h-px w-6 sm:w-10",
                      step.status === "completed" ? "bg-gold" : "bg-border",
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
