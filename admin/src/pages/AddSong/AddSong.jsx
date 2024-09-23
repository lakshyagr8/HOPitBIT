
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { url } from '../../App'
import { assets } from '../../assets/assets'

const AddSong = () => {

  const [image, setImage] = useState(false);
  const [song, setSong] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [album, setAlbum] = useState("none");
  const [loading, setLoading] = useState(false);
  const [albumData, setAlbumData] = useState([]); // Initialize as an empty array

  // Submit handler for adding the song
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("image", image);
      formData.append("audio", song);
      formData.append("album", album);

      const response = await axios.post(`${url}/api/song/add`, formData);

      if (response.data.success) {
        toast.success("Song Added Successfully");
        setName("");
        setDesc("");
        setAlbum("none");
        setImage(false);
        setSong(false);
      } else {
        toast.error("Something went wrong while adding the song");
      }
    } catch (error) {
      toast.error("Error occurred while adding the song");
    } finally {
      setLoading(false);
    }
  };

  // Function to load album data from the API
  const loadAlbumData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      if (response.data && response.data.albums) {
        setAlbumData(response.data.albums);
      } else {
        setAlbumData([]); // Fallback to empty array
        toast.warn("No albums found");
      }
    } catch (error) {
      toast.error("Failed to load albums");
      setAlbumData([]); // Set an empty array on failure to avoid further errors
    }
  };

  // Load the album data once the component mounts
  useEffect(() => {
    loadAlbumData();
  }, []);

  // Render loading spinner if the form is submitting
  if (loading) {
    return (
      <div className='grid place-items-center min-h-[80vh]'>
        <div className="w-16 h-16 border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-start gap-8 text-gray-600'>
      <div className='flex gap-8'>
        {/* Song Upload */}
        <div className="flex flex-col gap-4">
          <p>Upload Song</p>
          <input onChange={(e) => setSong(e.target.files[0])} type="file" id='song' accept='audio/*' hidden />
          <label htmlFor="song">
            <img className='w-24 cursor-pointer' src={song ? assets.upload_added : assets.upload_song} alt="" />
          </label>
        </div>

        {/* Image Upload */}
        <div className="flex flex-col gap-4">
          <p>Upload Image</p>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' accept='image/*' hidden />
          <label htmlFor="image">
            <img className='w-24 cursor-pointer' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
        </div>
      </div>

      {/* Song Name Input */}
      <div className="flex flex-col gap-2.5">
        <p>Song Name</p>
        <input
          className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]'
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder='Enter song name'
          required
        />
      </div>

      {/* Song Description Input */}
      <div className="flex flex-col gap-2.5">
        <p>Song Description</p>
        <input
          className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]'
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          type="text"
          placeholder='Enter song description'
          required
        />
      </div>

      {/* Album Selection */}
      <div className="flex flex-col gap-2.5">
        <p>Album</p>
        <select
          className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[150px]'
          onChange={(e) => setAlbum(e.target.value)}
          value={album}
        >
          <option value="none">None</option>
          {albumData.length > 0 ? (
            albumData.map((item, index) => (
              <option key={index} value={item.name}>{item.name}</option>
            ))
          ) : (
            <option value="none" disabled>No albums available</option>
          )}
        </select>
      </div>

      {/* Submit Button */}
      <button className='text-base bg-black text-white py-2.5 px-14 cursor-pointer' type='submit'>
        ADD
      </button>
    </form>
  );
};

export default AddSong;

