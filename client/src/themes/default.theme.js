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
};

export const colors = {
  text: baseColors.gray[9],
  background: baseColors.white,
  primary: baseColors.purple,
  secondary: baseColors.gray[6],
  muted: baseColors.gray[3],
  // success: baseColors.green,
  // info: baseColors.cyan,
  // warning: baseColors.yellow,
  // danger: baseColors.red,
  // light: baseColors.gray[1],
  // dark: baseColors.gray[8],
  // textMuted: baseColors.gray[6],
};

const fonts = {
  body:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  heading: "inherit",
  monospace:
    'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
};
fonts.sans = fonts.body;

export const def = {
  fonts,
  colors,
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
};

export default def;
