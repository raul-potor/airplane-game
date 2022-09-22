import { extendTheme } from "@chakra-ui/react";

const breakpoints = {
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
};

const colors = {
  electricViolet: "#9106DB",
  purple: "#6602CE",
};

export const theme = extendTheme({
  breakpoints,
  colors,
  fonts: {
    heading: `Poppins`,
    body: `Poppins`,
  },
});
