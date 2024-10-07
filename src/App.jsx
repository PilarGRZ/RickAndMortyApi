import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from "react-bootstrap";
import './styles.css'
import Episodios from "./components/Episodios";
import Origen from "./components/Origen";
import Location from "./components/Location";


function App() {
  const [characters, setCharacters] = useState([]);
  const [selectEpisodes, setSelectEpisodes] = useState([])
  const [selectOrigin, setselectOrigin] = useState(null)
  const [selectLocation, setselectLocation] = useState(null)


  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch("https://rickandmortyapi.com/api/character");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCharacters(data.results);
        console.log(data.results)

      } catch (error) {
        console.error("Error fetching characters:", error);

      }
    };

    fetchCharacters();
  }, []);


  const handleEpisodies = (episode) => {
    setSelectEpisodes([])

    setTimeout(() => {
      setSelectEpisodes(episode)
    }, 0)

  }

  const handleOrigin = (origin) => {
    setselectOrigin([])

    setTimeout(() => {
      setselectOrigin(origin)
    }, 0)

  }

  const handleLocation = (location) => {
    setselectLocation([])

    setTimeout(() => {
      setselectLocation(location)
    }, 0)
  }

  return (
    <>
      <div>
        {characters.length > 0 ? (
          <div className="container-fluid text-center">
            <div className="tittle">
              <img src="/public/imagenes/2.gif" alt="RickandMorty" className="img-fluid rounded" />
            </div>
            <div className="row row-cols-4 my-5 justify-content-center">

              {characters.map((character) => (
                <div key={character.id} className="card border border-4 bg-info bg-opacity-10 border border-info rounded mx-2 my-2">
                  <div className="card-inner">
                    <div className="card-front p-2">
                      <Card.Img className="rounded" src={character.image} alt={character.name} />
                      <Card.Body className="titleC">
                        <Card.Title className="py-4 fs-4 ">{character.name}</Card.Title>
                      </Card.Body>
                    </div>

                    <div className="card-back">
                      <ul>
                        <li><p>Status : {character.status}</p></li>
                        <li><p>Species : {character.species}</p></li>
                        <li><p>Episode:
                          <button type="button" class="btn btn-primary" onClick={() => handleEpisodies(character.episode)}>Ver</button>
                        </p>
                        </li>
                        {(character.origin.name !== "unknown" || character.origin.url) && (
                          <li><p>Origin:
                            <button type="button" class="btn btn-primary" onClick={() => handleOrigin(character.origin)}>Ver</button>
                          </p>
                          </li>
                        )}

                        <li><p>Location:
                          <button type="button" class="btn btn-primary" onClick={() => handleLocation(character.location)}>Ver</button>
                        </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

              ))}
            </div>

            {selectEpisodes.length > 0 && <Episodios episode={selectEpisodes} />}
            {selectOrigin && selectOrigin.url && <Origen origin={selectOrigin} />}
            {selectLocation && selectLocation.url && <Location location={selectLocation} />}
          </div>


        ) : (
          <p>Loading characters...</p>
        )}
      </div>
    </>
  );
}

export default App;

