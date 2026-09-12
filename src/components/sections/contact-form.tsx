"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { cloneElement, useId, useRef, useState } from "react";
import { useForm, type UseFormRegister } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Demande de devis.
 *
 * Le formulaire posait dix champs à la suite, sans respiration, dont neuf
 * obligatoires : il fallait connaître sa ville, son nombre d'invités et sa
 * date avant d'avoir le droit de poser une question. Les erreurs
 * n'arrivaient qu'au moment d'envoyer, toutes ensemble.
 *
 * Trois principes ont guidé la reprise.
 *
 * On ne demande que ce qui sert à chiffrer. Le reste est marqué facultatif
 * et le dit : personne ne doit renoncer parce qu'il n'a pas encore arrêté sa
 * date. Le nombre d'invités passe en tranches, parce qu'à ce stade personne
 * ne le connaît à l'unité et qu'une tranche suffit à établir un devis.
 *
 * On découpe. Trois blocs numérotés, l'événement puis les coordonnées puis
 * le projet : la même longueur paraît trois fois plus courte, et l'on
 * commence par parler de sa fête plutôt que de se présenter.
 *
 * On corrige au fil de l'eau. La vérification se déclenche en quittant un
 * champ, plus à l'envoi. Et si l'envoi échoue quand même, le premier champ
 * fautif reçoit le focus au lieu de laisser chercher.
 */

