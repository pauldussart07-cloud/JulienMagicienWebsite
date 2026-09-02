import type { Config } from "tailwindcss";

/**
 * Design system « Encre & Carton ».
 *
 * Toute la palette vient de l'objet que Julien tient en main : une carte à
 * jouer. L'encre est le bleu de sa signature poussé au plus profond, le carton
 * est l'ivoire réel d'un jeu de cartes, le carmin est le rouge d'un dos de
 * carte. Le laiton n'est jamais un dégradé : uniquement des filets et des
 * repères de quelques pixels.
 */
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        encre: {
          DEFAULT: "#0C0722",
          900: "#080418", // fond le plus profond
          800: "#0C0722", // fond courant
          700: "#100A31",
          600: "#130949", // bleu exact de la signature
          500: "#1B1060",
          400: "#2C1F72",
        },
        carton: {
          DEFAULT: "#EFEAE0", // ivoire d'une carte à jouer
          200: "#E4DDD0",
          300: "#D2C9B8",
          400: "#A79C89",
          500: "#7C7263",
        },
        laiton: {
          DEFAULT: "#C79A4B",
          300: "#DFBE7E",
          600: "#9A7331",
        },
        carmin: "#B3122E",
        fumee: {
          DEFAULT: "#8B8598",
          600: "#6B6580",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      // Aucun rayon par défaut : les panneaux photo sont à angles vifs.
      borderRadius: { none: "0", full: "9999px" },
      maxWidth: {
        prose: "62ch",
        lede: "44ch",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        drift: {
          "0%,100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-10px,0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.3s cubic-bezier(0.32,0.72,0,1)",
        "accordion-up": "accordion-up 0.26s cubic-bezier(0.32,0.72,0,1)",
        drift: "drift 9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
