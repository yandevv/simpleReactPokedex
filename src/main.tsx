import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router';

import './index.css';

import App from './pages/Home/Home.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
          <Route index element={<App />}></Route>
        </Routes>
    </BrowserRouter>
  </StrictMode>
);