const schema = z.object({
  prenom: z.string().min(2, "Indiquez votre prénom."),
  nom: z.string().min(2, "Indiquez votre nom."),
  email: z.string().email("Cette adresse e-mail ne semble pas valide."),
  telephone: z.string().min(6, "Indiquez un numéro où vous joindre."),
  typeEvenement: z.string().min(1, "Choisissez un type d'événement."),
  prestation: z.string().min(1, "Choisissez une prestation."),
  personnes: z.string().min(1, "Choisissez une tranche, même approximative."),
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
 * Tranches plutôt qu'un nombre exact : à l'heure de la demande, presque
 * personne ne connaît son compte définitif, et une tranche suffit à chiffrer.
 */
const INVITES = [
  "Moins de 20",
  "20 à 50",
  "50 à 100",
  "100 à 200",
  "Plus de 200",
  "Je ne sais pas encore",
];

/**
 * Lien de secours.
 *
 * Si l'envoi échoue, côté serveur ou réseau, la demande déjà saisie ne doit
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
  const formulaire = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Valeurs>({
    resolver: zodResolver(schema),
    // La vérification se déclenche en quittant le champ, puis à chaque
    // frappe une fois l'erreur signalée : on corrige là où l'on est, au lieu
    // de découvrir dix reproches au moment d'envoyer.
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  /** Au premier champ fautif : on y amène le regard, puis le curseur. */
  const surErreur = () => {
    const premier = formulaire.current?.querySelector<HTMLElement>(
      '[aria-invalid="true"]'
    );
    premier?.scrollIntoView({ behavior: "smooth", block: "center" });
    premier?.focus({ preventScroll: true });
  };

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
        <p className="mark text-laiton">
          <span>Demande transmise</span>
        </p>

        <p className="mt-6 font-display text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] leading-tight text-carton">
          C&apos;est envoyé.
        </p>

        <ol className="mt-8 max-w-md space-y-4 text-[0.95rem] leading-relaxed text-carton/65">
          <li className="flex gap-4">
            <span className="mt-[0.15em] text-[0.75rem] text-laiton">01</span>
            Julien consulte ses messages tous les jours et vous répond
            directement, à l&apos;adresse que vous avez indiquée.
          </li>
          <li className="flex gap-4">
            <span className="mt-[0.15em] text-[0.75rem] text-laiton">02</span>
            Il rappelle si un point mérite d&apos;être calé de vive voix, puis
            vous envoie un devis ferme, déplacement compris.
          </li>
        </ol>

        <p className="mt-8 text-[0.875rem] text-carton/50">
          Besoin d&apos;une réponse tout de suite ?{" "}
          <a href={site.phoneHref} className="link text-carton">
            {site.phone}
          </a>
        </p>

        <button
          type="button"
          onClick={() => setEtat("repos")}
          className="link-hover mt-8 text-[0.95rem] text-carton"
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formulaire}
      onSubmit={handleSubmit(onSubmit, surErreur)}
      noValidate
      className="space-y-14"
    >
      <Bloc numero="01" titre="Votre événement">
        <div className="space-y-9">
          <Choix
            label="Type d'événement"
            nom="typeEvenement"
            options={TYPES}
            erreur={errors.typeEvenement?.message}
            register={register}
          />
          <Choix
            label="Prestation souhaitée"
            indice="Julien vous guidera si vous hésitez."
            nom="prestation"
            options={PRESTATIONS}
            erreur={errors.prestation?.message}
            register={register}
          />
          <Choix
            label="Nombre d'invités"
            indice="Une tranche suffit, même approximative."
            nom="personnes"
            options={INVITES}
            erreur={errors.personnes?.message}
            register={register}
          />

          <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
            <Champ
              label="Ville de l'événement"
              indice="Elle détermine le déplacement, inclus dans le devis."
              erreur={errors.ville?.message}
              input={<input type="text" autoComplete="address-level2" {...register("ville")} />}
            />
            <Champ
              label="Date envisagée"
              facultatif
              indice="Pas encore fixée ? Laissez vide, on en parlera."
              erreur={errors.date?.message}
              input={<input type="date" {...register("date")} />}
            />
          </div>
        </div>
      </Bloc>

      <Bloc numero="02" titre="Vous joindre">
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
            indice="C'est là que le devis arrivera."
            erreur={errors.email?.message}
            input={<input type="email" autoComplete="email" {...register("email")} />}
          />
          <Champ
            label="Téléphone"
            erreur={errors.telephone?.message}
            input={<input type="tel" autoComplete="tel" {...register("telephone")} />}
          />
        </div>
      </Bloc>

      <Bloc numero="03" titre="Votre projet">
        <Champ
          label="Votre événement en quelques mots"
          indice="Le lieu, le moment de la journée, l'ambiance : tout ce qui aide Julien à viser juste."
          erreur={errors.message?.message}
          input={<textarea rows={5} {...register("message")} />}
        />
      </Bloc>

      {/* Piège à robots : masqué visuellement et pour les lecteurs d'écran */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label>
          Société
          <input type="text" tabIndex={-1} autoComplete="off" {...register("societe")} />
        </label>
      </div>

      <div className="border-t border-carton/12 pt-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" size="lg" disabled={etat === "envoi"}>
            {etat === "envoi" ? "Envoi en cours…" : "Obtenir mon devis"}
          </Button>

          <p className="text-[0.875rem] leading-relaxed text-carton/55">
            Ou appelez directement :{" "}
            <a href={site.phoneHref} className="link text-carton">
              {site.phone}
            </a>
          </p>
        </div>

        <p className="mt-6 max-w-lg text-[0.8125rem] leading-relaxed text-carton/45">
          Devis gratuit et sans engagement. Vos informations servent uniquement
          à le préparer : elles ne sont ni revendues ni utilisées à d&apos;autres
          fins.
        </p>
      </div>

      {etat === "erreur" && erreur && (
        <div role="alert" className="space-y-4 border-l-2 border-[#E06A7E] pl-5">
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

/** Un des trois temps du formulaire, numéroté pour qu'on se situe. */
function Bloc({
  numero,
  titre,
  children,
}: {
  numero: string;
  titre: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="mb-8 flex items-baseline gap-4">
        <span className="text-[0.75rem] text-laiton">{numero}</span>
        <span className="font-display text-[1.375rem] text-carton">{titre}</span>
      </legend>
      {children}
    </fieldset>
  );
}

/**
 * Champ à filet : pas de boîte, juste un trait sous la saisie.
 * Le trait passe au laiton quand le champ est actif, au rouge s'il fâche.
 */
function Champ({
  label,
  input,
  erreur,
  indice,
  facultatif,
}: {
  label: string;
  input: React.ReactElement<{
    id?: string;
    className?: string;
    "aria-invalid"?: boolean;
    "aria-describedby"?: string;
  }>;
  erreur?: string;
  indice?: string;
  facultatif?: boolean;
}) {
  const id = useId();
  const aide = `${id}-aide`;

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
      <label
        htmlFor={id}
        className="flex items-baseline gap-2 text-[0.8125rem] text-carton/50"
      >
        {label}
        {facultatif && (
          <span className="text-[0.6875rem] text-carton/35">facultatif</span>
        )}
      </label>

      {cloneElement(input, {
        id,
        className: classe,
        "aria-invalid": erreur ? true : undefined,
        "aria-describedby": erreur || indice ? aide : undefined,
      })}

      {erreur ? (
        <p id={aide} className="mt-2 text-[0.75rem] text-[#E06A7E]" role="alert">
          {erreur}
        </p>
      ) : (
        indice && (
          <p id={aide} className="mt-2 text-[0.75rem] text-carton/35">
            {indice}
          </p>
        )
      )}
    </div>
  );
}

/**
 * Un choix parmi quelques-uns, en pastilles.
 *
 * Les listes déroulantes natives ouvraient un panneau dessiné par le système
 * d'exploitation : fond blanc, police du système, aucun rapport avec le
 * reste de la page, et impossible à habiller. Elles cachaient en plus les
 * options derrière un clic, alors qu'il n'y en a jamais plus de sept.
 *
 * Tout est donc montré. Ce sont de vrais boutons radio, simplement masqués
 * derrière leur étiquette : la navigation au clavier par les flèches, la
 * lecture par les lecteurs d'écran et l'envoi du formulaire restent ceux du
 * navigateur, sans une ligne de script.
 */
function Choix({
  label,
  indice,
  nom,
  options,
  erreur,
  register,
}: {
  label: string;
  indice?: string;
  nom: "typeEvenement" | "prestation" | "personnes";
  options: string[];
  erreur?: string;
  register: UseFormRegister<Valeurs>;
}) {
  const id = useId();
  const aide = `${id}-aide`;

  return (
    <fieldset
      aria-invalid={erreur ? true : undefined}
      aria-describedby={erreur || indice ? aide : undefined}
    >
      <legend className="text-[0.8125rem] text-carton/50">{label}</legend>

      <div className="mt-4 flex flex-wrap gap-x-2.5 gap-y-3">
        {options.map((option) => (
          <label
            key={option}
            className={cn(
              "group cursor-pointer select-none border px-4 py-2.5 text-[0.9rem] transition-colors",
              "border-carton/20 text-carton/70",
              "hover:border-carton/45 hover:text-carton",
              // L'état coché ne tient qu'au CSS : le filet passe au laiton,
              // le fond s'éclaire à peine, le texte devient plein.
              "has-[:checked]:border-laiton has-[:checked]:bg-laiton/10 has-[:checked]:text-carton",
              // Le liseré de focus doit rester visible au clavier.
              "has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-laiton",
              erreur && "border-[#E06A7E]/60"
            )}
          >
            <input
              type="radio"
              value={option}
              className="sr-only"
              {...register(nom)}
            />
            {option}
          </label>
        ))}
      </div>

      {erreur ? (
        <p id={aide} className="mt-3 text-[0.75rem] text-[#E06A7E]" role="alert">
          {erreur}
        </p>
      ) : (
        indice && (
          <p id={aide} className="mt-3 text-[0.75rem] text-carton/35">
            {indice}
          </p>
        )
      )}
    </fieldset>
  );
}
