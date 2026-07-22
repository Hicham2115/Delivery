import Link from "next/link";
import {
  Award,
  ArrowRight,
  CalendarClock,
  CarFront,
  Handshake,
  MapPinned,
  Receipt,
  UserCheck,
} from "lucide-react";

import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BENEFITS = [
  {
    icon: CarFront,
    title: "Flotte Premium",
    description:
      "Des véhicules modernes et bien entretenus pour un trajet sûr et confortable.",
  },
  {
    icon: UserCheck,
    title: "Chauffeurs Vérifiés",
    description:
      "Chaque chauffeur fait l'objet d'une vérification et d'une formation professionnelle.",
  },
  {
    icon: Receipt,
    title: "Tarification Transparente",
    description: "Aucun frais caché — sachez exactement ce que vous payez.",
  },
  {
    icon: MapPinned,
    title: "Couverture Nationale",
    description:
      "Des centres-villes aux zones les plus reculées, nous livrons partout.",
  },
  {
    icon: Handshake,
    title: "Support Dédié",
    description:
      "Un gestionnaire de compte personnel pour tous vos besoins professionnels.",
    accent: "copper",
  },
  {
    icon: CalendarClock,
    title: "Horaires Flexibles",
    description:
      "Livraisons le jour même, programmées ou récurrentes, selon vos besoins.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="dark relative isolate overflow-hidden bg-background py-20 sm:py-24 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -z-10 h-72 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="flex flex-col items-start gap-6 lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold">
              <Award className="size-3.5" />
              Pourquoi Nous Choisir
            </div>

            <h2 className="font-heading text-balance text-4xl leading-[1.15] font-semibold tracking-tight text-foreground sm:text-5xl">
              La Différence <span className="text-gold">SwiftWay</span>
            </h2>

            <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              Nous combinons un service premium, des professionnels vérifiés et
              une technologie de pointe pour vous offrir une expérience de
              livraison sur laquelle vous pouvez toujours compter.
            </p>

            <div className="flex items-center gap-4 rounded-2xl border border-gold/20 bg-card/40 p-5">
              <span className="text-3xl font-semibold text-gold">98%</span>
              <span className="h-10 w-px bg-border" />
              <p className="max-w-40 text-sm text-muted-foreground">
                des clients jugent leur expérience de livraison excellente.
              </p>
            </div>

            <Button
              size="lg"
              className="h-12 gap-2 rounded-lg bg-gold px-6 text-base text-gold-foreground hover:bg-gold/85"
              nativeButton={false}
              render={<Link href="/signup" />}
            >
              Commencer
              <ArrowRight />
            </Button>
          </Reveal>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {BENEFITS.map((benefit, index) => (
                <Reveal
                  key={benefit.title}
                  delay={index * 0.08}
                  className="flex cursor-pointer flex-col items-start gap-4 rounded-2xl border border-border bg-card/40 p-6 transition-colors hover:border-gold/40"
                >
                  <span
                    className={cn(
                      "flex size-12 shrink-0 items-center justify-center rounded-full",
                      benefit.accent === "copper"
                        ? "bg-copper/15 text-copper"
                        : "bg-accent-warm/15 text-accent-warm",
                    )}
                  >
                    <benefit.icon className="size-5" />
                  </span>
                  <div>
                    <p className=" text-lg font-semibold text-foreground">
                      {benefit.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
