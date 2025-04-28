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
import AreaInfo from './pages/AreaInfo/AreaInfo.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
          {/* Pokemons Pages */}
          <Route index element={<AllPokemons />}></Route>
          <Route path="/pokemon/:id" element={<PokemonInfo />}></Route>

          {/* Locations Pages */}
          <Route path="/locations" element={<Locations />}></Route>

          {/* Locations Pages */}
          <Route path="/area/:name" element={<AreaInfo />}></Route>
        </Routes>
    </BrowserRouter>
  </StrictMode>
);