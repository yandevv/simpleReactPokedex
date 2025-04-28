export interface PokemonStats {
  base_stat: number,
  effort: number,
  stat: {
    name: string,
    url: string
  }
}

export interface PokemonData {
  sprite: string,
  name: string,
  id: number,
  weight: number,
  height: number,
  types: string[]
}