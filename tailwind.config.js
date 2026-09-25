/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    // Only apply `hover:` styles on devices that can actually hover
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    extend: {
      colors: {
        /** Deep ink surfaces — layered from page background up to raised cards */
        ink: {
          950: "#070709",
          900: "#0b0b0f",
          850: "#101015",
          800: "#15151b",
          700: "#1d1d25",
        },
        primary: "#0b0b0f",
        secondary: "#15151b",
        /** Matches the dot in the logo */
        accent: "#F13024",
        /** Button fill: white text on this passes WCAG AA (4.9:1); #F13024 is 4.2:1 */
        "accent-strong": "#D92A1E",
      },
      maxWidth: {
        content: "1200px",
      },
      animation: {
        "spin-slow": "spin 6s linear infinite",
        marquee: "marquee 40s linear infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "pulse-dot": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(52, 211, 153, 0.55)" },
          "50%": { boxShadow: "0 0 0 6px rgba(52, 211, 153, 0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      fontFamily: {
        sans: [`var(--font-geist)`, "ui-sans-serif", "system-ui", "sans-serif"],
        mono: [`var(--font-geist-mono)`, "ui-monospace", "monospace"],
        serif: [`var(--font-serif)`, "ui-serif", "Georgia", "serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
