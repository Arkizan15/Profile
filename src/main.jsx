import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Import CSS dan App. Pastikan file index.css dan App.jsx berada di folder yang sama (src)
import './index.css'
import App from './App.jsx'

/**
 * File: main.jsx
 * Berfungsi sebagai titik masuk (entry point) aplikasi React.
 * Menghubungkan komponen App ke elemen HTML dengan id 'root'.
 */

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  // Pesan bantuan jika elemen root tidak ditemukan
  console.error(
    "Error: Elemen dengan id 'root' tidak ditemukan di index.html. " +
    "Pastikan kamu memiliki <div id='root'></div> di dalam body file index.html kamu."
  );
}