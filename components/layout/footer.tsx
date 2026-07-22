import Link from "next/link";
import { Box, Hexagon } from "lucide-react";

import { NewsletterForm } from "@/components/layout/newsletter-form";

const COMPANY_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Comment ça marche", href: "#how-it-works" },
  { label: "À propos", href: "#about" },
  { label: "Carrières", href: "/careers" },
  { label: "Contact", href: "#contact" },
];

const SERVICE_LINKS = [
  { label: "Livraison le Jour Même", href: "#services" },
  { label: "Expédition Professionnelle", href: "#services" },
  { label: "Suivi de Commande", href: "/track" },
  { label: "Tarifs", href: "#pricing" },
];

const SUPPORT_LINKS = [
  { label: "Centre d'Aide", href: "/help" },
  { label: "FAQ", href: "/faq" },
  { label: "Conditions d'Utilisation", href: "/terms" },
  { label: "Politique de Confidentialité", href: "/privacy" },
];

const SOCIAL_LINKS = [
  { label: "Twitter", href: "https://twitter.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Instagram", href: "https://instagram.com" },
];

export function Footer() {
  return (
    <footer className="dark border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="flex flex-col gap-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <span className="relative flex size-9 shrink-0 items-center justify-center">
                <Hexagon className="size-9 text-gold" strokeWidth={1.5} />
                <Box className="absolute size-4 text-gold" strokeWidth={2} />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-heading text-lg font-semibold text-foreground">
                  SwiftWay
                </span>
                <span className="text-[10px] font-medium tracking-[0.2em] text-gold">
                  LIVRER LA CONFIANCE
                </span>
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Une plateforme premium de gestion de livraisons pour les
              particuliers et les entreprises — passez des commandes,
              suivez-les en temps réel et livrez en toute confiance.
            </p>
            <div className="flex items-center gap-4 pt-1">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-gold"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-foreground">Entreprise</p>
            {COMPANY_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-foreground">Services</p>
            {SERVICE_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-foreground">Support</p>
            {SUPPORT_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 rounded-2xl border border-border bg-card/40 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Restez informé
            </p>
            <p className="text-sm text-muted-foreground">
              Nouveautés produit et conseils de livraison, directement dans
              votre boîte mail.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-4 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} SwiftWay. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="transition-colors hover:text-foreground"
            >
              Politique de Confidentialité
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-foreground"
            >
              Conditions d&apos;Utilisation
            </Link>
            <Link
              href="/cookies"
              className="transition-colors hover:text-foreground"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
