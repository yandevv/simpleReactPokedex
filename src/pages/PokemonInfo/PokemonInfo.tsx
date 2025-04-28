import {
  useEffect,
  useState
} from 'react';
import {
  Link,
  useParams
} from 'react-router';

import '../Home/Home.css';

import { PokemonData, PokemonStats } from '../../types/pokemonTypes';

import PokemonCard from '../../components/PokemonCard/PokemonCard';

function PokemonInfo() {
  const { id } = useParams<{id: string}>();

  const [pokemonInfo, setPokemonInfo] = useState<PokemonData & {stats: PokemonStats[]}>();

  useEffect(() => {
    fetchPokemonInfo(parseInt(id!));
  }, [id]);

  function fetchPokemonInfo(id: number) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json())
    .then(json => {
      setPokemonInfo({
        name: json.name,
        id: json.id,
        weight: json.weight,
        height: json.height,
        sprite: json.sprites.front_default,
        types: json.types.map((type: { type: { name: string } }) => {
          const firstLetter = type.type.name.charAt(0).toUpperCase();
          return firstLetter + type.type.name.slice(1);
        }),
        stats: json.stats
      });
    });
  }

  return (
    <>
      <header id="header">
        <Link to={"/"}>
          <h1 className={"text-white/87"}>Kanto's Pokédex</h1>
        </Link>
      </header>
      <main>
        {pokemonInfo ?
          <>
            <PokemonCard
              id={pokemonInfo.id}
              height={pokemonInfo.height}
              name={pokemonInfo.name}
              sprite={pokemonInfo.sprite}
              weight={pokemonInfo.weight}
              types={pokemonInfo.types}
            />
            <div>
              <h2 className={"text-3xl mt-6"}>Stats</h2>
              <div className={"flex flex-col gap-2 w-[350px] mx-auto mt-4"}>
                {pokemonInfo.stats.map((pokemonStat) => (
                  <div key={pokemonStat.stat.name} className={"flex justify-between"}>
                    <strong><p className={"text-white/87"}>{pokemonStat.stat.name[0].toUpperCase() + pokemonStat.stat.name.slice(1)}:</p></strong>
                    <p className={"text-white/87"}>{pokemonStat.base_stat} (Effort: {pokemonStat.effort})</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        :
          (
            <div>
              <h2 className={"text-3xl mt-10"}>Loading Pokémon...</h2>
            </div>
          )
        }
      </main>
    </>
  )
}

export default PokemonInfo;