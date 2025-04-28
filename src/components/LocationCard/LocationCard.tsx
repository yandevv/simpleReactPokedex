import { Link } from "react-router";

import { LocationData } from "../../types/locationTypes";

import { nameFormatter } from "../../utils/formatters";

export default function LocationCard({ id, name, areas }: LocationData) {
  return (
    <section
      id="searchResult"
      className={`mt-8 bg-gray-700 rounded-lg p-4 shadow-lg w-fit min-h-32 mx-auto`}
    >
      <div>
        <p className={"text-white/87"}><strong>Name:</strong> {name}</p>
        <p className={"text-white/87"}><strong>N°:</strong> {id}</p>
        {areas.map((area, index) => (
          <ul key={area}>
            <Link to={`/area/${area}`}>
              <li className={"text-white/87 text-left list-disc list-inside underline underline-offset-3"}>
                <strong className={"ml-[-6px]"}>Area {index + 1}:</strong> <span className={"font-normal"}>{nameFormatter(area)}</span>
              </li>
            </Link>
          </ul>
        ))}
      </div>
    </section>
  )
}