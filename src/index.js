import React from 'react';
import ReactDOM from 'react-dom';

import './i18n';
import './assets/tailwind/tailwind.css';
import './index.css';

import * as serviceWorker from './serviceWorker';
import { AppProvider } from './context/AppContext';
import { PageProvider } from './context/PageContext';
import App from './components/App/App';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <PageProvider>
        <App />
      </PageProvider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.register();
