/**
 * FAQ : l'intégralité des questions/réponses de l'ancien site,
 * regroupées par catégorie (36 entrées).
 */

export type QA = { q: string; a: string };
export type FaqCategorie = { id: string; label: string; items: QA[] };

export const faq: FaqCategorie[] = [
  {
    id: "general",
    label: "Général",
    items: [
      {
        q: "Comment réagissent généralement les invités ?",
        a: "Rires, cris de surprise, regards qui se tournent vers leurs voisins pour vérifier qu'ils ont bien vu la même chose. C'est souvent l'un des moments les plus commentés de la soirée, bien après l'événement.",
      },
      {
        q: "La prestation fonctionne-t-elle en extérieur ?",
        a: "Oui, tant que les conditions le permettent (vent, pluie). On en discute en amont pour prévoir un plan B si besoin.",
      },
      {
        q: "Combien de temps à l'avance faut-il réserver ?",
        a: "Le plus tôt possible, surtout pour les mariages en saison (avril à septembre) où les dates partent vite. Mais n'hésitez jamais à me contacter, même à la dernière minute : parfois la magie trouve un créneau là où on ne l'attendait pas !",
      },
      {
        q: "Est-ce adapté si certains invités sont plutôt réservés ou timides ?",
        a: "Oui, sans problème. La magie s'adapte à chacun : certains préfèrent observer de loin, d'autres s'approchent naturellement. Personne n'est jamais forcé à participer.",
      },
      {
        q: "Peut-on filmer ou photographier les tours ?",
        a: "Bien sûr ! Ces moments sont faits pour être partagés. Je peux même recommander les meilleurs angles aux photographes présents.",
      },
      {
        q: "Où intervenez-vous ?",
        a: "Je suis basé à Saint-Malo et je me déplace dans toute la Bretagne (Dinard, Rennes, Saint-Brieuc, Vannes), ainsi que partout en France selon les événements.",
      },
      {
        q: "Comment vous suivre après l'événement ?",
        a: "Sur Instagram, @julienlambertmagicien pour retrouver des extraits, des coulisses, et les prochaines dates !",
      },
    ],
  },

  {
    id: "close-up",
    label: "Close-up",
    items: [
      {
        q: "Qu'est-ce que la magie close-up, exactement ?",
        a: "De la magie qui se joue à quelques centimètres de vous. Pas de scène, pas de distance : les objets sont dans vos mains, l'illusion se passe sous vos yeux. C'est la forme de magie la plus troublante, parce qu'il n'y a nulle part où se cacher.",
      },
      {
        q: "Combien de temps dure une prestation de close-up ?",
        a: "Tout dépend du format choisi. Une animation en déambulation dure généralement entre 1h30 et 2h, au fil des groupes. Certaines prestations peuvent s'étendre sur toute la durée d'un événement. On ajuste ensemble selon vos besoins.",
      },
      {
        q: "Peut-on personnaliser la prestation de close-up ?",
        a: "Oui, et c'est même conseillé. Un prénom glissé dans un tour, un objet symbolique, une anecdote transformée en illusion : la magie est plus forte quand elle vous appartient un peu.",
      },
      {
        q: "Avez-vous besoin de matériel particulier sur place ?",
        a: "Non. Je viens avec tout mon matériel. Un peu d'espace pour circuler suffit : le reste, c'est mon affaire.",
      },
      {
        q: "Pour quels événements le close-up est-il adapté ?",
        a: "Le close-up s'adapte à quasiment tous les formats : mariages (pendant le vin d'honneur ou le cocktail), soirées d'entreprise, lancements de produit, anniversaires, ou tout événement où les invités circulent librement. C'est le format idéal pour créer du lien entre des personnes qui ne se connaissent pas encore, ou simplement pour surprendre vos invités dans l'intimité d'un moment à deux ou trois.",
      },
      {
        q: "Pour combien de personnes le close-up est-il adapté ?",
        a: "De 10 à plusieurs centaines. La magie close-up fonctionne par petits groupes de 3 à 8 personnes à la fois, mais je circule tout au long de la soirée pour que chaque invité, quel que soit le nombre total, vive ce moment de près.",
      },
      {
        q: "Comment obtenir un devis pour cette prestation ?",
        a: "Contactez-moi via le formulaire du site avec la date, le lieu et le nombre d'invités, je vous envoie un devis personnalisé sous peu.",
      },
      {
        q: "Peut-on combiner magie de salon et close-up dans une même soirée ?",
        a: "Oui, et c'est même une combinaison très appréciée : le close-up pour créer du lien pendant le cocktail, puis un temps fort en magie de salon pour rassembler tout le monde autour d'un même moment.",
      },
    ],
  },

  {
    id: "magie-de-salon",
    label: "Magie de salon",
    items: [
      {
        q: "Qu'est-ce que la magie de salon, exactement ?",
        a: "C'est l'entre-deux parfait entre la scène et le close-up. Assez de mise en scène pour un vrai spectacle, assez de proximité pour que rien ne triche. Le groupe reste réuni, les regards se croisent, et la magie se joue à la fois pour tous et pour chacun.",
      },
      {
        q: "Quelle est la différence avec la magie close-up ?",
        a: "Le close-up circule de table en table, en petits groupes, dans l'intimité totale. La magie de salon s'adresse à un groupe entier réuni au même moment, avec un vrai rythme de spectacle (une montée, un twist, une chute), tout en gardant la proximité qui fait la force de la magie rapprochée.",
      },
      {
        q: "Pour combien de personnes cette prestation est-elle adaptée ?",
        a: "Idéalement entre 15 et 50 personnes réunies dans un même espace. Au-delà, on privilégie d'autres formats plus adaptés aux grands groupes.",
      },
      {
        q: "Combien de temps dure un spectacle de salon ?",
        a: "En général entre 40 et 50 minutes, en un seul bloc. On peut aussi l'adapter en plusieurs séquences plus courtes selon le déroulé de votre soirée.",
      },
      {
        q: "Quel espace faut-il prévoir sur place ?",
        a: "Un espace dégagé où les invités peuvent se rassembler face à moi, assis ou debout. Pas besoin de scène ni d'installation particulière : juste un peu de place et de bonne lumière.",
      },
      {
        q: "Pour quel type d'événement est-ce le plus adapté ?",
        a: "Les cocktails assis, les soirées d'entreprise, les anniversaires, ou tout moment où l'on souhaite capter l'attention de tous les invités en même temps, sans les faire circuler.",
      },
      {
        q: "Faut-il que les invités soient assis ou peuvent-ils être debout ?",
        a: "Les deux fonctionnent très bien. L'important est que chacun puisse voir sans être trop éloigné : on ajuste la disposition ensemble selon votre lieu.",
      },
      {
        q: "Le spectacle peut-il être personnalisé selon l'occasion ?",
        a: "Oui. Un prénom, une anecdote, un objet symbolique : la magie de salon se prête très bien à une personnalisation qui parle directement à vos invités.",
      },
      {
        q: "Comment obtenir un devis pour cette prestation ?",
        a: "Contactez-moi via le formulaire du site avec la date, le lieu et le nombre d'invités, je vous envoie un devis personnalisé sous peu.",
      },
    ],
  },

  {
    id: "mariage",
    label: "Mariage",
    items: [
      {
        q: "À quel moment de la journée intervenez-vous ?",
        a: "Le plus souvent pendant le vin d'honneur, moment idéal pour créer du lien entre les invités qui ne se connaissent pas encore. Mais je peux aussi intervenir pendant le cocktail, entre les plats, ou en soirée.",
      },
      {
        q: "Pouvez-vous inclure les mariés dans un tour ?",
        a: "Si vous le souhaitez, oui : un tour dédié aux mariés est toujours un moment fort, souvent immortalisé en photo ou vidéo.",
      },
      {
        q: "Est-ce que ça convient si les invités viennent de familles ou de groupes qui ne se connaissent pas ?",
        a: "C'est même l'un des meilleurs usages de la magie dans un mariage. Elle crée un point commun immédiat entre des inconnus, brise la glace, et lance des conversations qui n'auraient peut-être jamais existé autrement.",
      },
      {
        q: "Faut-il prévoir un espace particulier pour la prestation ?",
        a: "Non, la magie s'adapte à votre lieu : jardin, salle de réception, terrasse. Un peu d'espace pour circuler entre les invités suffit.",
      },
      {
        q: "Est-ce compatible avec un mariage en extérieur ?",
        a: "Oui, tant que la météo le permet. On prévoit toujours un plan B ensemble en cas de pluie ou de vent trop fort.",
      },
    ],
  },

  {
    id: "entreprise",
    label: "Entreprise",
    items: [
      {
        q: "Proposez-vous des prestations en anglais ?",
        a: "Oui, je suis bilingue français/anglais, ce qui est particulièrement apprécié lors d'événements avec une clientèle internationale.",
      },
      {
        q: "La magie peut-elle s'intégrer à un événement de networking ou un séminaire ?",
        a: "C'est même l'un de ses meilleurs usages : elle brise la glace, crée des conversations, et laisse une trace mémorable de votre événement, bien au-delà du buffet.",
      },
      {
        q: "La magie peut-elle être utilisée pour renforcer un message ou une marque ?",
        a: "Oui, certains tours peuvent être adaptés pour intégrer subtilement un message, un produit ou une valeur de votre entreprise. La surprise reste intacte tout en servant votre objectif.",
      },
      {
        q: "Est-ce adapté à un public international ?",
        a: "Tout à fait, Julien est bilingue français/anglais, ce qui permet d'intervenir naturellement auprès d'une clientèle ou d'un public non-francophone, ou même de proposer des effets visuels s'il ne parle pas la langue.",
      },
    ],
  },

  {
    id: "tarifs",
    label: "Tarifs & réservation",
    items: [
      {
        q: "Comment se déroule une réservation ?",
        a: "Vous me contactez via le formulaire du site ou en message, on échange sur votre événement (date, lieu, format, nombre d'invités), puis je vous envoie un devis personnalisé.",
      },
      {
        q: "Un acompte est-il demandé ?",
        a: "Oui, un acompte est demandé à la confirmation de la réservation pour bloquer la date, le solde étant réglé le jour J.",
      },
    ],
  },
];

/** Toutes les questions à plat : utilisé pour le JSON-LD FAQPage. */
export const faqFlat: QA[] = faq.flatMap((c) => c.items);

/** Sélection affichée sur les pages prestation. */
export function faqPour(id: string, n = 6): QA[] {
  const cat = faq.find((c) => c.id === id);
  const general = faq.find((c) => c.id === "general")!.items;
  return [...(cat?.items ?? []), ...general].slice(0, n);
}
