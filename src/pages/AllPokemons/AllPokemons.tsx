import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import './AllPokemons.css';

import { PokemonData } from '../../types/pokemonTypes';

import PokemonCard from '../../components/PokemonCard/PokemonCard';

function AllPokemons() {
  const [inputPokemonName, setInputPokemonName] = useState<string>();
  const [allPokemonsInfo, setAllPokemonsInfo] = useState<PokemonData[]>([]);

  useEffect(() => {
    fetchAllLegacyPokemons();

    return () => setAllPokemonsInfo([]);
  }, []);

  async function fetchAllLegacyPokemons() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(response => response.json())
    .then(async json => {
      const pokemonsInfo: PokemonData[] = [];
      for(const pokemon of json.results) {
        await fetch(pokemon.url)
        .then(response => response.json())
        .then(json => {
          pokemonsInfo.push({
            name: json.name,
            id: json.id,
            weight: json.weight,
            height: json.height,
            sprite: json.sprites.front_default,
            types: json.types.map((type: { type: { name: string } }) => {
              const firstLetter = type.type.name.charAt(0).toUpperCase();
              return firstLetter + type.type.name.slice(1);
            })
          });
        });
      }
      setAllPokemonsInfo(pokemonsInfo);
    });
  }

  return (
    <>
      <header
        id="header"
        className={"flex gap-10 items-center justify-center"}
      >
        <Link to={"/"}>
          <h1 className={"text-white/87"}>Kanto's Pokédex</h1>
        </Link>
        <Link to={"/locations"}>
          <h2 className={"text-xl text-white/87 font-normal underline underline-offset-3"}>Locations</h2>
        </Link>
      </header>
      <main>
        <div className={"flex flex-col gap-2 mt-4 justify-between"}>
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
        {allPokemonsInfo.length > 0 ?
          (
            <div
              className={"w-[80%] flex flex-wrap justify-center gap-x-4 gap-y-8 mt-12 mx-auto"}
            >
              {allPokemonsInfo.sort((pokemonA, pokemonB) => pokemonA.id - pokemonB.id).map(pokemon => {
                if(inputPokemonName && !pokemon.name.toLowerCase().includes(inputPokemonName.toLowerCase())) {
                  return;
                }

                return (
                  <Link
                    key={pokemon.id}
                    to={`/pokemon/${pokemon.id}`}
                  >
                    <PokemonCard
                      name={pokemon.name}
                      id={pokemon.id}
                      weight={pokemon.weight}
                      height={pokemon.height}
                      sprite={pokemon.sprite}
                      types={pokemon.types}
                    />
                  </Link>
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

export default AllPokemons;