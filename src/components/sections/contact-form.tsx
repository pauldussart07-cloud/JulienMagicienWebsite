"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { cloneElement, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const schema = z.object({
  prenom: z.string().min(2, "Indiquez votre prénom."),
  nom: z.string().min(2, "Indiquez votre nom."),
  email: z.string().email("Cette adresse e-mail ne semble pas valide."),
  telephone: z.string().min(6, "Indiquez un numéro où vous joindre."),
  typeEvenement: z.string().min(1, "Choisissez un type d'événement."),
  prestation: z.string().min(1, "Choisissez une prestation."),
  personnes: z.string().min(1, "Indiquez un nombre d'invités, même approximatif."),
  ville: z.string().min(2, "Indiquez la ville de l'événement."),
  date: z.string().optional(),
  message: z.string().min(10, "Quelques mots sur votre événement suffisent."),
  // Champ piège, invisible pour les humains
  societe: z.string().max(0).optional(),
});

type Valeurs = z.infer<typeof schema>;

const TYPES = [
  "Mariage",
  "Soirée d'entreprise",
  "Séminaire ou convention",
  "Anniversaire",
  "Soirée privée",
  "Foire ou salon",
  "Autre",
];

const PRESTATIONS = [
  "Magie close-up",
  "Magie de salon",
  "Les deux",
  "Je ne sais pas encore",
];

/**
 * Lien de secours.
 *
 * Si l'envoi échoue, côté serveur ou réseau, la demande deja saisie ne doit
 * pas être perdue : ce lien ouvre la messagerie du visiteur avec l'objet et
 * le corps déjà remplis. Il n'a plus qu'à appuyer sur envoyer, et le message
 * arrive dans la même boîte que par la route normale.
 */
function lienDeSecours(v: Valeurs) {
  const corps = [
    `Prénom et nom : ${v.prenom} ${v.nom}`,
    `E-mail : ${v.email}`,
    `Téléphone : ${v.telephone}`,
    `Type d'événement : ${v.typeEvenement}`,
    `Prestation souhaitée : ${v.prestation}`,
    `Nombre d'invités : ${v.personnes}`,
    `Ville : ${v.ville}`,
    `Date envisagée : ${v.date || "non précisée"}`,
    "",
    v.message,
  ].join("\n");

  const objet = `Demande de devis : ${v.typeEvenement} à ${v.ville}`;
  return `mailto:${site.email}?subject=${encodeURIComponent(objet)}&body=${encodeURIComponent(corps)}`;
}

