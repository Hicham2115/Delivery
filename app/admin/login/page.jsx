"use client";

import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { ArrowRight, Box, Hexagon, Loader2, Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/use-login";
import { useLogout } from "@/hooks/use-logout";

const emailSchema = z.string().email("Adresse email invalide");
const passwordSchema = z.string().min(1, "Mot de passe requis");

const ADMIN_ROLES = ["ADMIN", "SUPER_ADMIN"];

function fieldErrorMessage(errors) {
  const [first] = errors;
  if (!first) return null;
  if (typeof first === "string") return first;
  if (typeof first === "object" && first !== null && "message" in first) {
    return String(first.message);
  }
  return null;
}

export default function AdminLoginPage() {
  const router = useRouter();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  const form = useForm({
    defaultValues: { email: "", password: "" },
    onSubmit: async ({ value }) => {
      try {
        const { user } = await loginMutation.mutateAsync(value);

        if (!ADMIN_ROLES.includes(user.role)) {
          await logoutMutation.mutateAsync();
          toast.error("Ce compte n'a pas accès au tableau de bord admin.");
          return;
        }

        toast.success(`Bienvenue, ${user.name} !`);
        router.push("/admin");
      } catch {
        // error toast already surfaced by useLogin's onError
      }
    },
  });

  return (
    <div className="dark flex min-h-svh flex-col items-center justify-center gap-8 bg-background px-4 text-foreground">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="relative flex size-10 shrink-0 items-center justify-center">
          <Hexagon className="size-10 text-gold" strokeWidth={1.5} />
          <Box className="absolute size-4.5 text-gold" strokeWidth={2} />
        </span>
        <span className="text-sm font-semibold">SwiftWay</span>
        <span className="text-[9px] font-medium tracking-[0.2em] text-gold">
          ESPACE ADMIN
        </span>
      </div>

      <form
        className="flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-white/15 bg-black/40 p-6 backdrop-blur-2xl"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <h1 className="text-center font-heading text-lg font-semibold">
          Connexion admin
        </h1>

        <form.Field name="email" validators={{ onSubmit: emailSchema }}>
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={field.name}>Email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="admin@swiftway.com"
                  autoComplete="email"
                  className="h-11 rounded-lg border-white/15 bg-white/5 pl-9 focus-visible:border-white/40 focus-visible:ring-white/15"
                />
              </div>
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
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={field.name}>Mot de passe</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="h-11 rounded-lg border-white/15 bg-white/5 pl-9 focus-visible:border-white/40 focus-visible:ring-white/15"
                />
              </div>
              {field.state.meta.errors.length > 0 && (
                <p className="text-xs text-destructive">
                  {fieldErrorMessage(field.state.meta.errors)}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="mt-1 h-11 gap-2 rounded-lg border border-gold/40 bg-gold/15 text-base font-semibold text-gold hover:bg-gold/25"
            >
              {isSubmitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <>
                  Se connecter
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}
