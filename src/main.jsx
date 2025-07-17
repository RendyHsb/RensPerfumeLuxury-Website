// src/main.jsx
// Titik masuk utama aplikasi React.
// File ini bertanggung jawab untuk me-render komponen App ke dalam DOM.

import React from 'react'; 
import ReactDOM from 'react-dom/client'; 
import App from './App.jsx'; 
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      {/* Komponen <App /> adalah komponen utama yang kita render. */}
      {/* Semua logika dan UI aplikasi kita dimulai dari sini. */}
      <App />
    </React.StrictMode>,
  );
} else {
  console.error('Element with ID "root" not found in index.html. React app cannot be mounted.');
}
