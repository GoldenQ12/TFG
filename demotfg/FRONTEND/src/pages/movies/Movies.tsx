import { Text, Image, InputGroup, Input, Button } from '@chakra-ui/react'
import '../../App.css'
import { useEffect, useState } from 'react';
import { Movie } from './interfaces/Movie';
import '../../styles/movie.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import { LuSearch } from 'react-icons/lu';






function Movies() {
  
  const navigate = useNavigate();
  const [cargado, isCargado] = useState(false);
  const [filteredPeliculas, setfilteredPeliculas] = useState<Movie[]>([]);
  const [paginacion, setPaginacion] = useState(1);

  const goToDetailMovie = ( title: string) => {
    navigate(`/movie-detail/${title}`);
  }


  const handleNextPage = () => {
    setPaginacion(paginacion + 1);
      IniciarAplicacion();
  }
  const handlePrevPage = () => {
    if (paginacion > 1) {
      setPaginacion(paginacion - 1);
      IniciarAplicacion();
    }
  }

  function IniciarAplicacion () {
    isCargado(false);
    const url = `https://api.themoviedb.org/3/movie/popular?language=es-ES&page=${paginacion}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOWQ0NTZlOTVlZWE1Y2Y4ZjU0NjBjNWY0YWM5MDk3MiIsIm5iZiI6MTczOTE4MzYxMC4wODcwMDAxLCJzdWIiOiI2N2E5ZDVmYTZjYTgxNTQ2MDQwZjc3MDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.pZsQwqGzp0zElh9eSnvmJOe-OET-TokwsHm-ZgqM2g4` 
      }
    };
  
    fetch(url, options)
      .then((res) => {
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        console.log("Lista de peliculas del fetch", json.results);
        setfilteredPeliculas(json.results);
        isCargado(true);
      })
      .catch((err) => console.error("Fetch error de peliculas:", err));
  }

  const truncateAtWord = (text : string, limit = 75) => {
    if (text.length <= limit) return text;
  
    const trimmed = text.substring(0, limit);
    const lastSpace = trimmed.lastIndexOf(" ");
    return trimmed.substring(0, lastSpace) + "…";
  }

  const GetPeliculasBySearch = async ( title: string) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${title}}&language=es-ES&page=${paginacion}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOWQ0NTZlOTVlZWE1Y2Y4ZjU0NjBjNWY0YWM5MDk3MiIsIm5iZiI6MTczOTE4MzYxMC4wODcwMDAxLCJzdWIiOiI2N2E5ZDVmYTZjYTgxNTQ2MDQwZjc3MDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.pZsQwqGzp0zElh9eSnvmJOe-OET-TokwsHm-ZgqM2g4` 
        }
};

    fetch(url, options)
    .then((res) => {
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
        return res.json();
    })
    .then((json) => {
        console.log("Pelicula encontrada: ", json.results[0]);
        setfilteredPeliculas(json.results);
    })
    .catch((err) => console.error("Fetch error de peliculas:", err));
}

  useEffect(() => {
    
    IniciarAplicacion();
  }, []);
 

  return (
<>
    {cargado && (
      <div className="App flex flex-col gap-6 justify-center items-center">
        <div className="searchbar w-8/12">
          <InputGroup flex="1" startElement={<LuSearch />} >
            <Input 
              onChange={(e) => {
                const title = e.target.value;
                if (title.length > 0) {
                  GetPeliculasBySearch(title);
                } else {
                  IniciarAplicacion();
                }
              }}
              placeholder="Buscar pelicula" />
          </InputGroup>
        </div>
        <div className="main flex gap-6 justify-center items-center">
        <button className='scale-250' onClick={handlePrevPage} ><FaArrowAltCircleLeft/ > </button>
        <div className="animate grid place-content-center grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-6">
          {filteredPeliculas.map((pelicula, key) => (
            <div
  key={key}
  className="group relative w-72 h-50 md:w-80 md:h-48 rounded-lg overflow-hidden bg-black shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105"
>
  <Image
    src={
      pelicula.poster_path
        ? `https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`
        : "https://placehold.co/600x400?font=roboto&text=Imagen+no+disponible"
    }
    alt="Movie Poster"
    objectFit="cover"
    boxSize="100%"
    className="transition-opacity duration-300 group-hover:opacity-30"
  />

  {/* BACKDROP OVERLAY */}
  <div className="absolute inset-0  bg-opacity-50 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

  {/* TEXT CONTENT */}
  <div className="text-left absolute inset-4 flex flex-col gap-2 justify-center p-8 space-y-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
    <h2 className="text-white font-bold">{pelicula.title}</h2>
    <Text textStyle="xs" className="text-shadow-gray-700 text-sm">
      {truncateAtWord(pelicula.overview) || "Sinopsis no disponible"}
    </Text>

    <div className="flex">
      <Button
        colorPalette={'orange'}
        onClick={() => goToDetailMovie(pelicula.title)} 
        className="text-sm px-4 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700 transition">
        Ver Detalles
      </Button>
    </div>
  </div>
</div>
          ))}
        

      </div>
        <button className='scale-250' onClick={handleNextPage}><FaArrowAltCircleRight/ > </button>
        </div>

    </div>
    )}
</>
  )
}

export default Movies
