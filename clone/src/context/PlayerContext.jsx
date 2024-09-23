// // import { createContext, useEffect, useRef, useState } from "react";
// // import { songsData } from '../assets/assets';
// // import axios from 'axios'

// // export const PlayerContext = createContext();

// // const PlayerContextProvider = (props) => {

// //     const audioRef = useRef();
// //     const seekBg = useRef();
// //     const seekBar = useRef();
// //     const url = 'http://localhost:5174'

// //     const [songsData, setSongsData] = useState([]);
// //     const [albumsData,setAlbumData] = useState([]);
// //     const [track, setTrack] = useState(songsData[0]);
// //     const [playStatus, setPlayStatus] = useState(false);
// //     const [time, setTime] = useState({
// //         currentTime: {
// //             second: 0,
// //             minute: 0
// //         },
// //         totalTime: {
// //             second: 0,
// //             minute: 0
// //         }
// //     })


// //     const play = () => {
// //         audioRef.current.play();
// //         setPlayStatus(true)
// //     }

// //     const pause = () => {
// //         audioRef.current.pause();
// //         setPlayStatus(false);
// //     }

// //     const playWithId = async (id) => {
// //         await songsData.map((item) => {
// //             if (id === item._id) {
// //                 setTrack(item);
// //             }
// //         })
// //             ;
// //         await audioRef.current.play();
// //         setPlayStatus(true);
// //     }

// //     const previous = async () => {
// //         songsData.map(async (item, index) => {
// //             if (track._id === item._id && index > 0) {
// //                 await setTrack(songsData[index - 1]);
// //                 await audioRef.current.play();
// //                 setPlayStatus(true);
// //             }
// //         })

// //     }

// //     const next = async () => {
// //         songsData.map(async (item, index) => {
// //             if (track._id === item._id && index < songsData.length-1) {
// //                 await setTrack(songsData[index + 1]);
// //                 await audioRef.current.play();
// //                 setPlayStatus(true);
// //             }
// //         })
// //     }

// //     const seekSong = async (e) => {
// //         audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration)
// //     }

// //     const getSongsData = async () => {
// //         const response = await axios.get(`${url}/api/song/list`);
// //         setSongsData(response.data.songs);
// //         console.log(response.data.songs);
// //         setTrack(response.data.songs[0])
// //     }

// //     const getAlbumsData = async () => {
// //         const response = await axios.get(`${url}/api/album/list`);
// //         setAlbumData(response.data.albums);
// //         console.log(response.data.albums);
// //     }

// //     useEffect(() => {
// //         setTimeout(() => {

// //             audioRef.current.ontimeupdate = () => {
// //                 seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%";
// //                 setTime({
// //                     currentTime: {
// //                         second: Math.floor(audioRef.current.currentTime % 60),
// //                         minute: Math.floor(audioRef.current.currentTime / 60)
// //                     },
// //                     totalTime: {
// //                         second: Math.floor(audioRef.current.duration % 60),
// //                         minute: Math.floor(audioRef.current.duration / 60)
// //                     }
// //                 })
// //             }

// //         }, 1000);
// //     }, [audioRef])

// //     useEffect(() => { 

// //         getSongsData()
// //         getAlbumsData()

// //      }, [])

// //     const contextValue = {
// //         audioRef,
// //         seekBar,
// //         seekBg,
// //         track, setTrack,
// //         playStatus, setPlayStatus,
// //         time, setTime,
// //         play, pause,
// //         playWithId,
// //         previous, next,
// //         seekSong,
// //         songsData,albumsData
// //     }

// //     return (
// //         <PlayerContext.Provider value={contextValue}>
// //             {props.children}
// //         </PlayerContext.Provider>
// //     )

// // }

// // export default PlayerContextProvider;

// import { createContext, useEffect, useRef, useState } from "react";
// import { songsData as initialSongsData } from '../assets/assets'; // Renamed to avoid conflict
// import axios from 'axios';

// export const PlayerContext = createContext();

// const PlayerContextProvider = (props) => {

//     const audioRef = useRef();
//     const seekBg = useRef();
//     const seekBar = useRef();
//     const url = 'http://localhost:5174';

//     const [songsData, setSongsData] = useState([]); // Keeping this as the actual state for songs
//     const [albumsData, setAlbumData] = useState([]);
//     const [track, setTrack] = useState(null); // Initialize as null to avoid errors
//     const [playStatus, setPlayStatus] = useState(false);
//     const [time, setTime] = useState({
//         currentTime: {
//             second: 0,
//             minute: 0
//         },
//         totalTime: {
//             second: 0,
//             minute: 0
//         }
//     });

//     const play = () => {
//         audioRef.current.play();
//         setPlayStatus(true);
//     };

//     const pause = () => {
//         audioRef.current.pause();
//         setPlayStatus(false);
//     };

//     const playWithId = async (id) => {
//         const selectedTrack = songsData.find(item => item._id === id);
//         if (selectedTrack) {
//             setTrack(selectedTrack);
//             await audioRef.current.play();
//             setPlayStatus(true);
//         }
//     };

