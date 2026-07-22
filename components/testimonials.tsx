import { Heart, Star } from "lucide-react";

import { Reveal } from "@/components/reveal";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5 text-copper">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className="size-3.5"
          fill={index < count ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}

const RATING_BREAKDOWN = [
  { stars: 5, count: 2480 },
  { stars: 4, count: 165 },
  { stars: 3, count: 38 },
  { stars: 2, count: 9 },
  { stars: 1, count: 4 },
];

const MAX_COUNT = Math.max(...RATING_BREAKDOWN.map((row) => row.count));

const FEATURED_REVIEW = {
  initial: "S",
  name: "Sarah M.",
  location: "CLIENTE VÉRIFIÉE · CHICAGO",
  timeAgo: "il y a 3 semaines",
  rating: 5,
  meta: "Compte professionnel · Commerce de détail · Cliente depuis 8 mois",
  quote:
    "Honnêtement, c'est le seul transporteur en qui j'ai confiance pour les commandes urgentes.",
  body: "Nous avons confié toute notre logistique à SwiftWay il y a six mois et nous ne le regrettons pas. Chaque colis arrive à l'heure, le suivi est d'une précision remarquable, et leur équipe de support répond vraiment au téléphone. Il est rare de trouver un partenaire de livraison aussi fiable.",
  tag: "LIVRAISON LE JOUR MÊME · FORMULE PROFESSIONNELLE",
  helpful: 52,
  reply: {
    initial: "N",
    name: "Nadia",
    role: "Responsable de la Réussite Client, SwiftWay",
    text: "Sarah — cela compte beaucoup pour nous, merci. Nous avons conçu la livraison le jour même spécifiquement pour des entreprises comme la vôtre, alors c'est formidable d'apprendre que cela fonctionne comme prévu. À encore de nombreuses livraisons à l'heure !",
  },
};

const REVIEWS = [
  {
    initial: "M",
    name: "Marcus H.",
    location: "CLIENT VÉRIFIÉ · LONDRES",
    timeAgo: "il y a 1 mois",
    rating: 5,
    meta: "Compte personnel · 3 mois",
    quote: "Enfin, une application de livraison qui fonctionne vraiment.",
    body: "J'ai réservé un enlèvement en moins d'une minute et j'ai suivi son trajet en temps réel à travers la ville. Aucune surprise, aucun retard.",
  },
  {
    initial: "A",
    name: "Amina R.",
    location: "CLIENTE VÉRIFIÉE · NEW YORK",
    timeAgo: "il y a 3 mois",
    rating: 5,
    meta: "Prestataire mariage · 5 mois",
    quote:
      "Ils ont livré 40 commandes lors de notre plus grosse journée sans le moindre accroc.",
    body: "La saison des mariages est chaotique, mais SwiftWay a fait de notre logistique de livraison la seule chose dont je n'ai jamais eu à m'inquiéter.",
  },
];

export function Testimonials() {
  return (
    <section className="dark relative isolate overflow-hidden bg-background py-20 sm:py-24 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -z-10 h-72 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="flex flex-col gap-8 lg:col-span-4 lg:border-r lg:border-border lg:pr-10">
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-gold/40" />
              <span className="text-xs font-medium tracking-[0.2em] text-gold">
                AVIS CLIENTS
              </span>
            </div>

            <h2 className="font-heading text-balance text-4xl leading-tight font-semibold text-foreground sm:text-5xl">
              Des Milliers de Livraisons.
              <br />
              Un Seul <span className="text-gold italic">Point Commun.</span>
            </h2>

            <div className="flex flex-col gap-3">
              <div className="flex items-end gap-2">
                <span className="text-5xl font-semibold text-foreground">
                  4.9
                </span>
                <span className="pb-1 text-lg text-muted-foreground">/5</span>
              </div>
              <Stars count={5} />
              <p className="text-xs tracking-wide text-muted-foreground uppercase">
                Plus de 2 700 clients vérifiés · 97 % recommandent
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              {RATING_BREAKDOWN.map((row) => (
                <div
                  key={row.stars}
                  className="flex items-center gap-3 text-xs text-muted-foreground"
                >
                  <span className="w-8 shrink-0">{row.stars}★</span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gold"
                      style={{ width: `${(row.count / MAX_COUNT) * 100}%` }}
                    />
                  </div>
                  <span className="w-10 shrink-0 text-right">
                    {row.count}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="flex flex-col gap-6 lg:col-span-8">
            <Reveal className="rounded-2xl border border-border bg-card/40 p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gold/20 text-sm font-semibold text-gold">
                    {FEATURED_REVIEW.initial}
                  </span>
                  <div>
                    <p className="font-medium text-foreground">
                      {FEATURED_REVIEW.name}
                    </p>
                    <p className="text-xs tracking-wide text-muted-foreground">
                      {FEATURED_REVIEW.location}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {FEATURED_REVIEW.timeAgo}
                </span>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <Stars count={FEATURED_REVIEW.rating} />
                <p className="text-xs text-muted-foreground">
                  {FEATURED_REVIEW.meta}
                </p>
              </div>

              <p className="font-heading mt-4 text-xl font-semibold text-foreground">
                {FEATURED_REVIEW.quote}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {FEATURED_REVIEW.body}
              </p>

              <div className="mt-4">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-[11px] tracking-wide text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-gold" />
                  {FEATURED_REVIEW.tag}
                </span>
              </div>

              <div className="mt-5 flex items-center gap-1.5 border-t border-border pt-4 text-xs text-muted-foreground">
                <Heart className="size-3.5" />
                UTILE · {FEATURED_REVIEW.helpful}
              </div>

              <div className="mt-4 rounded-xl border-l-2 border-l-copper bg-background/40 p-5">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-copper/20 text-xs font-semibold text-copper">
                    {FEATURED_REVIEW.reply.initial}
                  </span>
                  <p className="text-sm">
                    <span className="font-medium text-foreground">
                      {FEATURED_REVIEW.reply.name}
                    </span>{" "}
                    <span className="text-xs text-muted-foreground">
                      {FEATURED_REVIEW.reply.role}
                    </span>
                  </p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground italic">
                  {FEATURED_REVIEW.reply.text}
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {REVIEWS.map((review, index) => (
                <Reveal
                  key={review.name}
                  delay={index * 0.1}
                  className="flex flex-col rounded-2xl border border-border bg-card/40 p-6 transition-colors hover:border-gold/40"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold/20 text-sm font-semibold text-gold">
                        {review.initial}
                      </span>
                      <div>
                        <p className="font-medium text-foreground">
                          {review.name}
                        </p>
                        <p className="text-xs tracking-wide text-muted-foreground">
                          {review.location}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {review.timeAgo}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-col gap-2">
                    <Stars count={review.rating} />
                    <p className="text-xs text-muted-foreground">
                      {review.meta}
                    </p>
                  </div>

                  <p className="font-heading mt-4 text-base font-semibold text-foreground">
                    {review.quote}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {review.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
