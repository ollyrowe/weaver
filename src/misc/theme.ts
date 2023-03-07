import { getContext, setContext } from "svelte";
import { colors } from "./constants";
import { flattenObject } from "../utils/flattenObject";
import type { ValueOrNestedObject } from "./types";

const lightTheme: Theme = {
  background: colors.white,
  text: {
    default: colors.black,
    contrast: colors.white,
  },
  border: colors.grey.lightest,
  green: {
    light: colors.green.light,
    default: colors.green.dark,
  },
  active: colors.grey.dark,
  grey: colors.grey.lightest,
};

const darkTheme: Theme = {
  background: colors.grey.darkest,
  text: {
    default: colors.white,
    contrast: colors.black,
  },
  border: colors.grey.dark,
  green: {
    light: colors.green.default,
    default: colors.green.dark,
  },
  active: colors.grey.default,
  grey: colors.grey.light,
};

interface Theme extends ValueOrNestedObject<string> {
  background: string;
  text: {
    default: string;
    contrast: string;
  };
  border: string;
  green: {
    light: string;
    default: string;
  };
  active: string;
  grey: string;
}

export const getTheme = (): Theme => {
  return getContext(key);
};

export const setTheme = (theme: Theme) => {
  setContext(key, theme);
};

export const initialiseTheme = () => {
  // Whether the dark theme is enabled on the user's device
  const darkSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

  // Select the default theme based on user preference
  const preferredTheme = darkSchemeQuery.matches ? darkTheme : lightTheme;

  // Set the default theme
  setTheme(preferredTheme);
};

// Key to the theme context
const key = Symbol();

const createCssVariables = (theme: Theme) => {
  const flattenedObject = flattenObject(theme, "-");

  return Object.entries(flattenedObject).map(([name, value]) => {
    return `--${name}: ${value};`;
  });
};

export const createStyleTemplate = () => {
  const theme = getTheme();

  const cssVariables = createCssVariables(theme);

  return `
    <style type="text/css">
      :root {
        ${cssVariables.join("\n        ")}
      }
    </style>
  `;
};
