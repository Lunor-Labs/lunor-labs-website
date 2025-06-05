import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom'; // 👈 Added for GitHub Pages routing
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter> {/* 👈 Wrap App in HashRouter */}
      <App />
    </HashRouter>
  </StrictMode>
);
