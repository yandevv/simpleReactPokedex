import {
  useEffect,
  useState
} from "react";

import { PokemonData } from "../../types/pokemonTypes";

export default function PokemonCard({ sprite, name, id, weight, height, types }: PokemonData) {
  const [bgColor, setBgColor] = useState<string>();

  useEffect(() => {
    switch(types[0]) {
      case "Grass":
        setBgColor("bg-green-500");
        break;
      case "Fire":
        setBgColor("bg-red-500");
        break;
      case "Water":
        setBgColor("bg-blue-500");
        break;
      case "Bug":
        setBgColor("bg-green-700");
        break;
      case "Normal":
        setBgColor("bg-gray-500");
        break;
      case "Poison":
        setBgColor("bg-purple-500");
        break;
      case "Electric":
        setBgColor("bg-yellow-500");
        break;
      case "Ice":
        setBgColor("bg-blue-300");
        break;
      case "Dragon":
        setBgColor("bg-purple-700");
        break;
      case "Psychic":
        setBgColor("bg-pink-500");
        break;
      case "Rock":
        setBgColor("bg-slate-900");
        break;
      case "Fairy":
        setBgColor("bg-pink-300");
        break;
      case "Ground":
        setBgColor("bg-yellow-700");
        break;
      default:
        setBgColor("bg-gray-800");
    }
  }, [types]);

  return (
    <section
      id="searchResult"
      className={`mt-8 ${bgColor} rounded-lg p-4 shadow-lg w-fit mx-auto`}
    >
      <img
        src={sprite}
        className={"mx-auto"}
        id="pokemonSprite"
        loading="lazy"
        alt={`Sprite of ${name} pokémon`}
      />
      <div>
        <p className={"text-white/87"}><strong>Name:</strong> {name[0].toUpperCase() + name.slice(1)}</p>
        <p className={"text-white/87"}><strong>N°:</strong> {id}</p>
        <p className={"text-white/87"}><strong>Weight:</strong> {weight / 10}kg</p>
        <p className={"text-white/87"}><strong>Height:</strong> {height * 10}cm</p>
        <p className={"text-white/87"}><strong>Types:</strong> {types.join(', ')}</p>
      </div>
    </section>
  )
}
