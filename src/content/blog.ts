/**
 * Articles du blog : repris intégralement de l'ancien site.
 * Le corps est décrit en blocs typés plutôt qu'en Markdown : le rendu
 * reste totalement maîtrisé et il n'y a aucun parseur à charger côté client.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: { strong?: string; text: string }[] }
  | { type: "lead"; text: string }
  | { type: "quote"; text: string };

export type Article = {
  slug: string;
  titre: string;
  /** Titre de la balise <title> : court, pour ne pas être tronqué. */
  titreSeo: string;
  chapo: string;
  date: string; // ISO
  dateLabel: string;
  lecture: string;
  cover: { src: string; alt: string };
  categorie: string;
  blocks: Block[];
};

export const articles: Article[] = [
  {
    slug: "magie-seminaire-entreprise-moment-inoubliable",
    titreSeo: "Magie et séminaire d'entreprise",
    titre:
      "Pourquoi la magie transforme un séminaire d'entreprise en moment que personne n'oublie",
    chapo:
      "Et si le moment mémorable n'était pas la présentation PowerPoint, mais ces trente secondes où personne ne comprend ce qui vient de se produire sous ses yeux ?",
    date: "2025-08-19",
    dateLabel: "19 août",
    lecture: "2 min",
    categorie: "Entreprise",
    cover: {
      src: "/images/site/site-closeup-large.webp",
      alt: "Public d'un séminaire captivé par un tour de magie",
    },
    blocks: [
      {
        type: "lead",
        text: "Un séminaire d'entreprise suit une formule prévisible : présentations, pauses café, activités de team building parfois artificielles, avec le sentiment que chacun repart inchangé. Rarement un souvenir véritablement partagé.",
      },
      {
        type: "p",
        text: "Et si le moment mémorable n'était pas la présentation PowerPoint, mais ces trente secondes où personne ne comprend ce qui vient de se produire sous ses yeux ?",
      },
      { type: "h2", text: "Un langage universel, sans barrière hiérarchique" },
      {
        type: "p",
        text: "Dans un séminaire, les langages diffèrent : le commercial et la technique ne partagent pas les mêmes codes, la direction et les nouveaux collaborateurs n'ont pas les mêmes réflexes. La magie dissipe ces distinctions en quelques secondes. Face à un tour inexplicable, le DRH et le stagiaire réagissent identiquement : yeux écarquillés, rire nerveux, demande de répétition.",
      },
      {
        type: "quote",
        text: "C'est l'un des rares instants d'événement professionnel où toute hiérarchie disparaît, simplement stupéfaite.",
      },
      { type: "h2", text: "Deux façons de l'intégrer à votre événement" },
      { type: "h3", text: "Magie close-up en cocktail ou pause networking" },
      {
        type: "p",
        text: "Je circule parmi les groupes avec des cartes, créant des interactions brèves et percutantes utilisant les objets des participants eux-mêmes : bague, billet, carte de visite. Cela détend l'atmosphère avant une intervention importante ou fluidifie les moments réseautage généralement silencieux et maladroits.",
      },
      { type: "h3", text: "Magie sur-mesure autour d'un message" },
      {
        type: "p",
        text: "La formule la plus demandée par les entreprises : un tour conçu spécifiquement autour d'une valeur, chiffre clé ou annonce majeure (lancement produit, résultat annuel, nouvelle stratégie). Le message ne s'énonce pas seulement : il se vit, se prouve, se mémorise.",
      },
      { type: "h2", text: "Ce que ça change concrètement" },
      {
        type: "ul",
        items: [
          {
            strong: "La cohésion",
            text: "un souvenir partagé, amusant et énigmatique, que les équipes se racontent encore des semaines plus tard.",
          },
          {
            strong: "La détente",
            text: "quelques minutes sortant du mode professionnel sans quitter le cadre événementiel.",
          },
          {
            strong: "La mémorisation",
            text: "un message porté par l'émotion et la surprise persiste bien davantage qu'une diapositive.",
          },
        ],
      },
      {
        type: "p",
        text: "Un séminaire réussi ne se limite pas à un programme chargé. C'est un moment que les équipes continuent de raconter une fois revenus au bureau.",
      },
      {
        type: "p",
        text: "Vous organisez un séminaire, une convention ou un événement d'entreprise ? Discutons de l'intégration d'un moment de magie personnalisée à votre programme.",
      },
    ],
  },

  {
    slug: "pourquoi-vous-oubliez-les-tours-de-magie-sur-instagram",
    titreSeo: "Magie sur Instagram ou en vrai",
    titre:
      "Pourquoi vous oubliez 90% des tours de magie que vous voyez sur Instagram (et jamais ceux vécus en vrai)",
    chapo:
      "Le même tour, réalisé à un mètre de vous, dans votre salon ou pendant votre mariage : celui-là, vous vous en souviendrez dans dix ans.",
    date: "2025-08-13",
    dateLabel: "13 août",
    lecture: "2 min",
    categorie: "Réflexion",
    cover: {
      src: "/images/site/site-apropos.webp",
      alt: "Des invités stupéfaits pendant un tour de magie en direct",
    },
    blocks: [
      {
        type: "lead",
        text: "Un soir, sur Instagram, une carte disparaît entre deux doigts. Vous scrollez. Trois secondes plus tard, c'est déjà oublié, remplacé par une vidéo de cuisine ou un chat qui saute trop haut.",
      },
      {
        type: "p",
        text: "Le même tour, réalisé à un mètre de vous, dans votre salon ou pendant votre mariage : celui-là, vous vous en souviendrez dans dix ans.",
      },
      { type: "h2", text: "Le piège du point de vue unique" },
      {
        type: "p",
        text: "Sur les réseaux sociaux, la caméra choisit tout pour vous. Un seul angle, souvent le plus flatteur pour le tour. Ce que vous ne voyez pas (le cadrage, le montage, parfois même plusieurs prises recollées) fait autant partie du secret que la manipulation elle-même.",
      },
      {
        type: "p",
        text: "En vrai, il n'y a pas de deuxième prise. Pas de cadrage avantageux. Vous êtes debout, à vingt centimètres des mains du magicien, et vous cherchez le truc avec vos propres yeux, sous tous les angles que vous voulez. Quand la carte disparaît quand même, malgré votre vigilance, l'émotion n'a rien à voir avec un like ou un commentaire. C'est de la stupéfaction pure, vécue dans votre corps.",
      },
      { type: "h2", text: "Ce que la vidéo ne peut pas donner" },
      {
        type: "p",
        text: "Une vidéo se regarde. Un tour de magie en direct se vit. La différence est là.",
      },
      {
        type: "ul",
        items: [
          {
            strong: "La présence",
            text: "vous sentez la tension, le silence juste avant la révélation, le rire nerveux qui suit.",
          },
          {
            strong: "La complicité",
            text: "le magicien s'adresse à vous, réagit à vous, adapte le moment à ce que vous êtes en train de vivre ensemble.",
          },
          {
            strong: "La preuve par le corps",
            text: "vous avez tenu les cartes, vous avez mélangé le jeu vous-même, votre bague a vraiment disparu de votre doigt. Aucun montage ne peut simuler ça.",
          },
        ],
      },
      {
        type: "p",
        text: "C'est cette dimension sensorielle et sociale qui transforme un tour en souvenir. On ne raconte pas à ses invités « j'ai vu une vidéo incroyable hier soir ». On raconte « il y avait ce magicien à mon mariage, et ce qu'il a fait avec l'alliance de ma mère, je n'y crois toujours pas ».",
      },
      { type: "h2", text: "Un souvenir collectif, pas une consommation solitaire" },
      {
        type: "p",
        text: "Regarder un tour sur son téléphone est une expérience solitaire, silencieuse, instantanément remplacée par le contenu suivant. Assister à un tour en vrai, entouré d'amis ou de collègues, crée un souvenir partagé, quelque chose que le groupe se remémore et raconte encore des années après, avec ce petit frisson qui ne s'efface pas.",
      },
      {
        type: "quote",
        text: "C'est précisément ce que je cherche à créer à chaque prestation : pas un contenu qu'on consomme, mais un moment qu'on vit ensemble, et qu'on garde.",
      },
      {
        type: "p",
        text: "Vous organisez un mariage, un événement d'entreprise ou une soirée privée en Bretagne ou en région parisienne ? Offrez à vos invités un souvenir qu'aucun écran ne pourra jamais leur donner.",
      },
    ],
  },

  {
    slug: "10-raisons-de-choisir-un-magicien-experimente",
    titreSeo: "10 raisons de choisir un magicien expérimenté",
    titre: "10 raisons de choisir un magicien expérimenté pour votre soirée",
    chapo:
      "Un magicien expérimenté peut transformer un événement ordinaire en un moment inoubliable. Voici dix raisons convaincantes.",
    date: "2025-07-14",
    dateLabel: "14 juillet",
    lecture: "2 min",
    categorie: "Conseils",
    cover: {
      src: "/images/site/site-apropos-cta.webp",
      alt: "Julien Lambert entouré d'invités pendant une soirée",
    },
    blocks: [
      {
        type: "lead",
        text: "Organiser une soirée réussie demande une attention particulière à chaque détail, surtout lorsqu'il s'agit de divertir vos invités. Un magicien expérimenté peut transformer un événement ordinaire en un moment inoubliable. Voici dix raisons convaincantes pour lesquelles engager un magicien professionnel est un choix judicieux pour votre prochaine soirée.",
      },
      { type: "h2", text: "1. Une maîtrise parfaite des tours" },
      {
        type: "p",
        text: "Un magicien expérimenté possède une maîtrise technique avancée. Il sait exécuter des tours complexes avec fluidité et précision, ce qui garantit un spectacle impressionnant. Cette expertise évite les erreurs qui pourraient gâcher l'ambiance.",
      },
      { type: "h2", text: "2. Adaptation à tous les publics" },
      {
        type: "p",
        text: "Chaque soirée a son propre public, avec des attentes et des sensibilités différentes. Un magicien professionnel sait adapter ses tours et son discours pour captiver aussi bien les enfants que les adultes, assurant ainsi que tout le monde passe un bon moment.",
      },
      { type: "h2", text: "3. Création d'une ambiance unique" },
      {
        type: "p",
        text: "La magie crée une atmosphère de mystère et d'émerveillement. Un magicien expérimenté sait comment rythmer son spectacle pour maintenir l'attention et susciter l'enthousiasme, transformant votre soirée en une expérience mémorable.",
      },
      { type: "h2", text: "4. Interaction personnalisée avec les invités" },
      {
        type: "p",
        text: "Un bon magicien ne se contente pas de présenter des tours, il interagit avec le public. Cette interaction personnalisée crée un lien fort avec les invités, les impliquant directement dans le spectacle et rendant l'expérience plus immersive.",
      },
      { type: "h2", text: "5. Gestion professionnelle du temps" },
      {
        type: "p",
        text: "Un magicien expérimenté sait gérer le temps de son intervention pour s'intégrer parfaitement dans le déroulement de votre soirée. Il évite les longueurs et sait quand conclure pour laisser vos invités sur une impression positive.",
      },
      { type: "h2", text: "6. Capacité à improviser" },
      {
        type: "p",
        text: "Lors d'un événement, des imprévus peuvent survenir. Un magicien professionnel possède l'expérience nécessaire pour improviser et s'adapter rapidement, assurant ainsi que le spectacle continue sans accroc.",
      },
      { type: "h2", text: "7. Équipement et accessoires de qualité" },
      {
        type: "p",
        text: "Un magicien expérimenté utilise du matériel professionnel, souvent personnalisé, qui améliore la qualité visuelle et l'impact de ses tours. Cela contribue à rendre la prestation plus crédible et impressionnante.",
      },
      { type: "h2", text: "8. Réputation et références vérifiables" },
      {
        type: "p",
        text: "Engager un magicien avec une solide expérience signifie souvent pouvoir consulter des avis et des recommandations. Cela vous donne une garantie supplémentaire sur la qualité de la prestation et la satisfaction des précédents clients.",
      },
      { type: "h2", text: "9. Respect des attentes et des consignes" },
      {
        type: "p",
        text: "Un magicien professionnel comprend l'importance de respecter les consignes données par l'organisateur. Que ce soit sur le style de magie, la durée ou le ton, il s'adapte pour répondre précisément à vos besoins.",
      },
      { type: "h2", text: "10. Un souvenir durable pour vos invités" },
      {
        type: "p",
        text: "La magie laisse une trace durable dans la mémoire des participants. Un magicien expérimenté sait créer des moments forts qui seront racontés longtemps après la fin de la soirée, renforçant ainsi la réussite de votre événement.",
      },
      {
        type: "p",
        text: "Engager un magicien expérimenté pour votre soirée est un investissement qui garantit un divertissement de qualité, adapté à votre public et à vos attentes. Ce choix vous permet de créer une ambiance unique et de laisser un souvenir marquant à vos invités. Pour votre prochain événement, pensez à faire appel à un professionnel qui saura transformer votre soirée en un moment magique et inoubliable.",
      },
    ],
  },

  {
    slug: "magicien-effets-et-techniques-varies",
    titreSeo: "Choisir un magicien aux techniques variées",
    titre:
      "L'importance de choisir un magicien aux effets et techniques variés pour vos événements",
    chapo:
      "Choisir un artiste qui maîtrise une magie variée peut transformer une simple animation en une expérience mémorable.",
    date: "2025-07-14",
    dateLabel: "14 juillet",
    lecture: "3 min",
    categorie: "Conseils",
    cover: {
      src: "/images/site/site-salon-large.webp",
      alt: "Julien Lambert en prestation lors d'un événement",
    },
    blocks: [
      {
        type: "lead",
        text: "Engager un magicien pour un événement est une excellente idée pour surprendre et divertir vos invités. Mais tous les magiciens ne se valent pas. Choisir un artiste qui maîtrise une « magie variée » et des techniques différentes peut transformer une simple animation en une expérience mémorable.",
      },
      { type: "h2", text: "Offrir une expérience unique et captivante" },
      {
        type: "p",
        text: "Un magicien qui utilise une « magie variée » propose des effets diversifiés : illusions, tours de cartes, mentalisme, magie close-up, et parfois même des numéros plus spectaculaires. Cette diversité évite la monotonie et maintient l'attention du public tout au long du spectacle. Par exemple, un magicien qui commence par un tour de mentalisme, puis enchaîne avec de la magie close-up, capte mieux l'intérêt des invités que celui qui répète le même type de tour.",
      },
      {
        type: "p",
        text: "La magie close-up, réalisée à quelques centimètres des spectateurs, crée une proximité unique. Elle permet une interaction directe, rendant l'expérience plus personnelle et impressionnante. Un magicien qui maîtrise cette technique peut s'adapter à des petits groupes ou circuler parmi les invités, ce qui est idéal pour des cocktails ou des événements où la mobilité est importante.",
      },
      { type: "h2", text: "S'adapter à tous les types d'événements et de publics" },
      {
        type: "p",
        text: "Chaque événement a ses spécificités : mariage, anniversaire, soirée d'entreprise, ou fête privée. Un magicien aux techniques variées sait ajuster son spectacle en fonction du contexte et du public. Par exemple, lors d'un mariage, il privilégiera des tours élégants et légers, tandis qu'à une soirée d'entreprise, il pourra intégrer des effets plus interactifs et surprenants.",
      },
      {
        type: "p",
        text: "La capacité à varier les techniques permet aussi de toucher un public large, des enfants aux adultes, des amateurs de magie aux novices. Un magicien qui propose uniquement des tours de cartes risque de ne pas satisfaire tout le monde. En revanche, un artiste qui combine magie close-up, illusions visuelles et mentalisme offre une expérience riche et accessible à tous.",
      },
      { type: "h2", text: "Gérer les imprévus avec professionnalisme" },
      {
        type: "p",
        text: "Lors d'un événement, des imprévus peuvent survenir : changement de lieu, contraintes techniques, ou réactions inattendues du public. Un magicien qui maîtrise plusieurs techniques est plus à même de s'adapter rapidement. Par exemple, si l'espace est réduit, il pourra privilégier la magie close-up plutôt qu'un numéro nécessitant une grande scène.",
      },
      {
        type: "p",
        text: "Cette flexibilité est un gage de professionnalisme. Elle rassure les organisateurs qui savent que le spectacle ne sera pas compromis par des conditions défavorables. De plus, un magicien polyvalent peut personnaliser ses tours en fonction des réactions du public, ce qui rend chaque prestation unique.",
      },
      { type: "h2", text: "Valoriser l'investissement et garantir la satisfaction" },
      {
        type: "p",
        text: "Engager un magicien représente un investissement financier et émotionnel. Choisir un artiste qui propose une « magie variée » maximise la valeur de cet investissement. En effet, un spectacle diversifié captive mieux, crée des souvenirs durables et suscite des réactions enthousiastes.",
      },
      {
        type: "p",
        text: "Un magicien qui maîtrise la magie close-up et d'autres techniques peut aussi proposer des animations personnalisées, adaptées à vos invités. Par exemple, il peut organiser des ateliers interactifs ou des moments de magie rapprochée pendant les pauses, ce qui enrichit l'expérience globale.",
      },
      { type: "h2", text: "Comment choisir un magicien aux effets et techniques variés" },
      {
        type: "ul",
        items: [
          {
            strong: "Regardez des vidéos de ses prestations",
            text: "pour vérifier la diversité des tours et la qualité de l'interprétation.",
          },
          {
            strong: "Demandez des références ou avis clients",
            text: "pour connaître l'expérience d'autres organisateurs.",
          },
          {
            strong: "Privilégiez un magicien qui propose plusieurs types de magie",
            text: "notamment la magie close-up, le mentalisme, et des illusions visuelles.",
          },
          {
            strong: "Discutez de vos attentes et du contexte de l'événement",
            text: "pour qu'il puisse adapter son spectacle.",
          },
          {
            strong: "Vérifiez sa capacité à interagir avec le public",
            text: "et à gérer les imprévus.",
          },
        ],
      },
      {
        type: "p",
        text: "Un magicien polyvalent est souvent un professionnel expérimenté, capable de s'adapter à toutes les situations et de créer une ambiance magique sur mesure.",
      },
      { type: "h2", text: "Conclusion" },
      {
        type: "p",
        text: "Choisir un magicien qui maîtrise une « magie variée » et plusieurs techniques, dont la magie close-up, est essentiel pour garantir un spectacle vivant, surprenant et adapté à votre événement. Cette diversité permet de captiver tous les publics, de s'adapter aux contraintes du lieu, et d'offrir une expérience unique à vos invités.",
      },
    ],
  },

  {
    slug: "magie-close-up-briser-la-glace",
    titreSeo: "La magie close-up pour briser la glace",
    titre:
      "La magie en close-up : un atout pour animer votre soirée et briser la glace entre invités",
    chapo:
      "Lors d'un cocktail dinatoire, la magie close-up s'impose comme une animation idéale pour créer des échanges et détendre l'atmosphère.",
    date: "2025-07-14",
    dateLabel: "14 juillet",
    lecture: "3 min",
    categorie: "Close-up",
    cover: {
      src: "/images/site/site-closeup-hero.webp",
      alt: "Magie close-up pendant un cocktail",
    },
    blocks: [
      {
        type: "lead",
        text: "La magie en close-up transforme instantanément une soirée ordinaire en un moment mémorable. Lors d'un cocktail dinatoire, où les invités se déplacent librement, la magie close-up s'impose comme une animation idéale pour créer des échanges, susciter la curiosité et détendre l'atmosphère.",
      },
      { type: "h2", text: "La magie close-up, une animation qui capte l'attention" },
      {
        type: "p",
        text: "La magie en close-up se pratique à quelques centimètres des yeux des spectateurs. Cette proximité crée une expérience immersive et personnelle. Contrairement à un spectacle sur scène, le magicien circule parmi les invités, réalisant des tours de magie directement sous leurs yeux. Cette déambulation permet de toucher chaque groupe, de s'adapter à l'ambiance et de maintenir un rythme dynamique.",
      },
      {
        type: "p",
        text: "Ce type d'animation est particulièrement adapté aux cocktails dinatoires, où les invités ne restent pas assis longtemps. La magie close-up s'intègre naturellement dans ces moments de passage, offrant une pause ludique et surprenante. Les tours de cartes, pièces ou objets du quotidien deviennent des prétextes pour engager la conversation et créer des souvenirs communs.",
      },
      { type: "h2", text: "Briser la glace grâce à la magie" },
      {
        type: "p",
        text: "Lors d'une soirée, il n'est pas toujours facile de lancer la discussion entre inconnus. La magie close-up agit comme un catalyseur social. En attirant l'attention de plusieurs personnes autour d'un tour, le magicien crée un point de rassemblement spontané. Les invités partagent leur étonnement, rient ensemble et échangent leurs impressions.",
      },
      {
        type: "p",
        text: "Cette animation favorise aussi la curiosité et la complicité. Les spectateurs se posent des questions, cherchent à comprendre le secret, ce qui stimule les échanges. La magie devient un langage commun, un sujet léger qui facilite les premiers contacts. Pour les organisateurs, c'est un moyen efficace d'éviter les silences gênants et de dynamiser l'ambiance.",
      },
      { type: "h2", text: "Des exemples concrets d'utilisation réussie" },
      {
        type: "p",
        text: "Plusieurs événements ont tiré parti de la magie close-up pour renforcer l'expérience des invités. Par exemple, lors d'un cocktail dinatoire organisé pour un lancement de produit, un magicien a circulé parmi les participants, réalisant des tours personnalisés en lien avec le thème de la soirée. Cette approche a permis de créer un lien direct avec chaque invité, rendant l'événement plus convivial et mémorable.",
      },
      {
        type: "p",
        text: "Dans un autre cas, lors d'une soirée de networking, la magie en close-up a servi de brise-glace naturel. Les invités, souvent concentrés sur leurs cartes de visite, ont pu se détendre et engager des conversations autour des tours. Le magicien a ainsi facilité les échanges professionnels dans une ambiance plus décontractée.",
      },
      { type: "h2", text: "Comment choisir un magicien pour votre soirée" },
      {
        type: "ul",
        items: [
          {
            strong: "Vérifiez son expérience en déambulation",
            text: "un bon magicien close-up sait circuler naturellement parmi les invités sans interrompre le flux de la soirée.",
          },
          {
            strong: "Demandez des références ou des vidéos",
            text: "cela vous donnera une idée de son style et de sa capacité à captiver différents publics.",
          },
          {
            strong: "Précisez le type d'événement",
            text: "un cocktail dinatoire ne se gère pas comme une soirée assise, le magicien doit adapter ses tours et son rythme.",
          },
          {
            strong: "Discutez du matériel utilisé",
            text: "certains magiciens utilisent des objets personnalisés, ce qui peut renforcer l'impact de la magie.",
          },
          {
            strong: "Assurez-vous de la flexibilité",
            text: "la magie close-up doit pouvoir s'adapter à l'ambiance et aux réactions des invités.",
          },
        ],
      },
      { type: "h2", text: "Un investissement qui fait la différence" },
      {
        type: "p",
        text: "Intégrer la magie en close-up dans votre soirée, notamment lors d'un cocktail dinatoire, apporte une valeur ajoutée immédiate. Cette animation crée des moments d'émerveillement, stimule les échanges et rend votre événement unique. Les invités repartent avec des souvenirs positifs, ce qui renforce l'image de votre organisation ou de votre projet.",
      },
      {
        type: "p",
        text: "La magie close-up ne demande pas d'espace dédié ni de matériel complexe. Sa force réside dans la proximité et l'interaction directe. C'est un moyen simple et efficace de transformer une soirée en un moment vivant et chaleureux.",
      },
    ],
  },

  {
    slug: "detournement-attention-signaux-forts-et-faibles",
    titreSeo: "Le détournement d'attention expliqué",
    titre:
      "Le détournement d'attention : comment notre cerveau filtre les signaux forts et faibles",
    chapo:
      "Vous avez déjà vécu ce moment où vos yeux voient clairement quelque chose, mais votre cerveau ne l'enregistre pas ?",
    date: "2025-07-14",
    dateLabel: "14 juillet",
    lecture: "3 min",
    categorie: "Coulisses",
    cover: {
      src: "/images/site/site-salon-hero.webp",
      alt: "Gros plan sur une manipulation de cartes",
    },
    blocks: [
      {
        type: "lead",
        text: "Le détournement d'attention fascine autant qu'il intrigue. Vous avez déjà vécu ce moment où vos yeux voient clairement quelque chose, mais votre cerveau ne l'enregistre pas ? Ce phénomène est au cœur de la magie, notamment la magie close-up, où le magicien manipule habilement votre attention pour créer l'illusion.",
      },
      { type: "h2", text: "Comment le cerveau traite les informations visuelles" },
      {
        type: "p",
        text: "Notre cerveau reçoit en permanence une multitude d'informations sensorielles. Pourtant, il ne peut pas tout traiter en même temps. Il doit donc choisir ce qui mérite notre attention. Ce choix repose sur la distinction entre signaux forts et signaux faibles.",
      },
      {
        type: "ul",
        items: [
          {
            strong: "Signaux forts",
            text: "des stimuli saillants, souvent liés à un mouvement, une couleur vive, un son fort ou une émotion intense. Ils attirent naturellement notre attention.",
          },
          {
            strong: "Signaux faibles",
            text: "des détails subtils, souvent statiques ou peu contrastés, que notre cerveau peut facilement ignorer.",
          },
        ],
      },
      {
        type: "p",
        text: "Dans la vie quotidienne, ce mécanisme nous protège de la surcharge d'informations. Par exemple, en marchant dans la rue, vous ne remarquez pas chaque détail du trottoir, mais vous captez immédiatement une voiture qui approche.",
      },
      { type: "h2", text: "Le rôle du détournement d'attention dans la magie" },
      {
        type: "p",
        text: "Le détournement d'attention est une technique qui exploite cette capacité du cerveau à filtrer les informations. Le magicien crée un signal fort pour capter votre regard et votre esprit, tandis que l'action clé du tour se déroule dans un signal faible que vous ne percevez pas consciemment.",
      },
      {
        type: "p",
        text: "Prenons un exemple simple en magie close-up : le magicien vous montre une pièce brillante qu'il fait tourner entre ses doigts. Ce mouvement rapide et lumineux devient un signal fort qui attire toute votre attention. Pendant ce temps, il déplace discrètement une autre pièce hors de votre vue. Votre cerveau enregistre la pièce brillante, mais ignore le déplacement subtil, ce qui crée l'illusion.",
      },
      { type: "h2", text: "Pourquoi vos yeux voient mais votre cerveau n'enregistre pas" },
      {
        type: "p",
        text: "Ce phénomène s'appelle souvent cécité attentionnelle. Même si vos yeux captent une image, votre cerveau ne la traite pas si elle ne correspond pas à ce que vous attendez ou si votre attention est focalisée ailleurs.",
      },
      {
        type: "p",
        text: "Des études en psychologie cognitive montrent que lorsque l'attention est dirigée vers un objet ou une tâche précise, les autres stimuli, même visibles, sont ignorés. Cela explique pourquoi dans un spectacle de magie, vous pouvez être complètement surpris par un changement ou une disparition d'objet que vous avez pourtant vu.",
      },
      { type: "h2", text: "Comment le magicien maîtrise le détournement d'attention" },
      {
        type: "ul",
        items: [
          {
            strong: "Gestes amples et expressifs",
            text: "ils créent des signaux forts qui captent le regard.",
          },
          {
            strong: "Mouvements rapides",
            text: "ils attirent l'attention sur une zone précise.",
          },
          {
            strong: "Narration et humour",
            text: "ils focalisent votre esprit sur l'histoire plutôt que sur les gestes.",
          },
          {
            strong: "Utilisation de la lumière et des couleurs",
            text: "ces éléments renforcent les signaux forts.",
          },
        ],
      },
      {
        type: "p",
        text: "Ces techniques combinées permettent au magicien de contrôler ce que vous voyez consciemment et ce que vous ignorez, rendant la magie encore plus impressionnante.",
      },
      { type: "h2", text: "Le cerveau, un filtre puissant mais faillible" },
      {
        type: "p",
        text: "Le détournement d'attention montre que notre cerveau est un filtre puissant, mais pas infaillible. Il choisit ce qui semble important, mais cette sélection peut être exploitée. La magie repose sur cette faille pour créer des expériences étonnantes.",
      },
      {
        type: "quote",
        text: "La prochaine fois que vous assisterez à un tour de magie, souvenez-vous que ce que vous ne voyez pas est souvent plus important que ce que vous voyez.",
      },
      {
        type: "p",
        text: "Le cerveau fait le tri, mais le magicien joue avec ce tri pour vous émerveiller.",
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

/** Les 3 articles les plus récents, hors article courant. */
export function articlesLies(slug?: string, n = 3) {
  return articles.filter((a) => a.slug !== slug).slice(0, n);
}
