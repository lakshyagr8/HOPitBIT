import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { url } from '../../App';
import { assets } from '../../assets/assets';
// export const url = 'http://localhost:5173'; // Backend server URL

const AddAlbum = () => {
  const [image, setImage] = useState(null);
  const [colour, setColour] = useState("#ffffff"); // Default color
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    // Validate that all fields are provided
    if (!name || !desc || !image || !colour) {
      toast.error("Please fill in all fields and upload an image.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("image", image); // Image file
      formData.append("bgColour", colour);

      // Log the form data for debugging
      console.log("Form Data:", { name, desc, image, colour });

      // Send the POST request to the backend
      const response = await axios.post(`${url}/api/album/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (response.data.success) {
        toast.success("Album added successfully!");
        resetForm();
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
      } catch (error) {
        console.error("Error adding album:", error);

      if (error.response) {
        // API responded with an error
        if (error.response.status === 404) {
          toast.error("API endpoint not found (404)");
        } else if (error.response.status === 400) {
          toast.error("Bad request. Check the data you are sending.");
        } else {
          toast.error(`Error: ${error.response.status}`);
        }
      } else if (error.request) {
        // No response received
        toast.error("Network error. Could not reach the server.");
      } else {
        // Other errors
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setDesc("");
    setImage(null);
    setColour("#ffffff"); // Reset to default color
  };

  if (loading) {
    return (
      <div className='grid place-items-center min-h-[80vh]'>
        <div className="w-16 h-16 border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-start gap-8 text-gray-600'>
      <div className="flex flex-col gap-4">
        <p>Upload Image</p>
        <input 
          onChange={(e) => setImage(e.target.files[0])} 
          type="file" 
          id='image' 
          accept='image/*' 
          hidden 
        />
        <label htmlFor="image">
          <img 
            className='w-24 cursor-pointer' 
            src={image ? URL.createObjectURL(image) : assets.upload_area} 
            alt="Album Preview" 
          />
        </label>
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Album Name</p>
        <input 
          className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]'
          onChange={(e) => setName(e.target.value)} 
          value={name} 
          type="text" 
          placeholder='Type here' 
          required 
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Album Description</p>
        <input 
          className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]'
          onChange={(e) => setDesc(e.target.value)} 
          value={desc} 
          type="text" 
          placeholder='Type here' 
          required 
        />
      </div>

      <div className="flex flex-col gap-3">
        <p>Background Colour</p>
        <input 
          onChange={(e) => setColour(e.target.value)} 
          value={colour} 
          type="color" 
        />
      </div>

      <button 
        className='text-base bg-black text-white py-2.5 px-14 cursor-pointer' 
        type='submit'>
        ADD
      </button>
    </form>
  );
};

export default AddAlbum;
