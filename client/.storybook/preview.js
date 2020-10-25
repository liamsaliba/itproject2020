/** @jsx jsx */
import { addDecorator, addParameters } from '@storybook/react';

import themes from "../src/themes";

import { withThemeProvider } from 'storybook-addon-theme-ui'
import 'semantic-ui-css/semantic.min.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import 'react-datepicker/dist/react-datepicker.css';


addDecorator(withThemeProvider)


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

addParameters({
  themeUi: {
    themes: Object.keys(themes).map(key => ({theme: themes[key], name: key}))
  }
})