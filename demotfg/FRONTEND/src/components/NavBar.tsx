import { Button, Image } from '@chakra-ui/react';
import '../App.css'
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { FaBookmark } from 'react-icons/fa';






function NavBar() {

    const {logout} = useAuthStore();
  
  return (
    <>
        <div className="mt-8 flex items-center justify-center gap-16">
            <div className=" gap-20 px-4 py-3 flex justify-center items-center space-x-6">
                <Link to="/movies" >
                    <h1 className="text-gray-400 cursor-pointer hover:text-white transition-colors duration-300">Peliculas</h1>
                </Link>  
                <Link to="/series" >
                    <h1 className="text-gray-400 cursor-pointer hover:text-white transition-colors duration-300">Series</h1>
                </Link>  
                <Link to="/videogames" >
                    <h1 className="text-gray-400 cursor-pointer hover:text-white transition-colors duration-300">Videojuegos</h1>
                </Link>  
                <Link to="/animes" >
                    <h1 className="text-gray-400 cursor-pointer hover:text-white transition-colors duration-300">Animes</h1>
                </Link>  
            </div>
            <div className="justify-center flex gap-8 items-center">
                
                <Button 
                    variant="surface" 
                    colorPalette={'red'} 
                    className="hidden md:block"
                    onClick={() => logout()}>
                    Logout
                </Button>
                <div className="profile flex justify-center items-center gap-8">
                    <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                        <Image src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1744918688~exp=1744922288~hmac=fa281adfcd07a7c682f049c8b2c5d3ee301f2c3732bcc71f53bf38c9a2e99a4d&w=740" alt="Logo" className="w-8 h-8 rounded-full object-cover border-4 "></Image>
                    </Link>
                    <Button
                        className='p-2'
                        variant="plain">
                        <Link to="/mylist" className='flex  gap-4 justify-center items-center' >
                            <p className='text-green-500 '>Guardados</p>
                            <FaBookmark className='scale-200' />
                        </Link>  
                    </Button>
                </div>
            </div>
            <button id="hamburger-btn" className="md:hidden text-white focus:outline-none absolute right-4" aria-label="Toggle Navigation">
                <svg id="hamburger-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <svg id="close-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="hidden w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <div id="mobile-menu" className="hidden fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-90 z-50">
            <div className="bg-gray-800 w-80 h-full absolute right-0 p-6">
                <div className="flex justify-end mb-4">
                    <button id="mobile-menu-close-btn" className="text-white focus:outline-none" aria-label="Close Mobile Menu">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <nav className="block">
                    <ul className="space-y-4">
                        <Link to="/movies" className="text-gray-400 cursor-pointer hover:text-white transition-colors duration-300">Peliculas</Link>  
                        <Link to="/series" className="text-gray-400 cursor-pointer hover:text-white transition-colors duration-300">Series</Link> 
                        <Link to="/videogames" className="text-gray-400 cursor-pointer hover:text-white transition-colors duration-300">Videojuegos</Link>  
                        <Link to="/animes" className="text-gray-400 cursor-pointer hover:text-white transition-colors duration-300">Anime</Link>   
                   </ul>
                </nav>
            </div>
        </div>
    </>
  )
}

export default NavBar
