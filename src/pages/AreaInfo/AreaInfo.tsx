import {
  useEffect,
  useState
} from 'react';
import {
  Link,
  useParams
} from 'react-router';
import { nameFormatter } from '../../utils/formatters';

import '../AllPokemons/AllPokemons.css';

import { AreaData } from '../../types/areaTypes';
import { PokemonData } from '../../types/pokemonTypes';

import PokemonCard from '../../components/PokemonCard/PokemonCard';

function AreaInfo() {
  const { name } = useParams<{name: string}>();
  const [areaInfo, setAreaInfo] = useState<AreaData>();
  const [types, setTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');

  useEffect(() => {
    fetchAreaInfo(name!);

    return () => setAreaInfo(undefined);
  }, [name]);

  function fetchAreaInfo(name: string) {
    fetch(`https://pokeapi.co/api/v2/location-area/${name}`)
    .then(response => response.json())
    .then(async json => {
      const pokemonEncounters: PokemonData[] = [];
      const typesSet = new Set<string>();
      for(const pokemonEncounter of json.pokemon_encounters) {
        await fetch(pokemonEncounter.pokemon.url)
        .then(response => response.json())
        .then(json => {
          pokemonEncounters.push({
            name: json.name,
            id: json.id,
            weight: json.weight,
            height: json.height,
            sprite: json.sprites.front_default,
            types: json.types.map((type: { type: { name: string } }) => {
              const formattedName = nameFormatter(type.type.name);

              typesSet.add(formattedName);

              return formattedName;
            })
          });
        });
      }

      setAreaInfo({
        id: json.id,
        name: json.name,
        pokemonEncounters: pokemonEncounters
      });

      setTypes(Array.from(typesSet));
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
        {areaInfo ?
          <>
            <h2 className={"text-3xl mt-10"}>
              Pokémon Encounters in {nameFormatter(areaInfo.name)} <span className={"text-sm"}>(ID: {areaInfo.id})</span>
            </h2>
            {types.length ?
              <select
                className={"bg-[#161616] text-white/87 rounded-lg p-2 mt-4 mr-4"}
                onChange={(e) => e.target.value !== "default" ? setSelectedType(e.target.value) : setSelectedType('')}
              >
                <option value="default">
                  Choose a type
                </option>
                {Array.from(types).map((type) => {
                  return (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  );
                })}
              </select>
            :
              <></>
            }
            <div className={"w-[80%] flex flex-wrap gap-2 mt-4 justify-center mx-auto"}>
              {areaInfo.pokemonEncounters.map((pokemon) => {
                if(selectedType !== '' && !pokemon.types.includes(selectedType)) {
                  return;
                }

                return (
                  <Link
                    key={pokemon.id}
                    to={`/pokemon/${pokemon.id}`}
                  >
                    <PokemonCard
                      id={pokemon.id}
                      height={pokemon.height}
                      name={pokemon.name}
                      sprite={pokemon.sprite}
                      weight={pokemon.weight}
                      types={pokemon.types}
                    />
                  </Link>
                );
              })}
            </div>
          </>
        :
          <div>
            <h2 className={"text-3xl mt-10"}>Loading Area...</h2>
          </div>
        }
      </main>
    </>
  )
}

export default AreaInfo;