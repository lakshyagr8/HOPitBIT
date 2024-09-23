import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import AddAlbum from './pages/AddAlbum/AddAlbum';
import AddSong from './pages/AddSong/AddSong';
import ListAlbum from './pages/ListAlbum/ListAlbum';
import ListSong from './pages/ListSong/ListSong';

export const url = 'http://localhost:5173';

const App = () => {
  return (
    <div className='flex items-start min-h-screen'>
      <ToastContainer /> 
      <Sidebar />
      <div className='flex-1 h-screen overflow-y-scroll bg-[#F3FFF7]'>
        <Navbar />
        <div className="pt-8 pl-5 sm:pt-12 sm:pl-12">
          <Routes>
            <Route path="/add-song" element={<AddSong />} />
            <Route path="/list-songs" element={<ListSong />} />
            <Route path="/add-album" element={<AddAlbum />} />
            <Route path="/list-albums" element={<ListAlbum />} />
          </Routes>
        </div>

      </div>

    </div>
  )
}

export default App
