import 'primereact/resources/themes/mira/theme.css';
import 'view/styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import PrimeReact from 'primereact/api';

export function renderApp(): void {
  PrimeReact.ripple = true;

  ReactDOM
    .createRoot(document.getElementById('root') as HTMLElement)
    .render(
      <React.StrictMode></React.StrictMode>,
    );
}
