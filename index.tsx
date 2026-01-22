import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css'; 

const rootElement = document.getElementById('root');

<<<<<<< HEAD
try {
  if (!rootElement) {
    throw new Error('Failed to find the root element with id "root".');
  }
  console.log('Mounting React app...');
  const root = createRoot(rootElement as Element);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('App mounted successfully');
} catch (err) {
  // Log runtime mounting errors so they appear in the dev server console
  console.error('React mount error:', err);
  // Show an in-DOM error message for easy debugging in the browser
  if (rootElement) {
    rootElement.innerHTML = `<div style="padding:24px;font-family:Inter,Arial,Helvetica,sans-serif;color:#b91c1c;background:#fff7f7;">React mount error: ${String(err).replace(/</g, '&lt;')}</div>`;
  }
}
=======
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
>>>>>>> fe4aa64423e6a4921a865a7b40f16f8c9bc5263c
