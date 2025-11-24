import { type PaletteOptions } from "@mui/material/styles";

export const lightPalette: PaletteOptions = {
  mode: "light",
  primary: {
    main: "#7B2CBF",
  },
  secondary: {
    main: "#0077B6",
  },
  background: {
    default: "#F5F7FA",
    paper: "#FFFFFF",
  },
  text: {
    primary: "#1A1A1A",
    secondary: "#555555",
  },
};

export const darkPalette: PaletteOptions = {
  mode: "dark",
  primary: {
    main: "#9D4EDD",
  },
  secondary: {
    main: "#00D4FF",
  },
  background: {
    default: "#1A1A1A",
    paper: "#222222",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#BEBEBE",
  },
};
