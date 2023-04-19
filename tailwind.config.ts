import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      light: "#F5F5F5",
      primary: "#FAA916",
      dark: "#171717",
      grey: "#8E8E8E",
      "semi-dark": "#1343434",
    },
    fontFamily: {
      display: "var(--display-font)",
      body: "var(--body-font)",
    },
  },
  plugins: [],
} satisfies Config;
