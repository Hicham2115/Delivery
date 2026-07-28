"use client";

import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import {
  ArrowRight,
  Box,
  Check,
  Hexagon,
  Landmark,
  Loader2,
  Lock,
  Mail,
  Phone,
  Sparkles,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/use-login";
import { useRegister } from "@/hooks/use-register";

const nameSchema = z
  .string()
  .min(2, "Le prénom doit contenir au moins 2 caractères");
const lastNameSchema = z
  .string()
  .min(2, "Le nom doit contenir au moins 2 caractères");
const emailSchema = z.string().email("Adresse email invalide");
const passwordSchema = z.string().min(8, "8 caractères minimum");
const phoneSchema = z
  .string()
  .min(1, "Numéro de téléphone requis")
  .refine((value) => /^[+]?[\d\s()-]{8,20}$/.test(value), {
    message: "Numéro de téléphone invalide",
  });
const ribSchema = z
  .string()
  .min(1, "RIB requis")
  .refine((value) => /^\d{24}$/.test(value.replace(/\s+/g, "")), {
    message: "RIB invalide (24 chiffres attendus)",
  });

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
        className="h-10 rounded-lg border-white/15 bg-white/5 pl-9 focus-visible:border-white/40 focus-visible:ring-white/15 sm:h-11"
      />
    </div>
  );
}

function SubmitButton({ canSubmit, isSubmitting, label }) {
  return (
    <Button
      type="submit"
      disabled={!canSubmit || isSubmitting}
      className="mt-1 h-11 gap-2 rounded-lg border border-gold/40 bg-gold/15 text-base font-semibold text-gold backdrop-blur-sm hover:bg-gold/25 sm:h-12"
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
  const registerMutation = useRegister();

  const form = useForm({
    defaultValues: { name: "", lastName: "", email: "", phone: "", rib: "", password: "" },
    onSubmit: async ({ value }) => {
      try {
        await registerMutation.mutateAsync(value);
        onSuccess(value.name);
      } catch {
        // error toast already surfaced by useRegister's onError
      }
    },
  });

  return (
    <form
      className="flex flex-col gap-3 sm:gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div className="grid grid-cols-2 gap-4">
        <form.Field name="name" validators={{ onSubmit: nameSchema }}>
          {(field) => (
            <div className="flex flex-col gap-1 sm:gap-1.5">
              <Label htmlFor={field.name} className="text-foreground">
                Prénom
              </Label>
              <FieldInput
                icon={User}
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Jean"
                autoComplete="given-name"
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-xs text-destructive">
                  {fieldErrorMessage(field.state.meta.errors)}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="lastName" validators={{ onSubmit: lastNameSchema }}>
          {(field) => (
            <div className="flex flex-col gap-1 sm:gap-1.5">
              <Label htmlFor={field.name} className="text-foreground">
                Nom
              </Label>
              <FieldInput
                icon={User}
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Dupont"
                autoComplete="family-name"
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-xs text-destructive">
                  {fieldErrorMessage(field.state.meta.errors)}
                </p>
              )}
            </div>
          )}
        </form.Field>
      </div>

      <form.Field name="phone" validators={{ onSubmit: phoneSchema }}>
        {(field) => (
          <div className="flex flex-col gap-1 sm:gap-1.5">
            <Label htmlFor={field.name} className="text-foreground">
              Téléphone
            </Label>
            <FieldInput
              icon={Phone}
              id={field.name}
              name={field.name}
              type="tel"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="+212 6 00 00 00 00"
              autoComplete="tel"
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-xs text-destructive">
                {fieldErrorMessage(field.state.meta.errors)}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="email" validators={{ onSubmit: emailSchema }}>
        {(field) => (
          <div className="flex flex-col gap-1 sm:gap-1.5">
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

      <form.Field name="rib" validators={{ onSubmit: ribSchema }}>
        {(field) => (
          <div className="flex flex-col gap-1 sm:gap-1.5">
            <Label htmlFor={field.name} className="text-foreground">
              RIB
            </Label>
            <FieldInput
              icon={Landmark}
              id={field.name}
              name={field.name}
              inputMode="numeric"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="24 chiffres, ex: 007780000123456789001234"
              autoComplete="off"
            />
            <p className="text-xs text-muted-foreground">
              Nécessaire pour vos versements de livraison.
            </p>
            {field.state.meta.errors.length > 0 && (
              <p className="text-xs text-destructive">
                {fieldErrorMessage(field.state.meta.errors)}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="password" validators={{ onSubmit: passwordSchema }}>
        {(field) => (
          <div className="flex flex-col gap-1 sm:gap-1.5">
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

      <div className="hidden items-center justify-center gap-x-4 gap-y-1.5 pt-1 sm:flex sm:flex-wrap">
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
  const loginMutation = useLogin();

  const form = useForm({
    defaultValues: { email: "", password: "" },
    onSubmit: async ({ value }) => {
      try {
        const { user } = await loginMutation.mutateAsync(value);
        onSuccess(user);
      } catch {
        // error toast already surfaced by useLogin's onError
      }
    },
  });

  return (
    <form
      className="flex flex-col gap-3 sm:gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.Field name="email" validators={{ onSubmit: emailSchema }}>
        {(field) => (
          <div className="flex flex-col gap-1 sm:gap-1.5">
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

      <form.Field name="password" validators={{ onSubmit: passwordSchema }}>
        {(field) => (
          <div className="flex flex-col gap-1 sm:gap-1.5">
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
  const router = useRouter();
  const copy = COPY[mode];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="dark flex max-h-[calc(100dvh-1.5rem)] w-full max-w-md flex-col gap-0 overflow-x-hidden overflow-y-auto rounded-2xl border border-white/15 bg-black/70 p-0 text-popover-foreground shadow-2xl shadow-black/50 ring-1 ring-white/10 backdrop-blur-2xl sm:max-h-[calc(100dvh-2rem)] sm:max-w-lg"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-56 w-100 -translate-x-1/2 rounded-full bg-white/10 blur-3xl"
        />

        <div className="flex flex-col items-center gap-2 border-b border-white/10 px-6 pt-5 pb-4 text-center sm:gap-3 sm:px-8 sm:pt-9 sm:pb-6">
          <span className="relative flex size-8 shrink-0 items-center justify-center sm:size-10">
            <Hexagon className="size-8 text-gold sm:size-10" strokeWidth={1.5} />
            <Box className="absolute size-3.5 text-gold sm:size-4.5" strokeWidth={2} />
          </span>

          {/* <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
            <Sparkles className="size-3.5" />
            {copy.badge}
          </div> */}

          <DialogTitle className="font-heading text-lg font-semibold text-foreground sm:text-2xl">
            {copy.title}
          </DialogTitle>
        </div>

        <div className="flex flex-col gap-3 px-6 pt-4 pb-5 sm:gap-4 sm:px-8 sm:pt-6 sm:pb-8">
          {mode === "signup" ? (
            <SignupForm
              onSuccess={(name) => {
                toast.success(`Bienvenue, ${name} ! Votre compte a été créé.`);
                onOpenChange(false);
                router.push("/dashboard");
              }}
            />
          ) : (
            <LoginForm
              onSuccess={(user) => {
                toast.success(`Content de vous revoir, ${user.email} !`);
                onOpenChange(false);
                const isAdmin = user.role === "ADMIN" || user.role === "SUPER_ADMIN";
                router.push(isAdmin ? "/admin" : "/dashboard");
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
