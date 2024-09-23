// import React, { useEffect, useState } from 'react'
// import axios from 'axios';
// import { url } from '../../App';
// import { toast } from 'react-toastify';

// const ListAlbum = () => {

//   const [data, setData] = useState([]);

//   const fetchAlbums = async () => {
//     try {

//       const response = await axios.get(`${url}/api/album/list`);

//       if (response.data.success) {
//         setData(response.data.albums)
//       }

//     } catch (error) {
//       toast.error("Error occur");
//     }
//   }

//   const removeAlbum = async (id) => {
//     try {

//       const response = await axios.post(`${url}/api/album/remove`, { id });

//       if (response.data.success) {
//         toast.success(response.data.message);
//         await fetchAlbums();
//       }

//     } catch (error) {
//       toast.error("Error occur")
//     }
//   }

//   useEffect(() => {
//     fetchAlbums();
//   }, [])

//   return (
//     <div>
//       <p>All Albums List</p>
//       <br />
//       <div className=''>
//         <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
//           <b>Image</b>
//           <b>Name</b>
//           <b>Description</b>
//           <b>Album Colour</b>
//           <b>Action</b>
//         </div>
//         {data.map((item, index) => {
//           return (
//             <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
//               <img className='w-12' src={item.image} alt="" />
//               <p>{item.name}</p>
//               <p>{item.desc}</p>
//               <input type="color" value={item.bgColour} />
//               <p className='cursor-pointer' onClick={() => removeAlbum(item._id)}>x</p>
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }

// export default ListAlbum


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { url } from '../../App';

const ListAlbum = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAlbums = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${url}/api/album/list`);

      if (response.data.success) {
        setData(response.data.albums);
      } else {
        throw new Error("Failed to fetch albums");
      }
    } catch (error) {
      setError("An error occurred while fetching the album list.");
      toast.error(error.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  const removeAlbum = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this album?");
    if (!confirmDelete) return;

    try {
      const response = await axios.post(`${url}/api/album/remove`, { id });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchAlbums(); // Refresh list after deletion
      } else {
        toast.error("Failed to remove album");
      }
    } catch (error) {
      toast.error("Error occurred while removing the album");
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  if (loading) {
    return (
      <div className='grid place-items-center min-h-[80vh]'>
        <div className="w-16 h-16 border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
        <p>Loading albums...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='grid place-items-center min-h-[80vh]'>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <p>All Albums List</p>
      <br />
      <div className=''>
        {/* Album Table Header */}
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album Colour</b>
          <b>Action</b>
        </div>

        {/* Album Data Rows */}
        {data.length > 0 ? (
          data.map((item, index) => (
            <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
              <img className='w-12' src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.desc}</p>
              <input type="color" value={item.bgColour} readOnly />
              <p className='cursor-pointer text-red-600' onClick={() => removeAlbum(item._id)}>Delete</p>
            </div>
          ))
        ) : (
          <div className='p-5 text-gray-500'>
            <p>No albums found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListAlbum;
