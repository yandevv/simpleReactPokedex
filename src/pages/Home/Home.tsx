import { FormEvent, useEffect, useState } from 'react';

import './Home.css';

import PokemonCard from '../../components/PokemonCard';

interface PokemonInfoInterface {
  name: string,
  id: number,
  weight: number,
  height: number,
  sprite: string
}

function App() {
  const [inputPokemonName, setInputPokemonName] = useState<string>();
  const [allPokemonsInfo, setAllPokemonsInfo] = useState<PokemonInfoInterface[]>();

  useEffect(() => {
    fetchAllLegacyPokemons();

    return () => setAllPokemonsInfo(undefined);
  }, []);

  async function fetchAllLegacyPokemons() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(response => response.json())
    .then(async json => {
      const pokemonsInfo: PokemonInfoInterface[] = [];
      for(const pokemon of json.results) {
        await fetch(pokemon.url)
        .then(response => response.json())
        .then(json => {
          pokemonsInfo.push({
            name: json.name,
            id: json.id,
            weight: json.weight,
            height: json.height,
            sprite: json.sprites.front_default
          });
        });
      }

      setAllPokemonsInfo(pokemonsInfo);
    });
  }

  return (
    <>
      <header id="header">
        <h1>Kanto's Pokédex</h1>
      </header>
      <main>
        <div className={"flex flex-col gap-2 mt-4"}>
          <label
            htmlFor="pokemonNameInput"
            className={"text-xl"}
          >
            Filter your search
          </label>
          <input
            type="text"
            id="pokemonNameInput"
            className={"bg-black/30 px-4 py-2 border-2 border-zinc-600 rounded-md w-fit mx-auto"}
            onChange={e => setInputPokemonName(e.target.value ?? undefined)}
          />
        </div>
        {allPokemonsInfo ?
          (
            <div
              className={"w-[80%] flex flex-wrap justify-center gap-x-4 gap-y-8 mt-12 mx-auto"}
            >
              {allPokemonsInfo.sort((pokemonA, pokemonB) => pokemonA.id - pokemonB.id).map(pokemon => {
                if(inputPokemonName && !pokemon.name.toLowerCase().includes(inputPokemonName.toLowerCase())) {
                  return;
                }

                return (
                  <PokemonCard
                    key={pokemon.id}
                    name={pokemon.name}
                    id={pokemon.id}
                    weight={pokemon.weight}
                    height={pokemon.height}
                    sprite={pokemon.sprite}
                  />
                );
              })}
            </div>
          )
        :
          (
            <div>
              <h2 className={"text-3xl mt-10"}>Loading Pokémons...</h2>
            </div>
          )
        }
      </main>
    </>
  )
}

export default App;