export function ContactForm() {
  const [etat, setEtat] = useState<"repos" | "envoi" | "ok" | "erreur">("repos");
  const [erreur, setErreur] = useState<string | null>(null);
  const [secours, setSecours] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Valeurs>({ resolver: zodResolver(schema) });

  const onSubmit = async (valeurs: Valeurs) => {
    setEtat("envoi");
    setErreur(null);
    setSecours(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(valeurs),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message ?? "L'envoi n'a pas abouti.");
      }

      setEtat("ok");
      reset();
    } catch (e) {
      setEtat("erreur");
      setSecours(lienDeSecours(valeurs));
      setErreur(
        e instanceof Error
          ? e.message
          : "L'envoi n'a pas abouti. Réessayez, ou écrivez directement à Julien."
      );
    }
  };

  if (etat === "ok") {
    return (
      <div className="border-t border-carton/20 pt-10">
        <p className="font-display text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] leading-tight text-carton">
          Message envoyé.
        </p>
        <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-carton/65">
          Julien consulte ses messages tous les jours et revient vers vous avec
          une proposition adaptée à votre événement.
        </p>
        <button
          type="button"
          onClick={() => setEtat("repos")}
          className="link-hover mt-8 text-[0.95rem] text-carton"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-10">
      <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
        <Champ
          label="Prénom"
          erreur={errors.prenom?.message}
          input={<input type="text" autoComplete="given-name" {...register("prenom")} />}
        />
        <Champ
          label="Nom"
          erreur={errors.nom?.message}
          input={<input type="text" autoComplete="family-name" {...register("nom")} />}
        />
        <Champ
          label="E-mail"
          erreur={errors.email?.message}
          input={<input type="email" autoComplete="email" {...register("email")} />}
        />
        <Champ
          label="Téléphone"
          erreur={errors.telephone?.message}
          input={<input type="tel" autoComplete="tel" {...register("telephone")} />}
        />

        <Champ
          label="Type d'événement"
          erreur={errors.typeEvenement?.message}
          input={
            <select defaultValue="" {...register("typeEvenement")}>
              <option value="" disabled>
                Choisir
              </option>
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          }
        />
        <Champ
          label="Prestation souhaitée"
          erreur={errors.prestation?.message}
          input={
            <select defaultValue="" {...register("prestation")}>
              <option value="" disabled>
                Choisir
              </option>
              {PRESTATIONS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          }
        />

        <Champ
          label="Nombre d'invités"
          erreur={errors.personnes?.message}
          input={<input type="text" inputMode="numeric" {...register("personnes")} />}
        />
        <Champ
          label="Ville de l'événement"
          erreur={errors.ville?.message}
          input={<input type="text" {...register("ville")} />}
        />
        <Champ
          label="Date envisagée"
          indice="Si elle n'est pas encore fixée, laissez vide."
          erreur={errors.date?.message}
          input={<input type="date" {...register("date")} />}
        />
      </div>

      <Champ
        label="Votre événement en quelques mots"
        erreur={errors.message?.message}
        input={<textarea rows={5} {...register("message")} />}
      />

      {/* Piège à robots : masqué visuellement et pour les lecteurs d'écran */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label>
          Société
          <input type="text" tabIndex={-1} autoComplete="off" {...register("societe")} />
        </label>
      </div>

      <div className="flex flex-col gap-5 border-t border-carton/12 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-[0.8125rem] leading-relaxed text-carton/45">
          Vos informations servent uniquement à préparer votre devis. Elles ne
          sont ni revendues ni utilisées à d&apos;autres fins.
        </p>
        <Button type="submit" size="lg" disabled={etat === "envoi"}>
          {etat === "envoi" ? "Envoi en cours…" : "Obtenir mon devis"}
        </Button>
      </div>

      {etat === "erreur" && erreur && (
        <div role="alert" className="space-y-4">
          <p className="text-[0.9rem] text-[#E06A7E]">{erreur}</p>
          {secours && (
            <p className="text-[0.9rem] text-carton/70">
              Rien n&apos;est perdu :{" "}
              <a href={secours} className="link text-carton">
                ouvrir ce message dans votre messagerie
              </a>
              . Tout ce que vous avez saisi y est déjà.
            </p>
          )}
        </div>
      )}
    </form>
  );
}

/**
 * Champ à filet : pas de boîte, juste un trait sous la saisie.
 * Le trait passe au laiton quand le champ est actif.
 */
function Champ({
  label,
  input,
  erreur,
  indice,
}: {
  label: string;
  input: React.ReactElement<{ id?: string; className?: string }>;
  erreur?: string;
  indice?: string;
}) {
  const id = useId();

  const classe = cn(
    "w-full border-0 border-b bg-transparent px-0 pb-2.5 pt-1 text-[1rem] text-carton",
    "appearance-none focus:outline-none focus:ring-0",
    // Les options natives du select s'affichent sur le fond du système :
    // on force une couleur lisible.
    "[&>option]:bg-encre-800 [&>option]:text-carton",
    "[&::-webkit-calendar-picker-indicator]:opacity-40 [&::-webkit-calendar-picker-indicator]:invert",
    erreur
      ? "border-[#E06A7E]"
      : "border-carton/20 transition-colors focus:border-laiton"
  );

  return (
    <div>
      <label htmlFor={id} className="block text-[0.8125rem] text-carton/50">
        {label}
      </label>
      {cloneElement(input, { id, className: classe })}
      {indice && !erreur && (
        <p className="mt-2 text-[0.75rem] text-carton/35">{indice}</p>
      )}
      {erreur && (
        <p className="mt-2 text-[0.75rem] text-[#E06A7E]" role="alert">
          {erreur}
        </p>
      )}
    </div>
  );
}
