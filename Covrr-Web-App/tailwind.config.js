/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // Ensure this line is present
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideOut: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
        slideInTop: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideOutTop: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-100%)", opacity: "0" },
        },
        slideInBottom: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideOutBottom: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        slideIn: "slideIn 0.5s ease-in-out forwards",
        slideOut: "slideOut 0.5s ease-in-out forwards",
        slideInTop: "slideInTop 0.5s ease-in-out forwards",
        slideOutTop: "slideOutTop 0.5s ease-in-out forwards",
        slideInBottom: "slideInBottom 0.5s ease-in-out forwards",
        slideOutBottom: "slideOutBottom 0.5s ease-in-out forwards",
        fadeIn: "fadeIn 0.5s ease-in-out forwards",
        fadeOut: "fadeOut 0.5s ease-in-out forwards",
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        card: "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
      },
      backgroundImage: {
        gradient1: 'var(--gradientBottom)',
        gradient2: 'var(--gradientSide)',
      },
      colors: {
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        bodyBackground: "var(--body-background)",
        SidebarBackground: "var(--sidebar-background)",
        cardBackground: "var(--card-background)",
        inputBackground: "var(--inputBackground)",
        inputDisabled: "var(--inputDisabled)",
        text1: "var(--text1)",
        text2: "var(--text2)",
        text3: "var(--text3)",
        text4: "var(--text4)",
        text5: "var(--text5)",
        border: "var(--border)",
        border2: "var(--border1)",
        disabled: "var(--disabled)",
        muted1: "var(--muted1)",
        muted2: "var(--muted2)",
        muted3: "var(--muted3)",
        plainWhite: "var(--white)",
        themeBlue: "hsl(var(--blue))",
        themeRed: "hsl(var(--red))",
        themeGreen: "hsl(var(--green))",
        themeYellow: "hsl(var(--yellow))",
        scrollbarThump: "var(--scrollbarThump)",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
      "4k": "2560px",
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
