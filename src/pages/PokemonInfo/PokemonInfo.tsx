import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import '../Home/Home.css';

import PokemonCard from '../../components/PokemonCard';

interface PokemonInfoInterface {
  name: string,
  id: number,
  weight: number,
  height: number,
  sprite: string
}
function PokemonInfo() {
  const { id } = useParams<{id: string}>();

  const [pokemonInfo, setPokemonInfo] = useState<PokemonInfoInterface>();

  useEffect(() => {
    fetchPokemonInfo(parseInt(id!));
  }, []);

  function fetchPokemonInfo(id: number) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json())
    .then(json => {
      setPokemonInfo({
        name: json.name,
        id: json.id,
        weight: json.weight,
        height: json.height,
        sprite: json.sprites.front_default
      });
    });
  }

  return (
    <>
      <header id="header">
        <h1>Kanto's Pokédex</h1>
      </header>
      <main>
        {pokemonInfo ?
          <PokemonCard height={pokemonInfo.height} name={pokemonInfo.name} sprite={pokemonInfo.sprite} weight={pokemonInfo.weight} id={pokemonInfo.id} />
        :
          (
            <div>
              <h2 className={"text-3xl mt-10"}>Loading Pokémon...</h2>
            </div>
          )}
      </main>
    </>
  )
}

export default PokemonInfo;