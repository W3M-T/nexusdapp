import { extendTheme } from "@chakra-ui/react";

export const breakpoints = {
  sm: "320px",
  lsm: "515px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1560px",
};

export const customColors = {
  color2: {
    lighter: "#59a1ea",
    base: "#3C91E6",
    darker: "#1c7bda",
  },
  color1: {
    lighter: "#b0dd49",
    base: "#A2D729",
    darker: "#8ab722",
  },
  color3: {
    lighter: "#fb9567",
    base: "#FA824C",
    darker: "#f9611c",
  },
  myCustomColor: {
    lighter: "#1c0f3a",
    base: "#110a2b",
    darker: "#090225",
  },
};

export const customSizes = {
  loginButton: {
    sm: "220px",
    lg: "230px"
  },
  logoIcon: {
    sm: "40px",
    lg: "55px"
  },
};

export const theme = extendTheme({
  breakpoints,
  styles: {
    global: {
      body: {
        minHeight: "100vh",
        overflowX: "hidden",
        bgGradient:
          "linear-gradient(180deg, rgba(9,2,38,1) 0%, rgba(5,0,14,1) 100%);",
        bgSize: "700px",
        backgroundPositionX: "150px",
        color: "gray.200",
        fontSize: "14px",
      },
      "*": {
        "&::-webkit-scrollbar": {
          width: 1.5,
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "dappTemplate.dark.base",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "dappTemplate.light",
          borderRadius: 1.5,
        },
        scrollbarWidth: "auto",
        scrollbarColor: "dappTemplate.light dappTemplate.dark.base",
      },
    },
  },
  fonts: {
    heading: "Poppins, sans-serif",
    body: "Poppins, sans-serif",
  },
  colors: {
    dappTemplate: {
      bgStripes: "#2c3440",
      shadowColor: "#141414",
      dark: {
        lighter: "#3c4757",
        base: "#222831",
        darker: "#010711",
      },
      light: "#FAFFFD",
      white: "#ffffff",
      color1: customColors.color1,
      color2: customColors.color2,
      color3: customColors.color3,
    },
  },
  components: {
    Alert: {
      variants: {
        subtle: {
          container: {
            bg: "dappTemplate.dark.lighter",
          },
        },
      },
    },
  },
});
