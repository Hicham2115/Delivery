"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Hexagon, Menu, User, X } from "lucide-react";

import { AuthDialog } from "@/components/auth-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Comment ça marche", href: "#how-it-works" },
  { label: "Services", href: "#services" },
  { label: "Tarifs", href: "#pricing" },
  { label: "À propos", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signup");

  const openAuth = (mode) => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="dark fixed top-0 z-50 w-full px-4 pt-4">
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-4 py-3 ring-1 ring-white/5 backdrop-blur-xl transition-all duration-300 sm:px-6",
          scrolled
            ? "border-border bg-background/80 shadow-xl shadow-black/30"
            : "border-white/10 bg-background/40 shadow-lg shadow-black/20",
        )}
      >
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

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === pathname;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-1 font-semibold text-sm text-white transition-colors hover:text-foreground",
                  isActive && "text-gold hover:text-gold",
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 h-px w-full bg-gold" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="hidden md:inline-flex py-5 font-semibold text-white"
            onClick={() => openAuth("login")}
          >
            Connexion
          </Button>
          <Button
            className="hidden bg-gold font-semibold text-gold-foreground hover:bg-gold/85 md:inline-flex py-5"
            onClick={() => openAuth("signup")}
          >
            <User />
            Créer un Compte
          </Button>

          <button
            type="button"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="flex size-9 cursor-pointer items-center justify-center rounded-lg text-foreground md:hidden"
          >
            {mobileOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mx-auto mt-2 flex max-w-7xl flex-col gap-1 rounded-2xl border border-white/10 bg-background/95 p-4 shadow-xl shadow-black/30 ring-1 ring-white/5 backdrop-blur-xl md:hidden">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === pathname;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  isActive && "text-gold",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
            <Button
              variant="outline"
              className="w-full text-foreground"
              onClick={() => {
                setMobileOpen(false);
                openAuth("login");
              }}
            >
              Connexion
            </Button>
            <Button
              className="w-full bg-gold text-gold-foreground hover:bg-gold/85"
              onClick={() => {
                setMobileOpen(false);
                openAuth("signup");
              }}
            >
              <User />
              Créer un Compte
            </Button>
          </div>
        </div>
      )}

      <AuthDialog
        open={authOpen}
        onOpenChange={setAuthOpen}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </header>
  );
}
