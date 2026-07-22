"use client";

import { useState } from "react";
import { MailCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

export function NewsletterForm() {
  const [subscribed, setSubscribed] = useState(false);

  if (subscribed) {
    return (
      <p className="flex items-center gap-2 text-sm text-copper">
        <MailCheck className="size-4" />
        Merci ! Nous vous contacterons bientôt.
      </p>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSubscribed(true);
      }}
      className="flex flex-col gap-2 sm:flex-row"
    >
      <input
        type="email"
        required
        placeholder="Entrez votre e-mail"
        aria-label="Adresse e-mail"
        className="h-10 w-full rounded-lg border border-border bg-background/60 px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:ring-3 focus:ring-gold/20 focus:outline-none sm:w-auto sm:flex-1"
      />
      <Button
        type="submit"
        className="h-10 shrink-0 rounded-lg bg-gold text-gold-foreground hover:bg-gold/85"
      >
        S&apos;abonner
      </Button>
    </form>
  );
}
