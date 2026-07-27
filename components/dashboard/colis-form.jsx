"use client";

import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

import { CityCombobox } from "@/components/dashboard/city-combobox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateColis } from "@/hooks/use-create-colis";
import { useUpdateColis } from "@/hooks/use-update-colis";

const destinataireSchema = z.string().min(2, "Destinataire requis");
const telephoneSchema = z
  .string()
  .regex(/^[+]?[\d\s()-]{8,20}$/, "Téléphone invalide");
const villeSchema = z.string().min(1, "Ville requise");
const adresseSchema = z.string().min(3, "Adresse requise");
const prixSchema = z
  .string()
  .min(1, "Prix requis")
  .refine((value) => !Number.isNaN(Number(value)) && Number(value) > 0, {
    message: "Prix invalide",
  });
const quantiteSchema = z
  .string()
  .refine((value) => value === "" || /^\d+$/.test(value), {
    message: "Quantité invalide",
  });

function fieldErrorMessage(errors) {
  const [first] = errors;
  if (!first) return null;
  if (typeof first === "string") return first;
  if (typeof first === "object" && first !== null && "message" in first) {
    return String(first.message);
  }
  return null;
}

export function ColisForm({ colis, onSuccess }) {
  const router = useRouter();
  const createColis = useCreateColis();
  const updateColis = useUpdateColis();
  const isEditing = Boolean(colis);

  const form = useForm({
    defaultValues: {
      destinataire: colis?.destinataire ?? "",
      telephone: colis?.telephone ?? "",
      ville: colis?.ville ?? "",
      adresse: colis?.adresse ?? "",
      quantite: colis?.quantite != null ? String(colis.quantite) : "",
      commentaire: colis?.commentaire ?? "",
      prix: colis?.prix != null ? String(colis.prix) : "",
      interditOuverture: colis?.interditOuverture ?? false,
      colisARemplacer: colis?.colisARemplacer ?? false,
    },
    onSubmit: async ({ value, formApi }) => {
      try {
        if (isEditing) {
          await updateColis.mutateAsync({ id: colis.id, data: value });
          toast.success("Colis modifié avec succès.");
          onSuccess?.();
        } else {
          await createColis.mutateAsync(value);
          toast.success("Colis créé avec succès.");
          formApi.reset();
          if (onSuccess) {
            onSuccess();
          } else {
            router.push("/dashboard/colis");
          }
        }
      } catch {
        // error toast already surfaced by the mutation's onError
      }
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
      <Card className="border-none bg-card/60 ring-1 ring-white/10">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Client And Destination
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <form.Field
            name="destinataire"
            validators={{ onSubmit: destinataireSchema }}
          >
            {(field) => (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={field.name}>Destinataire *</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Destinataire *"
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
            name="telephone"
            validators={{ onSubmit: telephoneSchema }}
          >
            {(field) => (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={field.name}>Téléphone *</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="tel"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Téléphone *"
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

          <form.Field name="ville" validators={{ onSubmit: villeSchema }}>
            {(field) => (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={field.name}>Ville *</Label>
                <CityCombobox
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(value) => field.handleChange(value)}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-xs text-destructive">
                    {fieldErrorMessage(field.state.meta.errors)}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="adresse" validators={{ onSubmit: adresseSchema }}>
            {(field) => (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={field.name}>Adresse *</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Adresse *"
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
        </CardContent>
      </Card>

      <Card className="border-none bg-card/60 ring-1 ring-white/10">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Détails du colis
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <form.Field name="quantite" validators={{ onSubmit: quantiteSchema }}>
            {(field) => (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={field.name}>Quantité</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Quantité"
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

          <form.Field name="commentaire">
            {(field) => (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={field.name}>
                  Commentaire{" "}
                  <span className="text-muted-foreground">
                    (Autre téléphone, Date de livraison ...)
                  </span>
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Commentaire"
                  className="h-11 rounded-lg border-white/15 bg-white/5"
                />
              </div>
            )}
          </form.Field>

          <form.Field name="prix" validators={{ onSubmit: prixSchema }}>
            {(field) => (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={field.name}>Prix *</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Prix *"
                  className="h-11 rounded-lg border-white/15 bg-white/5"
                />
                <p className="text-xs text-muted-foreground">
                  Hors frais de livraison. Ces frais seront prélevés à la
                  livraison du colis.
                </p>
                {field.state.meta.errors.length > 0 && (
                  <p className="text-xs text-destructive">
                    {fieldErrorMessage(field.state.meta.errors)}
                  </p>
                )}
              </div>
            )}
          </form.Field>
        </CardContent>
      </Card>

      <Card className="border-none bg-card/60 ring-1 ring-white/10">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Options</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-6">
          <form.Field name="interditOuverture">
            {(field) => (
              <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                <Checkbox
                  checked={field.state.value}
                  onCheckedChange={(checked) => field.handleChange(!!checked)}
                />
                Interdit ouverture colis
              </label>
            )}
          </form.Field>

          <form.Field name="colisARemplacer">
            {(field) => (
              <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                <Checkbox
                  checked={field.state.value}
                  onCheckedChange={(checked) => field.handleChange(!!checked)}
                />
                Colis à remplacer
              </label>
            )}
          </form.Field>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          className="py-5"
          onClick={() => form.reset()}
        >
          Reset
        </Button>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="bg-gold font-semibold text-gold-foreground hover:bg-gold/85 py-5 "
            >
              {isSubmitting
                ? "Enregistrement..."
                : isEditing
                  ? "Enregistrer les modifications"
                  : "Enregistrer"}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
}
