import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router';

import './index.css';

import AllPokemons from './pages/AllPokemons/AllPokemons.tsx';
import PokemonInfo from './pages/PokemonInfo/PokemonInfo.tsx';
import Locations from './pages/Locations/Locations.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
          {/* Pokemons Pages */}
          <Route index element={<AllPokemons />}></Route>
          <Route path="/pokemon/:id" element={<PokemonInfo />}></Route>

          {/* Locations Pages */}
          <Route path="/locations" element={<Locations />}></Route>
        </Routes>
    </BrowserRouter>
  </StrictMode>
);