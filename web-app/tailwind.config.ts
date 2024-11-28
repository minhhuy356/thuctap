import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {},
      filter: {
        "brightness-50": "brightness(50%)",
        "brightness-75": "brightness(75%)",
        "brightness-90": "brightness(90%)",
        "brightness-100": "brightness(100%)",
      },
      boxShadow: {
        "custom-pink-shadow":
          "0 8px 15px -2px rgba(255, 105, 180, 0.5), 0 4px 10px -1px rgba(255, 105, 180, 0.3)",
      },
      transitionDuration: {
        400: "400ms",
        300: "300ms",
        200: "200ms",
      },
      transitionTimingFunction: {
        custom: "cubic-bezier(0.645, 0.045, 0.355, 1)",
      },
      backgroundColor: {
        "regal-blue": "rgb(235, 243, 255,1)",
      },
      textColor: {
        "primary-blue": "#1677ff",
      },
      fontFamily: {
        sans: ['"Open Sans"', "sans-serif"],
        popins: [
          "Poppins",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
        ],
      },
      keyframes: {
        boxShadowEffect: {
          "0%": { boxShadow: "0 0 0px 0px #4db2ecfa" },
          "75%": { boxShadow: "0 0 0px 16px rgba(247, 146, 39, 0)" },
          "100%": { boxShadow: "0 0 0px 0px rgba(247, 146, 39, 0)" },
        },
      },
      animation: {
        boxShadowEffect: "boxShadowEffect 3s infinite",
      },
      screens: {
        sm0: { min: "540px" },
        sm: { min: "767px" },
        md: { min: "826px" },
        md1: { min: "900px" },
        lg0: { min: "1000px" },
        lg1: { min: "1100px" },
        lg: { min: "1140px" },
        lg2: { min: "1267px" },
        xl: { min: "1920px" },
      },
    },
  },
  plugins: [],
};
export default config;