//     const previous = async () => {
//         const currentIndex = songsData.findIndex(item => item._id === track._id);
//         if (currentIndex > 0) {
//             setTrack(songsData[currentIndex - 1]);
//             await audioRef.current.play();
//             setPlayStatus(true);
//         }
//     };

//     const next = async () => {
//         const currentIndex = songsData.findIndex(item => item._id === track._id);
//         if (currentIndex < songsData.length - 1) {
//             setTrack(songsData[currentIndex + 1]);
//             await audioRef.current.play();
//             setPlayStatus(true);
//         }
//     };

//     const seekSong = async (e) => {
//         audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration);
//     };

//     // const getSongsData = async () => {
//     //     const response = await axios.get(`${url}/api/song/list`);
//     //     setSongsData(response.data.songs);
//     //     if (response.data.songs.length > 0) {
//     //         setTrack(response.data.songs[0]); // Set the initial track
//     //     }
//     //     console.log(response.data.songs);
//     // };
//     const getSongsData = async () => {
//         try {
//             const response = await axios.get(`${url}/api/song/list`);
//             const songs = response?.data?.songs; // Optional chaining to safely access nested properties
    
//             if (Array.isArray(songs) && songs.length > 0) { // Check if songs is a valid array
//                 setSongsData(songs);
//                 setTrack(songs[0]); // Set the initial track
//             } else {
//                 console.error("No songs available in the response");
//             }
    
//         } catch (error) {
//             console.error("Error fetching songs data:", error);
//         }
//     };
    
//     const getAlbumsData = async () => {
//         const response = await axios.get(`${url}/api/album/list`);
//         setAlbumData(response.data.albums);
//         console.log(response.data.albums);
//     };

//     useEffect(() => {
//         if (audioRef.current) {
//             audioRef.current.ontimeupdate = () => {
//                 seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%";
//                 setTime({
//                     currentTime: {
//                         second: Math.floor(audioRef.current.currentTime % 60),
//                         minute: Math.floor(audioRef.current.currentTime / 60)
//                     },
//                     totalTime: {
//                         second: Math.floor(audioRef.current.duration % 60),
//                         minute: Math.floor(audioRef.current.duration / 60)
//                     }
//                 });
//             };
//         }
//     }, [audioRef]);

//     useEffect(() => {
//         getSongsData();
//         getAlbumsData();
//     }, []);

//     const contextValue = {
//         audioRef,
//         seekBar,
//         seekBg,
//         track, setTrack,
//         playStatus, setPlayStatus,
//         time, setTime,
//         play, pause,
//         playWithId,
//         previous, next,
//         seekSong,
//         songsData, albumsData
//     };

//     return (
//         <PlayerContext.Provider value={contextValue}>
//             {props.children}
//         </PlayerContext.Provider>
//     );
// };

// export default PlayerContextProvider;

import axios from 'axios';
import { createContext, useEffect, useRef, useState } from "react";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {

    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();
    const url = 'http://localhost:5174';

    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumData] = useState([]);
    const [track, setTrack] = useState(null);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    });

    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    };

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    };

    const playWithId = async (id) => {
        const selectedTrack = songsData.find(item => item._id === id);
        if (selectedTrack) {
            setTrack(selectedTrack);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    };

    const previous = async () => {
        const currentIndex = songsData.findIndex(item => item._id === track._id);
        if (currentIndex > 0) {
            setTrack(songsData[currentIndex - 1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    };

    const next = async () => {
        const currentIndex = songsData.findIndex(item => item._id === track._id);
        if (currentIndex < songsData.length - 1) {
            setTrack(songsData[currentIndex + 1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    };

    const seekSong = async (e) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration);
    };

    // const getSongsData = async () => {
    //     try {
    //         const response = await axios.get(`${url}/api/song/list`);
    //         const songs = response?.data?.songs;

    //         if (Array.isArray(songs) && songs.length > 0) {
    //             setSongsData(songs);
    //             setTrack(songs[0]);
    //         } else {
    //             console.error("No songs available in the response");
    //         }

    //     } catch (error) {
    //         console.error("Error fetching songs data:", error);
    //     }
    // };
    const getSongsData = async () => {
        try {
            const response = await axios.get(`${url}/api/song/list`);
            console.log("Full response:", response);  // Log the full response to check its structure
            const songs = response?.data?.songs;
    
            if (Array.isArray(songs) && songs.length > 0) {
                setSongsData(songs);
                setTrack(songs[0]);
            } else {
                console.error("No songs available in the response");
            }
    
        } catch (error) {
            console.error("Error fetching songs data:", error);
        }
    };
    

    const getAlbumsData = async () => {
        const response = await axios.get(`${url}/api/album/list`);
        setAlbumData(response.data.albums);
        console.log(response.data.albums);
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%";
                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60)
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60)
                    }
                });
            };
        }
    }, [audioRef]);

    useEffect(() => {
        getSongsData();
        getAlbumsData();
    }, []);

    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track, setTrack,
        playStatus, setPlayStatus,
        time, setTime,
        play, pause,
        playWithId,
        previous, next,
        seekSong,
        songsData, albumsData
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;
