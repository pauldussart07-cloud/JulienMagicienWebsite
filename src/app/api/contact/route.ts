import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

import { site } from "@/content/site";

export const runtime = "nodejs";

const schema = z.object({
  prenom: z.string().min(2).max(80),
  nom: z.string().min(2).max(80),
  email: z.string().email().max(180),
  telephone: z.string().min(6).max(40),
  typeEvenement: z.string().min(1).max(80),
  prestation: z.string().min(1).max(80),
  personnes: z.string().min(1).max(40),
  ville: z.string().min(2).max(120),
  date: z.string().max(40).optional(),
  message: z.string().min(10).max(4000),
  societe: z.string().max(0).optional(),
});

/** Limitation simple par IP, en mémoire du processus. */
const passages = new Map<string, { n: number; depuis: number }>();
const FENETRE = 10 * 60 * 1000;
const MAX = 5;

function tropDeRequetes(ip: string) {
  const maintenant = Date.now();
  const entree = passages.get(ip);

  if (!entree || maintenant - entree.depuis > FENETRE) {
    passages.set(ip, { n: 1, depuis: maintenant });
    return false;
  }

  entree.n += 1;
  return entree.n > MAX;
}

function echapper(v: string) {
  return v.replace(/[<>&]/g, (c) =>
    c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&amp;"
  );
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "inconnue";

  if (tropDeRequetes(ip)) {
    return NextResponse.json(
      { message: "Trop de demandes envoyées. Réessayez dans quelques minutes." },
      { status: 429 }
    );
  }

  let corps: unknown;
  try {
    corps = await request.json();
  } catch {
    return NextResponse.json({ message: "Requête invalide." }, { status: 400 });
  }

  const resultat = schema.safeParse(corps);
  if (!resultat.success) {
    return NextResponse.json(
      { message: "Certains champs sont incomplets." },
      { status: 400 }
    );
  }

  const d = resultat.data;

  // Le champ piège est rempli : on répond comme si tout allait bien.
  if (d.societe) {
    return NextResponse.json({ ok: true });
  }

  const cle = process.env.RESEND_API_KEY;
  const destinataire = process.env.CONTACT_TO ?? site.email;
  const expediteur = process.env.CONTACT_FROM;

  if (!cle || !expediteur) {
    console.error(
      "Contact : RESEND_API_KEY ou CONTACT_FROM manquant, voir .env.example"
    );
    return NextResponse.json(
      {
        message:
          "L'envoi est momentanément indisponible. Écrivez directement à " +
          site.email,
      },
      { status: 503 }
    );
  }

  const lignes: [string, string][] = [
    ["Nom", `${d.prenom} ${d.nom}`],
    ["E-mail", d.email],
    ["Téléphone", d.telephone],
    ["Type d'événement", d.typeEvenement],
    ["Prestation souhaitée", d.prestation],
    ["Nombre d'invités", d.personnes],
    ["Ville", d.ville],
    ["Date envisagée", d.date || "non précisée"],
  ];

  const html = `
    <div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#111">
      <h1 style="font-size:18px;margin:0 0 18px">Nouvelle demande de devis</h1>
      <table style="border-collapse:collapse">
        ${lignes
          .map(
            ([k, v]) =>
              `<tr><td style="padding:4px 18px 4px 0;color:#666">${k}</td><td style="padding:4px 0"><strong>${echapper(v)}</strong></td></tr>`
          )
          .join("")}
      </table>
      <h2 style="font-size:15px;margin:24px 0 8px">Message</h2>
      <p style="white-space:pre-wrap;margin:0">${echapper(d.message)}</p>
    </div>
  `;

  try {
    const resend = new Resend(cle);
    const { error } = await resend.emails.send({
      from: expediteur,
      to: destinataire,
      replyTo: d.email,
      subject: `Devis : ${d.typeEvenement} à ${d.ville} (${d.prenom} ${d.nom})`,
      html,
    });

    if (error) throw new Error(error.message);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Contact : échec de l'envoi", e);
    return NextResponse.json(
      {
        message:
          "L'envoi n'a pas abouti. Réessayez, ou écrivez directement à " +
          site.email,
      },
      { status: 502 }
    );
  }
}
