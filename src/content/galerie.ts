/**
 * Galerie photo : toutes les images proviennent de l'ancien site,
 * ré-encodées en WebP (voir scripts/optimize-images.mjs).
 * Les dimensions réelles sont nécessaires pour la mosaïque et pour
 * éviter tout décalage de mise en page (CLS).
 */

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export const photos: Photo[] = [
  {
    src: "/images/galerie/gal-09.webp",
    width: 1800,
    height: 2700,
    alt: "Tour de cartes pendant le vin d'honneur, la mariée observe de près",
  },
  {
    src: "/images/galerie/gal-15.webp",
    width: 1800,
    height: 958,
    alt: "Un groupe d'invités stupéfait pendant un tour de close-up en extérieur",
  },
  {
    src: "/images/galerie/gal-01.webp",
    width: 1600,
    height: 1066,
    alt: "Julien Lambert présente un tour de cartes à des invités",
  },
  {
    src: "/images/galerie/gal-03.webp",
    width: 1800,
    height: 2705,
    alt: "Magie rapprochée entre les mains d'une spectatrice",
  },
  {
    src: "/images/galerie/gal-04.webp",
    width: 1600,
    height: 1066,
    alt: "Réactions d'un groupe pendant une prestation de close-up",
  },
  {
    src: "/images/galerie/gal-08.webp",
    width: 1800,
    height: 2705,
    alt: "Julien Lambert en pleine manipulation de cartes",
  },
  {
    src: "/images/galerie/gal-16.webp",
    width: 1800,
    height: 784,
    alt: "Instant de surprise capté pendant une soirée",
  },
  {
    src: "/images/galerie/gal-05.webp",
    width: 1066,
    height: 1600,
    alt: "Un invité participe à un tour de magie",
  },
  {
    src: "/images/galerie/gal-10.webp",
    width: 1800,
    height: 2705,
    alt: "Magie de proximité pendant un cocktail de mariage",
  },
  {
    src: "/images/galerie/gal-12.webp",
    width: 1800,
    height: 1200,
    alt: "Julien Lambert entouré d'invités pendant une prestation",
  },
  {
    src: "/images/galerie/gal-06.webp",
    width: 1600,
    height: 1066,
    alt: "Sourires et étonnement autour d'un tour de cartes",
  },
  {
    src: "/images/galerie/gal-11.webp",
    width: 1800,
    height: 2705,
    alt: "Un tour de magie se déroule dans les mains d'une spectatrice",
  },
  {
    src: "/images/galerie/gal-17.webp",
    width: 1636,
    height: 852,
    alt: "Public captivé pendant un spectacle de magie de salon",
  },
  {
    src: "/images/galerie/gal-13.webp",
    width: 1800,
    height: 2700,
    alt: "Julien Lambert présente un effet à un petit groupe",
  },
  {
    src: "/images/galerie/gal-02.webp",
    width: 1600,
    height: 1066,
    alt: "Magie close-up pendant une soirée d'entreprise",
  },
  {
    src: "/images/galerie/gal-14.webp",
    width: 1800,
    height: 2705,
    alt: "Effet de magie rapprochée devant des invités attentifs",
  },
  {
    src: "/images/galerie/gal-20.webp",
    width: 1800,
    height: 1202,
    alt: "Ambiance de soirée pendant une prestation de magie",
  },
  {
    src: "/images/galerie/gal-07.webp",
    width: 1600,
    height: 1066,
    alt: "Julien Lambert échange avec les invités entre deux tours",
  },
  {
    src: "/images/galerie/gal-19.webp",
    width: 1800,
    height: 2695,
    alt: "Manipulation de cartes en gros plan",
  },
  {
    src: "/images/galerie/gal-18.webp",
    width: 1800,
    height: 861,
    alt: "Moment de complicité entre le magicien et son public",
  },
  {
    src: "/images/galerie/gal-22.webp",
    width: 1800,
    height: 1202,
    alt: "Prestation de magie pendant un événement en extérieur",
  },
  {
    src: "/images/galerie/gal-21.webp",
    width: 1800,
    height: 783,
    alt: "Le public retient son souffle pendant la révélation",
  },
  {
    src: "/images/galerie/gal-23.webp",
    width: 1800,
    height: 1202,
    alt: "Julien Lambert pendant une prestation de close-up",
  },
  {
    src: "/images/galerie/gal-24.webp",
    width: 1800,
    height: 785,
    alt: "Instant de magie partagé avec les invités",
  },
];
