"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChangePassword } from "@/hooks/use-change-password";
import { useUpdateProfile } from "@/hooks/use-update-profile";

const nameSchema = z.string().min(2, "2 caractères minimum");
const phoneSchema = z
  .string()
  .refine((value) => value === "" || /^[+]?[\d\s()-]{8,20}$/.test(value), {
    message: "Téléphone invalide",
  });
const ribSchema = z
  .string()
  .refine((value) => value === "" || /^\d{24}$/.test(value.replace(/\s+/g, "")), {
    message: "RIB invalide (24 chiffres attendus)",
  });
const currentPasswordSchema = z.string().min(1, "Mot de passe actuel requis");
const newPasswordSchema = z.string().min(8, "8 caractères minimum");

function fieldErrorMessage(errors) {
  const [first] = errors;
  if (!first) return null;
  if (typeof first === "string") return first;
  if (typeof first === "object" && first !== null && "message" in first) {
    return String(first.message);
  }
  return null;
}

function ProfileForm({ user }) {
  const updateProfile = useUpdateProfile();

  const form = useForm({
    defaultValues: {
      name: user.name ?? "",
      lastName: user.lastName ?? "",
      phone: user.phone ?? "",
      rib: user.rib ?? "",
    },
    onSubmit: async ({ value }) => {
      try {
        await updateProfile.mutateAsync(value);
        toast.success("Profil mis à jour avec succès.");
      } catch {
        // error toast already surfaced by the mutation's onError
      }
    },
  });

  return (
    <Card className="border-none bg-card/60 ring-1 ring-white/10">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Profil</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <form.Field name="name" validators={{ onSubmit: nameSchema }}>
              {(field) => (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor={field.name}>Prénom</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="h-11 rounded-lg border-white/15 bg-white/5"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-xs text-destructive">
                      {fieldErrorMessage(field.state.meta.errors)}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name="lastName" validators={{ onSubmit: nameSchema }}>
              {(field) => (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor={field.name}>Nom</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="h-11 rounded-lg border-white/15 bg-white/5"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-xs text-destructive">
                      {fieldErrorMessage(field.state.meta.errors)}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={user.email ?? ""}
                disabled
                className="h-11 rounded-lg border-white/15 bg-white/5 text-muted-foreground"
              />
            </div>

            <form.Field name="phone" validators={{ onSubmit: phoneSchema }}>
              {(field) => (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor={field.name}>Téléphone</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="tel"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="h-11 rounded-lg border-white/15 bg-white/5"
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
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <Label htmlFor={field.name}>RIB</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    inputMode="numeric"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="24 chiffres"
                    className="h-11 rounded-lg border-white/15 bg-white/5"
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
          </div>

          <div className="flex justify-end">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  className="bg-gold font-semibold text-gold-foreground hover:bg-gold/85 py-5"
                >
                  {isSubmitting ? "Enregistrement..." : "Enregistrer"}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function PasswordForm() {
  const changePassword = useChangePassword();

  const form = useForm({
    defaultValues: { currentPassword: "", newPassword: "" },
    onSubmit: async ({ value, formApi }) => {
      try {
        await changePassword.mutateAsync(value);
        toast.success("Mot de passe mis à jour avec succès.");
        formApi.reset();
      } catch {
        // error toast already surfaced by the mutation's onError
      }
    },
  });

  return (
    <Card className="border-none bg-card/60 ring-1 ring-white/10">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Mot de passe</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <form.Field
              name="currentPassword"
              validators={{ onSubmit: currentPasswordSchema }}
            >
              {(field) => (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor={field.name}>Mot de passe actuel</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    autoComplete="current-password"
                    className="h-11 rounded-lg border-white/15 bg-white/5"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-xs text-destructive">
                      {fieldErrorMessage(field.state.meta.errors)}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field
              name="newPassword"
              validators={{ onSubmit: newPasswordSchema }}
            >
              {(field) => (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor={field.name}>Nouveau mot de passe</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    autoComplete="new-password"
                    className="h-11 rounded-lg border-white/15 bg-white/5"
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

          <div className="flex justify-end">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  variant="outline"
                  className="border-white/15 bg-white/5 text-foreground hover:bg-white/10 py-5"
                >
                  {isSubmitting ? "Mise à jour..." : "Mettre à jour"}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export function SettingsForm({ user }) {
  return (
    <div className="flex flex-col gap-6">
      <ProfileForm user={user} />
      <PasswordForm />
    </div>
  );
}
