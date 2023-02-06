import 'primereact/resources/themes/mira/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'view/styles/main.scss';

import React from 'react';
import ReactDOM, { Root } from 'react-dom/client';
import PrimeReact from 'primereact/api';

const root: Root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

export async function renderLoader(): Promise<void> {
  const { AppLoader } = await import('view/components/AppLoader');

  render(<AppLoader />);
}

export function renderApp(): void {
  PrimeReact.ripple = true;

  render(<div>Hello world!</div>);
}

function render(component: React.ReactNode): void {
  root.render(
    <React.StrictMode>
      { component }
    </React.StrictMode>,
  );
}
