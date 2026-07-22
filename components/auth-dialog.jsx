"use client";

import { useForm } from "@tanstack/react-form";
import {
  ArrowRight,
  Box,
  Check,
  Hexagon,
  Loader2,
  Lock,
  Mail,
  Sparkles,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const nameSchema = z
  .string()
  .min(2, "Le nom doit contenir au moins 2 caractères");
const emailSchema = z.string().email("Adresse email invalide");
const passwordSchema = z.string().min(8, "8 caractères minimum");

const TRUST_ITEMS = [
  "Aucune carte bancaire requise",
  "Configuration en 2 minutes",
];

function fieldErrorMessage(errors) {
  const [first] = errors;
  if (!first) return null;
  if (typeof first === "string") return first;
  if (typeof first === "object" && first !== null && "message" in first) {
    return String(first.message);
  }
  return null;
}

function FieldInput({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        {...props}
        className="h-11 rounded-lg border-border bg-background/60 pl-9 focus-visible:border-gold/50 focus-visible:ring-gold/20"
      />
    </div>
  );
}

function SubmitButton({ canSubmit, isSubmitting, label }) {
  return (
    <Button
      type="submit"
      disabled={!canSubmit || isSubmitting}
      className="mt-1 h-12 gap-2 rounded-lg bg-gold text-base font-semibold text-gold-foreground hover:bg-gold/85"
    >
      {isSubmitting ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <>
          {label}
          <ArrowRight className="size-4" />
        </>
      )}
    </Button>
  );
}

function SignupForm({ onSuccess }) {
  const form = useForm({
    defaultValues: { name: "", email: "", password: "" },
    onSubmit: async ({ value }) => {
      onSuccess(value.name);
    },
  });

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.Field name="name" validators={{ onChange: nameSchema }}>
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={field.name} className="text-foreground">
              Nom complet
            </Label>
            <FieldInput
              icon={User}
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Jean Dupont"
              autoComplete="name"
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-xs text-destructive">
                {fieldErrorMessage(field.state.meta.errors)}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="email" validators={{ onChange: emailSchema }}>
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={field.name} className="text-foreground">
              Email
            </Label>
            <FieldInput
              icon={Mail}
              id={field.name}
              name={field.name}
              type="email"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="vous@exemple.com"
              autoComplete="email"
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-xs text-destructive">
                {fieldErrorMessage(field.state.meta.errors)}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="password" validators={{ onChange: passwordSchema }}>
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={field.name} className="text-foreground">
              Mot de passe
            </Label>
            <FieldInput
              icon={Lock}
              id={field.name}
              name={field.name}
              type="password"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-xs text-destructive">
                {fieldErrorMessage(field.state.meta.errors)}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <SubmitButton
            canSubmit={canSubmit}
            isSubmitting={isSubmitting}
            label="Créer mon compte"
          />
        )}
      </form.Subscribe>

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 pt-1">
        {TRUST_ITEMS.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"
          >
            <Check className="size-3 text-gold" />
            {item}
          </span>
        ))}
      </div>
    </form>
  );
}

function LoginForm({ onSuccess }) {
  const form = useForm({
    defaultValues: { email: "", password: "" },
    onSubmit: async ({ value }) => {
      onSuccess(value.email);
    },
  });

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.Field name="email" validators={{ onChange: emailSchema }}>
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={field.name} className="text-foreground">
              Email
            </Label>
            <FieldInput
              icon={Mail}
              id={field.name}
              name={field.name}
              type="email"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="vous@exemple.com"
              autoComplete="email"
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-xs text-destructive">
                {fieldErrorMessage(field.state.meta.errors)}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="password" validators={{ onChange: passwordSchema }}>
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={field.name} className="text-foreground">
              Mot de passe
            </Label>
            <FieldInput
              icon={Lock}
              id={field.name}
              name={field.name}
              type="password"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-xs text-destructive">
                {fieldErrorMessage(field.state.meta.errors)}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <SubmitButton
            canSubmit={canSubmit}
            isSubmitting={isSubmitting}
            label="Se connecter"
          />
        )}
      </form.Subscribe>
    </form>
  );
}

const COPY = {
  signup: {
    badge: "Rejoignez SwiftWay",
    title: "Créer un Compte",
    description: "Créez, suivez et gérez vos livraisons en toute confiance.",
  },
  login: {
    badge: "Content de vous revoir",
    title: "Connexion",
    description: "Accédez à votre espace pour suivre vos livraisons.",
  },
};

export function AuthDialog({ open, onOpenChange, mode, onModeChange }) {
  const copy = COPY[mode];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="dark w-full max-w-md gap-0 overflow-hidden rounded-2xl border border-gold/20 border-l-2 border-l-gold bg-popover p-0 text-popover-foreground shadow-2xl shadow-black/50 ring-1 ring-white/5 sm:max-w-lg"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-56 w-100 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl"
        />

        <div className="flex flex-col items-center gap-3 border-b border-border px-8 pt-9 pb-6 text-center">
          <span className="relative flex size-10 shrink-0 items-center justify-center">
            <Hexagon className="size-10 text-gold" strokeWidth={1.5} />
            <Box className="absolute size-4.5 text-gold" strokeWidth={2} />
          </span>

          {/* <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
            <Sparkles className="size-3.5" />
            {copy.badge}
          </div> */}

          <DialogTitle className="font-heading text-2xl font-semibold text-foreground">
            {copy.title}
          </DialogTitle>
          <p className="max-w-[26ch] text-sm leading-relaxed text-muted-foreground">
            {copy.description}
          </p>
        </div>

        <div className="flex flex-col gap-4 px-8 pt-6 pb-8">
          {mode === "signup" ? (
            <SignupForm
              onSuccess={(name) => {
                toast.success(`Bienvenue, ${name} ! Votre compte a été créé.`);
                onOpenChange(false);
              }}
            />
          ) : (
            <LoginForm
              onSuccess={(email) => {
                toast.success(`Content de vous revoir, ${email} !`);
                onOpenChange(false);
              }}
            />
          )}

          <p className="text-center text-sm text-muted-foreground">
            {mode === "signup" ? (
              <>
                Vous avez déjà un compte ?{" "}
                <button
                  type="button"
                  onClick={() => onModeChange("login")}
                  className="cursor-pointer font-semibold text-gold hover:underline"
                >
                  Se connecter
                </button>
              </>
            ) : (
              <>
                Pas encore de compte ?{" "}
                <button
                  type="button"
                  onClick={() => onModeChange("signup")}
                  className="cursor-pointer font-semibold text-gold hover:underline"
                >
                  Créer un compte
                </button>
              </>
            )}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
