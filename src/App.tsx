import { FormEvent, useState } from 'react';

import './App.css';

interface PokemonInfoInterface {
  name: string,
  id: number,
  weight: number,
  height: number,
  sprite: string
}

function App() {
  const [pokemonName, setPokemonName] = useState<string>();
  const [pokemonInfo, setPokemonInfo] = useState<PokemonInfoInterface>();

  function pokemonSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setPokemonInfo(undefined);

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
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
        <h1>Pokédex</h1>
      </header>
      <main>
        <form
          onSubmit={pokemonSubmitHandler}
          id="pokedexForm"
        >
          <input
            type="text"
            id="pokemonNameInput"
            onChange={e => setPokemonName(e.target.value ?? undefined)}
          />
          <button
            id="submitButton"
            type="submit"
          >Search</button>
        </form>
        {pokemonInfo ? (
          <section id="searchResult">
            <img
              src={pokemonInfo.sprite}
              id="pokemonSprite"
            />
            <p><strong>Name:</strong> {pokemonInfo.name}</p>
            <p><strong>N°:</strong> {pokemonInfo.id}</p>
            <p><strong>Weight:</strong> {pokemonInfo.weight / 10}kg</p>
            <p><strong>Height:</strong> {pokemonInfo.height * 10}cm</p>
          </section>
        ) : (
          <></>
        )}
      </main>
    </>
  )
}

export default App;