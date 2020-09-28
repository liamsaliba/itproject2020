/** @jsx jsx */
import { addDecorator } from '@storybook/react';

import { jsx, ThemeProvider } from 'theme-ui';
import themes from "../src/themes";

const theme = themes.custom;

addDecorator(storyFn => (
  <ThemeProvider theme={theme}>
    {storyFn()}
  </ThemeProvider>
));
/* 
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
} */