/** @jsx jsx */
import { addDecorator, addParameters } from '@storybook/react';

import themes from "../src/themes";
import { withThemeProvider } from 'storybook-addon-theme-ui'
import 'semantic-ui-css/semantic.min.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import 'react-datepicker/dist/react-datepicker.css';

// ===== For React-Redux ===== 
import { Provider } from "react-redux" //'./Provider.js'
import configureStore from '../src/store/configureStore.js';
import { jsx } from 'theme-ui';

const store = configureStore();

const WithProvider = ({ story }) => (
  <Provider store={store}>
      { story() }
  </Provider>
);

addDecorator(withThemeProvider)
addDecorator(story => (
    <WithProvider story={story}/>
  )
)




export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

addParameters({
  themeUi: {
    themes: Object.keys(themes).map(key => ({theme: themes[key], name: key}))
  }
})