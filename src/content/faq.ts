/**
 * FAQ, regroupée par catégorie.
 *
 * La liste reprise de l'ancien site a été reprise en septembre 2026. Trois
 * défauts la rendaient peu utile :
 *
 *   - des redites. « Comment obtenir un devis » figurait deux fois mot pour
 *     mot, la question de l'anglais deux fois, celle de l'extérieur deux
 *     fois, celle de l'espace trois fois ;
 *   - des absences. Rien sur le prix, le déplacement, la facturation,
 *     l'annulation, la sonorisation, les enfants, le repas de l'artiste :
 *     ce sont pourtant les questions qui décident d'une réservation, et
 *     celles que l'on tape dans un moteur de recherche ;
 *   - des réponses qui ne répondaient pas, du genre « la magie s'adapte ».
 *
 * Règle de rédaction : une question par sujet, une réponse qui engage
 * quelque chose. Aucun tarif chiffré n'est écrit ici, parce qu'il dépend
 * réellement du format, de la durée et de la distance : la réponse dit
 * comment il se construit, pas un nombre qui serait faux la moitié du temps.
 */

export type QA = { q: string; a: string };
export type FaqCategorie = { id: string; label: string; items: QA[] };

export const faq: FaqCategorie[] = [
  {
    id: "general",
    label: "Général",
    items: [
      {
        q: "Comment réagissent généralement les invités ?",
        a: "Rires, cris de surprise, regards qui se tournent vers leurs voisins pour vérifier qu'ils ont bien vu la même chose. C'est souvent l'un des moments les plus commentés de la soirée, bien après l'événement.",
      },
      {
        q: "Où intervenez-vous ?",
        a: "Julien est basé en Bretagne et en région parisienne. Il intervient régulièrement à Saint-Malo, Dinard, Dinan, Rennes, Saint-Brieuc et Vannes, à Paris et dans les Hauts-de-Seine et les Yvelines, et se déplace partout en France selon les événements.",
      },
      {
        q: "Vous déplacez-vous loin, et le déplacement est-il facturé ?",
        a: "Oui, Julien se déplace dans toute la France. Le déplacement est inclus dans le devis, calculé une fois pour toutes à partir du lieu : il n'y a pas de frais qui apparaissent après coup.",
      },
      {
        q: "La prestation fonctionne-t-elle en extérieur ?",
        a: "Oui, jardin, terrasse, cour, bord de mer. Deux choses seulement gênent vraiment la magie rapprochée : le vent, qui emporte les cartes, et la pluie. On prévoit donc ensemble un repli à l'abri, même quand la météo s'annonce belle.",
      },
      {
        q: "Est-ce adapté si certains invités sont plutôt réservés ou timides ?",
        a: "Oui, sans problème. La magie s'adapte à chacun : certains préfèrent observer de loin, d'autres s'approchent naturellement. Personne n'est jamais désigné ni forcé à monter devant les autres, et un invité qui préfère regarder passe un aussi bon moment.",
      },
      {
        q: "Est-ce que cela intéresse aussi les enfants ?",
        a: "Oui, et ils sont souvent le meilleur public. Julien adapte son répertoire quand des enfants sont présents, sans transformer la prestation en spectacle pour enfants : les adultes gardent leur part. Pour un événement destiné uniquement aux enfants, dites-le en amont, le format change.",
      },
      {
        q: "Peut-on filmer ou photographier les tours ?",
        a: "Bien sûr ! Ces moments sont faits pour être partagés. Julien peut même indiquer aux photographes présents où se placer : les meilleures images sont rarement celles du tour, mais celles des visages en face.",
      },
      {
        q: "Peut-on voir une prestation avant de réserver ?",
        a: "La vidéo de présentation sur ce site est un montage de prestations réelles, sans mise en scène ajoutée : c'est le plus fidèle aperçu possible. La galerie et les avis Google complètent le tableau. Et s'il reste une hésitation, un appel avec Julien lève en général les doutes plus vite qu'une vidéo.",
      },
      {
        q: "Comment vous suivre après l'événement ?",
        a: "Sur Instagram, @julienlambertmagicien, et sur YouTube, @lemagicienjulien : extraits, coulisses et prochaines dates.",
      },
    ],
  },

  {
    id: "close-up",
    label: "Close-up",
    items: [
      {
        q: "Qu'est-ce que la magie close-up, exactement ?",
        a: "De la magie qui se joue à quelques centimètres de vous. Pas de scène, pas de distance : les objets sont dans vos mains, l'illusion se passe sous vos yeux. C'est la forme de magie la plus troublante, parce qu'il n'y a nulle part où se cacher.",
      },
      {
        q: "Combien de temps dure une prestation de close-up ?",
        a: "Entre 1h30 et 2h en déambulation, le temps de passer auprès de tous les groupes sans jamais donner l'impression de courir. Certaines soirées demandent davantage : le format s'ajuste à votre déroulé plutôt que l'inverse.",
      },
      {
        q: "Pour combien de personnes le close-up est-il adapté ?",
        a: "De 10 à plusieurs centaines. La magie close-up se joue par petits groupes de 3 à 8 personnes à la fois, mais Julien circule toute la soirée : au-delà d'une centaine d'invités, on cale ensemble la durée pour que personne ne soit oublié.",
      },
      {
        q: "Pour quels événements le close-up est-il adapté ?",
        a: "Tous ceux où les invités circulent : vin d'honneur et cocktail de mariage, soirée d'entreprise, lancement de produit, anniversaire, salon professionnel. C'est le format idéal pour créer du lien entre des gens qui ne se connaissent pas encore.",
      },
      {
        q: "Avez-vous besoin de matériel ou d'un espace particulier ?",
        a: "Non. Julien vient avec tout son matériel, sans scène, sans sono, sans câble. Il lui faut seulement de quoi circuler entre les invités, et une lumière suffisante pour que les mains se voient.",
      },
      {
        q: "Peut-on personnaliser la prestation ?",
        a: "Oui, et c'est même conseillé. Un prénom glissé dans un tour, un objet symbolique, une anecdote transformée en illusion : la magie est plus forte quand elle vous appartient un peu. Prévoyez d'en parler une à deux semaines avant, le temps de la préparer.",
      },
      {
        q: "Peut-on combiner magie de salon et close-up dans une même soirée ?",
        a: "Oui, et c'est la combinaison la plus appréciée : le close-up pour créer du lien pendant le cocktail, puis un temps fort en magie de salon pour rassembler tout le monde autour d'un même moment. Un seul artiste, deux ambiances.",
      },
    ],
  },

  {
    id: "magie-de-salon",
    label: "Magie de salon",
    items: [
      {
        q: "Qu'est-ce que la magie de salon, exactement ?",
        a: "C'est l'entre-deux parfait entre la scène et le close-up. Assez de mise en scène pour un vrai spectacle, assez de proximité pour que rien ne triche. Le groupe reste réuni, les regards se croisent, et la magie se joue à la fois pour tous et pour chacun.",
      },
      {
        q: "Quelle est la différence avec la magie close-up ?",
        a: "Le close-up circule de groupe en groupe, dans l'intimité totale. La magie de salon s'adresse à tout le monde au même moment, avec un vrai rythme de spectacle : une montée, un twist, une chute. On y gagne un souvenir commun, celui dont la salle reparle au dessert.",
      },
      {
        q: "Pour combien de personnes cette prestation est-elle adaptée ?",
        a: "Idéalement de 15 à 50 personnes réunies dans un même espace. En dessous de 15, le close-up est plus juste. Au-delà de 50, les derniers rangs perdent le détail des mains : mieux vaut alors deux séances qu'un seul spectacle trop large.",
      },
      {
        q: "Combien de temps dure un spectacle de salon ?",
        a: "Entre 40 et 50 minutes, en un seul bloc. Le format peut aussi se découper en deux séquences plus courtes, par exemple de part et d'autre d'un plat, si votre déroulé s'y prête mieux.",
      },
      {
        q: "Quel espace faut-il prévoir, et faut-il une sonorisation ?",
        a: "Un espace dégagé d'environ trois mètres sur deux, où les invités peuvent se rassembler face à Julien, assis ou debout, avec une bonne lumière sur ses mains. Pas de scène ni d'estrade. Jusqu'à une cinquantaine de personnes dans une salle calme, la voix porte sans micro : au-delà, ou dans un lieu bruyant, un micro HF est le bienvenu s'il y en a un sur place.",
      },
      {
        q: "Faut-il que les invités soient assis ou peuvent-ils être debout ?",
        a: "Les deux fonctionnent très bien. L'important est que chacun puisse voir sans être trop éloigné : on ajuste la disposition ensemble selon votre lieu, souvent en demi-cercle plutôt qu'en rangs.",
      },
      {
        q: "Le spectacle peut-il être personnalisé selon l'occasion ?",
        a: "Oui. Un prénom, une anecdote, un objet symbolique : la magie de salon se prête très bien à une personnalisation qui parle directement à vos invités, et c'est souvent l'effet dont on se souvient le plus longtemps.",
      },
    ],
  },

  {
    id: "mariage",
    label: "Mariage",
    items: [
      {
        q: "À quel moment de la journée intervenez-vous ?",
        a: "Le plus souvent pendant le vin d'honneur : les invités attendent, verre en main, et c'est là que la magie a le plus d'effet. Julien peut aussi intervenir pendant le cocktail, entre les plats, ou en soirée, selon les temps morts de votre déroulé.",
      },
      {
        q: "Faut-il vous prévoir un créneau dans le programme ?",
        a: "Pour le close-up, non : il se glisse dans un moment qui existe déjà, sans rien décaler. Pour la magie de salon, oui, il faut un vrai créneau de 50 minutes. Julien peut regarder votre déroulé avec vous et dire où le poser.",
      },
      {
        q: "Pouvez-vous inclure les mariés dans un tour ?",
        a: "Si vous le souhaitez, oui : un tour dédié aux mariés est toujours un moment fort, souvent immortalisé en photo ou vidéo. Prévenez simplement en amont pour que le photographe soit au bon endroit.",
      },
      {
        q: "Est-ce que ça convient si les invités viennent de familles qui ne se connaissent pas ?",
        a: "C'est même l'un des meilleurs usages de la magie dans un mariage. Elle crée un point commun immédiat entre des inconnus, brise la glace, et lance des conversations qui n'auraient peut-être jamais existé autrement.",
      },
      {
        q: "Vous coordonnez-vous avec le traiteur, le photographe ou le DJ ?",
        a: "Oui, volontiers. Un mot avec le traiteur évite que la magie tombe pendant le service, et un mot avec le photographe lui permet d'être en face des réactions plutôt que dans le dos de Julien. C'est cinq minutes qui changent le rendu.",
      },
      {
        q: "Que se passe-t-il si le mariage prend du retard ?",
        a: "Rien de grave : c'est la règle plutôt que l'exception. Julien arrive en avance, s'adapte au décalage, et commence quand le moment est juste. La durée convenue est tenue à partir du vrai départ.",
      },
    ],
  },

  {
    id: "entreprise",
    label: "Entreprise",
    items: [
      {
        q: "Proposez-vous des prestations en anglais ?",
        a: "Oui, Julien est bilingue français-anglais et joue indifféremment dans les deux langues, y compris en alternance au sein d'une même soirée. Face à un public dont il ne parle pas la langue, il bascule sur un répertoire visuel qui se passe de mots.",
      },
      {
        q: "La magie peut-elle s'intégrer à un séminaire ou à un événement de networking ?",
        a: "C'est l'un de ses meilleurs usages : elle brise la glace, crée des conversations entre gens qui ne se seraient pas parlé, et laisse une trace mémorable de votre événement, bien au-delà du buffet.",
      },
      {
        q: "La magie peut-elle porter un message ou une marque ?",
        a: "Oui. Un produit, un slogan, un chiffre clé ou une valeur peuvent devenir le cœur d'un effet écrit pour vous. La surprise reste entière, et le message est retenu parce qu'il arrive au moment où toute la salle regarde. Ce travail se prépare : comptez trois à quatre semaines.",
      },
      {
        q: "Intervenez-vous sur des salons et des stands ?",
        a: "Oui. Sur un salon, la magie sert à arrêter les visiteurs et à ouvrir la conversation : Julien attire un petit groupe devant le stand, et laisse vos équipes prendre la suite. Le format se cale sur les heures de forte affluence.",
      },
      {
        q: "Comment se passent le devis et la facturation ?",
        a: "Julien exerce en entreprise individuelle : il établit un devis nominatif, puis une facture après la prestation. Les pièces habituellement demandées par un service achats sont fournies sur simple demande.",
      },
      {
        q: "Peut-on réserver plusieurs dates ou une tournée ?",
        a: "Oui. Julien a déjà suivi des tournées d'entreprise sur plusieurs villes, avec plusieurs centaines d'invités par étape. Pour ce type de format, prenez contact assez tôt : ce sont des dates qui se bloquent en bloc.",
      },
    ],
  },

  {
    id: "tarifs",
    label: "Tarifs & réservation",
    items: [
      {
        q: "Combien coûte l'intervention d'un magicien ?",
        a: "Il n'y a pas de tarif unique, et un prix affiché serait faux une fois sur deux. Le devis dépend de quatre choses : le format (close-up en déambulation ou spectacle de salon), la durée, le nombre d'invités, et le lieu, déplacement compris. Décrivez votre événement en quelques lignes et vous recevrez un montant ferme, tout compris, sans supplément découvert après coup.",
      },
      {
        q: "Combien de temps à l'avance faut-il réserver ?",
        a: "Le plus tôt possible pour les mariages en saison, d'avril à septembre : ces dates partent souvent six mois à un an à l'avance. Pour les soirées d'entreprise, quelques semaines suffisent en général. Et n'hésitez jamais à demander à la dernière minute : il arrive qu'une date se libère.",
      },
      {
        q: "Comment se déroule une réservation ?",
        a: "Vous écrivez à Julien via le formulaire du site, par téléphone ou par courriel, avec la date, le lieu, le format envisagé et le nombre d'invités. Il vous rappelle pour caler les détails, puis vous envoie un devis. La date est bloquée dès qu'il est signé.",
      },
      {
        q: "Un acompte est-il demandé ?",
        a: "Oui, un acompte est demandé à la signature du devis : c'est lui qui bloque la date. Le solde est réglé le jour de la prestation ou à réception de la facture.",
      },
      {
        q: "Que se passe-t-il en cas d'annulation ou de report ?",
        a: "Un report est presque toujours possible si la nouvelle date est libre, et l'acompte est alors transféré. Les conditions d'annulation figurent noir sur blanc sur le devis, pour qu'aucune des deux parties n'ait de mauvaise surprise.",
      },
      {
        q: "Faut-il prévoir un repas ou une loge ?",
        a: "Sur une prestation courte, non. Sur une soirée longue ou un déplacement lointain, un repas est apprécié, et un coin tranquille pour préparer le matériel est utile mais pas indispensable. Ce point est réglé dans le devis, jamais le jour même.",
      },
    ],
  },
];

/** Toutes les questions à plat : utilisé pour le JSON-LD FAQPage. */
export const faqFlat: QA[] = faq.flatMap((c) => c.items);

/** Sélection affichée sur les pages prestation. */
export function faqPour(id: string, n = 6): QA[] {
  const cat = faq.find((c) => c.id === id);
  const general = faq.find((c) => c.id === "general")!.items;
  return [...(cat?.items ?? []), ...general].slice(0, n);
}
