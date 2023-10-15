import { useState } from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Navber from './components/Navber'
import Subvideos from './pages/Subvideos'
import LikedVid from './pages/LikedVid'
import YourVid from './pages/YourVid'
import Shorts from './pages/Shorts'
import VideoDetail from './components/VideoDetail'
import Library from './pages/Library'
import LibraryVids from './pages/LibraryVids'
import SearchFeed from './pages/SearchFeed'
import UserDetail from './components/userChannel/UserDetail'
import Community from './pages/Community'


function App() {
  const [searchTerm,setSearchTerm] = useState('')
  return (
    <BrowserRouter>
   
    <Navber searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

      <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/video/:videoId' element={<VideoDetail/>}/>
    <Route path='/user/:userId' element={<UserDetail/>}/>
    <Route path='/shorts' element={<Shorts/>}/>
    <Route path='/sub' element={<Subvideos/>}/>
    <Route path='/library' element={<Library/>}/>
    <Route path='/community' element={<Community/>}/>
    <Route path='/likedVideos' element={<LikedVid/>}/>
    <Route path='/libraryVids/:playlistId' element={<LibraryVids/>}/>
    <Route path='/search' element={<SearchFeed searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>}/>
    </Routes>
      

    
    
</BrowserRouter>

  )
}

export default App
