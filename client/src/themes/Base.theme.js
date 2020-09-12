// Based on https://github.com/system-ui/theme-ui/blob/537d64a54dc77356efe2a0c23e46f78dc932e3e9/packages/preset-bootstrap/src/index.js
// Preset Bootstrap

export const baseColors = {
  white: "#fff",
  black: "#000",
  gray: [
    "#fff", // 0 index
    "#f8f9fa",
    "#e9ecef",
    "#dee2e6",
    "#ced4da",
    "#adb5bd",
    "#6c757d",
    "#495057",
    "#343a40",
    "#212529",
  ],
  blue: "#007bff",
  indigo: "#6610f2",
  purple: "#6f42c1",
  pink: "#e83e8c",
  red: "#dc3545",
  orange: "#fd7e14",
  yellow: "#ffc107",
  green: "#28a745",
  teal: "#20c997",
  cyan: "#17a2b8",
  // gray: gray[6],
};

export const colors = {
  ...baseColors,
  grayDark: baseColors.gray[8],
  text: baseColors.gray[9],
  background: baseColors.white,
  primary: baseColors.purple,
  secondary: baseColors.gray[6],
  muted: baseColors.gray[3],
  success: baseColors.green,
  info: baseColors.cyan,
  warning: baseColors.yellow,
  danger: baseColors.red,
  light: baseColors.gray[1],
  dark: baseColors.gray[8],
  textMuted: baseColors.gray[6],
  modes: {
    dark: {
      text: "#fff",
      background: "#000",
      primary: "#0cf",
      secondary: "#09c",
      muted: "#111",
    },
    papaya: {
      // this color mode will fallback to the root color object
      // for values not defined here
      text: "#433",
      background: "papayawhip",
    },
  },
};

export const space = [0, 0.25, 0.5, 1, 1.5, 3].map(n => n + "rem");

export const breakpoints = ["576px", "768px", "992px", "1200px"];

export const fonts = {
  body:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  heading: "inherit",
  monospace:
    'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
};
fonts.sans = fonts.body;

export const fontWeights = {
  body: 400,
  heading: 500,
  bold: 700,
  light: 300,
};
fontWeights.normal = fontWeights.body;
fontWeights.display = fontWeights.light;

export const fontSizes = [
  "0.75rem", // '80%',
  "0.875rem",
  "1rem",
  "1.25rem",
  "1.5rem",
  "1.75rem",
  "2rem",
  "2.5rem",
  "3.5rem",
  "4.5rem",
  "5.5rem",
  "6rem",
];
fontSizes.lead = fontSizes[3];

export const lineHeights = {
  body: 1.5,
  heading: 1.2,
};

export const sizes = {
  // container widths
  sm: 540,
  md: 720,
  lg: 960,
  xl: 1140,
  sidebar: 256,
  avatar: 48,
  logo: 48,
  menu: 48,
};

export const radii = {
  default: "0.25rem",
  sm: "0.2rem",
  lg: "0.3rem",
  pill: "50rem",
};

export const shadows = {
  default: "0 .5rem 1rem rgba(0, 0, 0, .15)",
  sm: "0 .125rem .25rem rgba(0, 0, 0, .075)",
  lg: "0 1rem 3rem rgba(0, 0, 0, .175)",
};

const heading = {
  fontFamily: "heading",
  fontWeight: "heading",
  lineHeight: "heading",
  mt: 0,
  mb: 2,
};
const display = {
  fontWeight: "display",
  lineHeight: "heading",
};

// variants
const typeStyles = {
  heading,
  display,
};

const link = {
  color: "primary",
  textDecoration: "none",
  ":hover": {
    textDecoration: "underline",
  },
};

export const styles = {
  root: {
    fontFamily: "body",
    lineHeight: "body",
    fontWeight: "body",
  },
  a: {
    ...link,
  },
  nav: {
    ...link,
    color: "inherit",
    fontWeight: "bold",
    display: "inline-block",
    "&:hover, &:focus, &.active": {
      color: "primary",
    },
  },
  p: {
    mb: 3,
    lineHeight: "body",
  },
  h1: {
    ...heading,
    fontSize: 7,
  },
  h2: {
    ...heading,
    fontSize: 6,
  },
  h3: {
    ...heading,
    fontSize: 5,
  },
  h4: {
    ...heading,
    fontSize: 4,
  },
  h5: {
    ...heading,
    fontSize: 3,
  },
  h6: {
    ...heading,
    fontSize: 2,
  },
  blockquote: {
    fontSize: 3,
    mb: 3,
  },
  table: {
    // todo
    width: "100%",
    marginBottom: 3,
    color: "gray.9",
    borderCollapse: "collapse",
  },
  th: {
    verticalAlign: "bottom",
    borderTopWidth: 2,
    borderTopStyle: "solid",
    borderTopColor: "gray.3",
    borderBottomWidth: 2,
    borderBottomStyle: "solid",
    borderBottomColor: "gray.3",
    padding: ".75rem",
    textAlign: "inherit",
  },
  td: {
    borderBottomWidth: 2,
    borderBottomStyle: "solid",
    borderBottomColor: "gray.3",
    verticalAlign: "top",
    padding: ".75rem",
  },
  inlineCode: {
    color: "pink",
  },
  img: {
    maxWidth: "100%",
    height: "auto",
  },
};

export const custom = {
  layout: {
    centerflex: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flex: "1 1 auto",
      height: "100%",
      flexDirection: "column",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    flex: {
      display: "flex",
    },
  },
  links: {
    bold: {
      fontWeight: "bold",
    },
    nav: {
      fontWeight: "bold",
      p: 2,
      color: "inherit",
      textDecoration: "none",
      // ":hover,.active": {
      ":hover,.active": {
        color: "secondary",
      },
    },
  },
  cards: {
    primary: {
      p: 2,
      borderRadius: "default",
      boxShadow: "default",
    },
  },
  buttons: {
    primary: {
      fontSize: 2,
      fontWeight: "bold",
      color: "background",
      bg: "primary",
      borderRadius: "default",
    },
    outline: {
      variant: "buttons.primary",
      color: "primary",
      bg: "transparent",
      boxShadow: "inset 0 0 2px",
      ":hover,:focus,.active": {
        bg: "primary",
        color: "white",
      },
    },
    secondary: {
      variant: "buttons.primary",
      color: "background",
      bg: "secondary",
    },
    nav: {
      variant: "buttons.outline",
      // width: "menu",
    },
    logo: {
      variant: "buttons.icon",
      borderRadius: "0",
      width: "logo",
      padding: "0",
    },
  },
  images: {
    avatar: {
      borderRadius: "100%",
    },
    logo: {
      width: "avatar",
    },
    menu: {
      width: "menu",
    },
  },
};

export const theme = {
  breakpoints,
  colors,
  space,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  sizes,
  shadows,
  radii,
  typeStyles,
  styles,
  ...custom,
};

export default theme;
