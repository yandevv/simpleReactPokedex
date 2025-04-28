import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import '../AllPokemons/AllPokemons.css';

import { LocationData } from '../../types/locationTypes';

import LocationCard from '../../components/LocationCard/LocationCard';

function Locations() {
  const [inputLocationName, setInputLocationName] = useState<string>();
  const [allLocationsInfo, setAllLocationsInfo] = useState<LocationData[]>([]);

  useEffect(() => {
    fetchAllLegacyLocations();

    return () => setAllLocationsInfo([]);
  }, []);

  async function fetchAllLegacyLocations() {
    await fetch('https://pokeapi.co/api/v2/region/1/')
    .then(response => response.json())
    .then(async json => {
      const areaInfo: LocationData[] = [];
      for(const area of json.locations) {
        await fetch(area.url)
        .then(response => response.json())
        .then(json => {
          areaInfo.push({
            name: json.name,
            id: json.id,
            areas: json.areas.map((area: { name: string, url: string }) => area.name)
          });
        });
      }
      setAllLocationsInfo(areaInfo);
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
            onChange={e => setInputLocationName(e.target.value ?? undefined)}
          />
        </div>
        {allLocationsInfo.length > 0 ?
          (
            <div
              className={"w-[80%] flex flex-wrap justify-center gap-x-4 gap-y-8 mt-12 mx-auto"}
            >
              {allLocationsInfo.sort((locationA, locationB) => locationA.id - locationB.id).map(location => {
                if(inputLocationName && !location.name.toLowerCase().includes(inputLocationName.toLowerCase())) {
                  return;
                }

                return (
                  <LocationCard
                    key={location.id}
                    name={location.name}
                    id={location.id}
                    areas={location.areas}
                  />
                );
              })}
            </div>
          )
        :
          (
            <div>
              <h2 className={"text-3xl mt-10"}>Loading Locations...</h2>
            </div>
          )
        }
      </main>
    </>
  )
}

export default Locations;