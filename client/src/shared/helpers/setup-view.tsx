import React from 'react';
import ReactDOM, { Root } from 'react-dom/client';
import PrimeReact from 'primereact/api';

const root: Root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

export function setupPrimeReact(): void {
  PrimeReact.ripple = true;
}

export function render(component: React.ReactNode): void {
  root.render(
    <React.StrictMode>
      { component }
    </React.StrictMode>
  );
}
