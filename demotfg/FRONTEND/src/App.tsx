import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import './App.css'
import NavBar from './components/NavBar'
import Movies from './pages/movies/Movies'
import Series from './pages/series/Series';
import Footer from './components/Footer';
import DetailMovie from './pages/movies/components/DetailMovie';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import SettingsPage from './pages/config/SettingsPage';
import LoginPage from './pages/config/LoginPage';
import SignUpPage from './pages/config/SignUpPage';
import ProfilePage from './pages/config/ProfilePage';
import { Toaster } from 'react-hot-toast';
import Animes from './pages/animes/Animes';
import Videogames from './pages/videogames/Videogames';
import MyLists from './pages/config/MyLists';






const App = () => {
  
  const {isCheckingAuth, authUser, checkAuth} = useAuthStore();
  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  )
 

  return (
    
    <div data-theme={'night'} className='App flex flex-col gap-10 ' >
      <Router>
       {authUser ? <NavBar></NavBar> : ''}
        <Routes>
          <Route path="/" element={authUser ? <Movies/> : <Navigate to="/login"/>}/>
          <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to="/"/>}/>
          <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/"/>}/>
          <Route path="/settings" element={!authUser ? <LoginPage/> : <SettingsPage/>}/>
          <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to="/login"/>}/>
          <Route path="/movies" element={!authUser ? <LoginPage/> : <Movies />} />
          <Route path="/movie-detail/:title" element={!authUser ? <LoginPage/> : <DetailMovie/>} />
          <Route path="/series" element={!authUser ? <LoginPage/> : <Series />} />
          <Route path="/animes" element={!authUser ? <LoginPage/> : <Animes />} />
          <Route path="/mylist" element={!authUser ? <LoginPage/> : <MyLists />} />
          <Route path="/videogames" element={!authUser ? <LoginPage/> : <Videogames />} />
        </Routes>
      </Router>
      <Footer></Footer>
      <Toaster/>
    </div>
  )
}

export default App
