import {
  BadgeCheck,
  Building2,
  Cross,
  Headphones,
  Hexagon,
  Layers,
  Leaf,
  Package,
  ShoppingBag,
  Star,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const STATS: {
  icon: LucideIcon;
  value: string;
  label: string;
  description: string;
  accent?: "copper";
}[] = [
  {
    icon: Package,
    value: "25K+",
    label: "Commandes Livrées",
    description: "Commandes livrées avec succès à des clients satisfaits.",
  },
  {
    icon: Building2,
    value: "500+",
    label: "Clients Professionnels",
    description:
      "Des entreprises de toutes tailles font confiance à notre réseau de livraison.",
  },
  {
    icon: BadgeCheck,
    value: "99.8%",
    label: "Livraison à l'Heure",
    description: "Nous sommes fiers de notre service ponctuel et fiable.",
  },
  {
    icon: Headphones,
    value: "24/7",
    label: "Support Client",
    description: "Notre équipe de support est toujours là pour vous aider.",
    accent: "copper",
  },
];

const CLIENTS: { icon: LucideIcon; name: string; sub?: string }[] = [
  { icon: Hexagon, name: "TechNova", sub: "SOLUTIONS" },
  { icon: ShoppingBag, name: "UrbanMart" },
  { icon: Layers, name: "BuildCo.", sub: "CONSTRUCTION" },
  { icon: Leaf, name: "FreshBox" },
  { icon: Cross, name: "NovaCare" },
  { icon: Zap, name: "PrimeElectro" },
];

export function SocialProof() {
  return (
    <section className="dark relative isolate overflow-hidden bg-background py-20 sm:py-24 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -z-10 h-72 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="flex flex-col items-center gap-5 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold">
            <Star className="size-3.5 fill-gold" />
            Approuvé par des Milliers
          </div>

          <h2 className="font-heading text-balance text-4xl leading-[1.15] font-semibold tracking-tight text-foreground sm:text-5xl">
            Approuvé par des Entreprises
            <br />
            <span className="text-gold">Partout dans le Pays</span>
          </h2>

          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Nous livrons plus que des colis — nous livrons la confiance.
            Rejoignez des milliers d&apos;entreprises qui nous font confiance
            chaque jour.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 0.1}
              className="flex flex-col cursor-pointer items-center gap-3 rounded-2xl border border-gold/20 bg-card/40 p-8 text-center shadow-black/5 transition-all hover:-translate-y-1 hover:border-gold/40 hover:shadow-lg"
            >
              <span
                className={cn(
                  "flex size-16 items-center justify-center rounded-full",
                  stat.accent === "copper"
                    ? "bg-copper text-copper-foreground shadow-[0_0_24px_-6px_var(--copper)]"
                    : "bg-accent-warm text-accent-warm-foreground shadow-[0_0_24px_-6px_var(--accent-warm)]",
                )}
              >
                <stat.icon className="size-7" />
              </span>
              <p className="text-2xl font-semibold text-foreground sm:text-3xl">
                {stat.value}
              </p>
              <p className="text-sm font-semibold text-gold">{stat.label}</p>
              <span className="h-px w-6 bg-gold/40" />
              <p className="text-sm text-muted-foreground">
                {stat.description}
              </p>
            </Reveal>
          ))}
        </div>

        {/* <Reveal className="mt-20 flex flex-col items-center gap-8">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-copper/40" />
            <span className="text-sm font-medium tracking-wide text-gold">
              Approuvé par les entreprises leaders
            </span>
            <span className="h-px w-10 bg-copper/40" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {CLIENTS.map((client) => (
              <div
                key={client.name}
                className="flex items-center gap-2.5 rounded-xl border border-transparent px-4 py-2.5 text-muted-foreground transition-colors hover:border-gold/20 hover:bg-card/40 hover:text-foreground"
              >
                <client.icon className="size-6 shrink-0" />
                <div className="flex flex-col leading-tight">
                  <span className="font-semibold whitespace-nowrap">
                    {client.name}
                  </span>
                  {client.sub && (
                    <span className="text-[10px] tracking-[0.15em] text-muted-foreground/70">
                      {client.sub}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Reveal> */}
      </div>
    </section>
  );
}
