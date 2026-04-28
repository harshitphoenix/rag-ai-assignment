import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
/* Bootstrap must load after Tailwind entry CSS so PostCSS does not drop its rules. */
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { registerSW } from './services/notifications';

registerSW();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
