import React, { useContext } from 'react';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Display from './components/Display';
import { PlayerContext } from './context/PlayerContext';

const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);

  // Safely check if songsData and track exist before rendering the components
  return (
    <div className='h-screen bg-black'>
      {
        songsData && songsData.length > 0 && track ? ( // Check if songsData is non-empty and track exists
          <>
            <div className='h-[90%] flex'>
              <Sidebar />
              <Display />
            </div>
            <Player />
            {/* Ensure track.file is only accessed if track exists */}
            <audio ref={audioRef} src={track && track.file ? track.file : ""} preload='auto'></audio>
          </>
        ) : (
          // Fallback UI when songsData or track is not yet available
          <div className='text-white flex items-center justify-center h-full'>
            Loading...
          </div>
        )
      }
    </div>
  );
};

export default App;
