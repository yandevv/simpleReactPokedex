import { PokemonData } from "./pokemonTypes";

export interface AreaData {
  id: number,
  name: string,
  pokemonEncounters: PokemonData[]
}