import { useEffect, useState } from "react";
import { Movie } from "../interfaces/Movie";
import { useParams } from "react-router-dom";
import '../../../App.css'
import { Badge, Button, Image } from "@chakra-ui/react";
import { Trailer } from "../interfaces/Trailer";
import { FaBookBookmark, FaDeleteLeft } from "react-icons/fa6";
import { useAuthStore } from "@/store/useAuthStore";




function DetailMovie() {
    
    const { title } = useParams();
    const [pelicula, setPelicula] = useState<Movie>({} as Movie);
    const [trailer, setTrailer] = useState<Trailer>({} as Trailer);
    const { updateCollections, deleteCollections } = useAuthStore();
    
    const AddFavourite = async (movieTitle: string) => {
        const data = {
            movieTitle: movieTitle,
            collectionType: 'movies'
        }
        await updateCollections (data);
    }

    const DeleteFavourite = async (movieTitle: string) => {
        const data = {
            movieTitle: movieTitle,
            collectionType: 'movies'
        }
        await deleteCollections (data);
    }

    useEffect(() => {


        
        const GetMovieById = async () => {
            console.log("Buscando pelicula por id: ", title);
            const url = `https://api.themoviedb.org/3/search/movie?query=${title}}&language=es-ES`;
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
                setPelicula(json.results[0]);
            })
            .catch((err) => console.error("Fetch error de peliculas:", err));
        }

        const GetMovieVideo = async () => {
            const url = `https://api.themoviedb.org/3/movie/${pelicula.id}/videos`;
            console.log("Buscando trailer de la pelicula: ", url);
            const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOWQ0NTZlOTVlZWE1Y2Y4ZjU0NjBjNWY0YWM5MDk3MiIsIm5iZiI6MTczOTE4MzYxMC4wODcwMDAxLCJzdWIiOiI2N2E5ZDVmYTZjYTgxNTQ2MDQwZjc3MDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.pZsQwqGzp0zElh9eSnvmJOe-OET-TokwsHm-ZgqM2g4'
            }
            };

            fetch(url, options)
            .then(res => res.json())
            .then(json => {
                console.log("Trailer de la pelicula: ", json.results);
                setTrailer(json.results[0]);
            })
            .catch(err => console.error("error", err));
        }


        GetMovieById();
        GetMovieVideo();
    }, [title, pelicula.id]);



    return (
        (
            <div className="flex justify-center">
            <div className="App flex flex-col md:flex-row  gap-8 rounded-lg  max-w-5xl mx-auto">
              <div className="image w-full md:w-1/2">
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
              </div>
          
              <div className="relative text w-full h-full md:w-1/2 flex flex-col gap-4 text-center md:text-left">
                <h1 className="text-3xl font-bold ">{pelicula.title}</h1>
                <p className="">{pelicula.overview ? pelicula.overview : "Sin resumen"}</p>
                <p className="">
                  <span className="font-medium text-gray-700">📅 Fecha de lanzamiento:</span>{" "}
                  {pelicula.release_date?.toString()}
                </p>
                <Badge className="w-25" colorPalette={pelicula.vote_average < 5 ? 'red' : 'green'} size="lg">⭐ {pelicula.vote_average ? pelicula.vote_average.toFixed(1) : "N/A"} / 10</Badge>
                    {trailer ? (
                        <div className="trailer">
                        <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${trailer.key}`}
                            title="YouTube trailer"
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                        </div>
                    ) : (
                        <Image
                            src="https://placehold.co/600x400?font=roboto&text=Trailer+no+disponible"
                            alt="Trailer no disponible">
                            
                        </Image>
                    )}
                <div className="button-group flex justify-between  p-4 rounded-lg">
                    <Button  
                        onClick={() => AddFavourite(pelicula.title)} 
                        variant="surface" 
                        colorPalette={'green'}>
                        Agregar a favoritos <FaBookBookmark/>
                    </Button>
                    <Button  
                        onClick={() => DeleteFavourite(pelicula.title)} 
                        variant="surface" 
                        colorPalette={'red'}>
                        Eliminar de favoritos <FaDeleteLeft/>
                    </Button>
                </div>
                </div>
            </div>
          </div>
          


        )
        
    );
}

export default DetailMovie;