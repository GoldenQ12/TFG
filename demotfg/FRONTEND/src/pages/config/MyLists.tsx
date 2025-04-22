import { Content } from "@/interfaces/content";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { Button, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaDeleteLeft } from "react-icons/fa6";



const MyLists = () => {

    const navigate = useNavigate();
    const { authUser, deleteCollections } = useAuthStore(); 
    const [content, setContent] = useState<Content[]>([]);
    const [loading, setLoading] = useState(false);


    const DeleteFavourite = async (movieTitle: string, collectionType: string) => {
        const data = {
            movieTitle: movieTitle,
            collectionType: collectionType
        }
        await deleteCollections (data);
        window.location.reload();
    }

    const getCollection = async (type: string) => {
        const collectionIndex = type === "anime" ? 0 : type === "movies" ? 1 : type === "series" ? 2 : 3;
        const fetchedContent: Content[] = [];

        if (!authUser) {
          console.warn("Collection type not found in user data");
          return;
        }
        let titles = authUser.collections.movies;
        switch (collectionIndex) {
            case 0:
                { titles = authUser.collections.anime;
                break; }
            case 1:
                { titles = authUser.collections.movies;
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOWQ0NTZlOTVlZWE1Y2Y4ZjU0NjBjNWY0YWM5MDk3MiIsIm5iZiI6MTczOTE4MzYxMC4wODcwMDAxLCJzdWIiOiI2N2E5ZDVmYTZjYTgxNTQ2MDQwZjc3MDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.pZsQwqGzp0zElh9eSnvmJOe-OET-TokwsHm-ZgqM2g4`,
                    },
                    };
                
                    for (const title of titles) {
                    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(title)}&language=es-ES`;
                
                    try {
                        const res = await fetch(url, options);
                        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
                
                        const json = await res.json();
                
                        if (json.results && json.results.length > 0) {
                        const movie = json.results[0];
                
                        fetchedContent.push({
                            id: movie.id,
                            title: movie.title,
                            image: movie.poster_path 
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : 'https://placehold.co/600x400?text=No+Image',
                            description: movie.overview,
                            type: "movies",
                        });
                        }
                    } catch (err) {
                        console.error(`Fetch error for title "${title}":`, err);
                    }
                    }
                }
                setContent(fetchedContent);
                break;
            case 2:
                titles = authUser.collections.series;
                break;
            case 3:
                titles = authUser.collections.videogames;
                break;
        }
        
        setLoading(true);
        console.log("🎬 Movie IDs:", titles);
        
      };

    const truncateAtWord = (text : string, limit = 75) => {
    if (text.length <= limit) return text;
    
    const trimmed = text.substring(0, limit);
    const lastSpace = trimmed.lastIndexOf(" ");
    return trimmed.substring(0, lastSpace) + "…";
    }

    const goToDetailMovie = ( title: string) => {
        navigate(`/movie-detail/${title}`);
      }


    return (
        <div className="min-h-screen flex">
            <div className="w-full flex justify-between gap-4 p-4">
                <aside className="w-6/12 shadow-lg p-6">
                    <nav className="space-y-4 flex justify-between gap-4 h-9/12 flex-col">
                        <div onClick={async () => await getCollection("movies")} className="text-right border-8 border-black hover:text-white p-4  transition duration-300 ease-in-out cursor-pointer">
                            <button className="sidebar-button text-right inline-block border-8 border-black hover:text-white rounded-2xl shadow-xl p-8 transition duration-300 ease-in-out cursor-pointer">Peliculas 🎞️</button>
                        </div>
                        <div onClick={async () => await getCollection("series")} className="text-right border-8 border-black hover:text-white p-4  transition duration-300 ease-in-out cursor-pointer">
                            <button className="sidebar-button text-right inline-block border-8 border-black hover:text-white rounded-2xl shadow-xl p-8 transition duration-300 ease-in-out cursor-pointer">Series 📺</button>
                        </div>
                        <div onClick={async () => await getCollection("videogames")} className="text-right border-8 border-black hover:text-white p-4  transition duration-300 ease-in-out cursor-pointer">
                            <button className="sidebar-button text-right inline-block border-8 border-black hover:text-white rounded-2xl shadow-xl p-8 transition duration-300 ease-in-out cursor-pointer">Videojuegos 🎮</button>
                        </div>
                        <div onClick={async () => await getCollection("animes")} className="text-right border-8 border-black hover:text-white p-4  transition duration-300 ease-in-out cursor-pointer">
                            <button className="sidebar-button text-right inline-block border-8 border-black hover:text-white rounded-2xl shadow-xl p-8 transition duration-300 ease-in-out cursor-pointer">Anime ㊗️</button>
                        </div>
                    </nav>
                </aside>
                    <main className="flex-1 p-8 flex flex-col ">
                    {!loading && <p className="text-gray-600 mb-4">Elige una categoría</p>}
                        {loading && <div className="animate m-3 grid place-content-center grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 p-6">
                                  {content.map((contenido, key) => (
                                    <div
                          key={key}
                          className="flex flex-col group relative w-50 h-50 md:w-50 md:h-48 rounded-lg overflow-hidden bg-black shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105"
                        >
                          <Image
                            src={
                              contenido.image
                                ? `https://image.tmdb.org/t/p/w500/${contenido.image}`
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
                            <h2 className="text-white font-bold">{contenido.title}</h2>
                            <Text textStyle="xs" className="text-shadow-gray-700 text-sm">
                              {truncateAtWord(contenido.description) || "Sinopsis no disponible"}
                            </Text>
                        
                            <div className="flex flex-col">
                              <Button
                                colorPalette={'orange'}
                                onClick={() => goToDetailMovie(contenido.title)} 
                                className="text-sm px-4 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700 transition">
                                Ver Detalles
                              </Button>
                              <Button  
                                onClick={() => DeleteFavourite(contenido.title, contenido.type)}
                                variant="surface" 
                                colorPalette={'red'}>
                                Eliminar <FaDeleteLeft/>
                                </Button>
                            </div>
                          </div>
                          <div className="">
                            
                          </div>
                        </div>
                                  ))}
                    </div>}
                </main>
            </div>
        </div>
    )
}

export default MyLists