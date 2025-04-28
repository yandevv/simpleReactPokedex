interface PokemonCardProps {
  sprite: string,
  name: string,
  id: number,
  weight: number,
  height: number
}
export default function PokemonCard({ sprite, name, id, weight, height }: PokemonCardProps) {
  return (
    <section id="searchResult">
      <img
        src={sprite}
        className={"mx-auto"}
        id="pokemonSprite"
        loading="lazy"
      />
      <div>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>N°:</strong> {id}</p>
        <p><strong>Weight:</strong> {weight / 10}kg</p>
        <p><strong>Height:</strong> {height * 10}cm</p>
      </div>
    </section>
  )
}
