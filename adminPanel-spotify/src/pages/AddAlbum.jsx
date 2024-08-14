import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify';
import { url } from '../App';

const AddAlbum = () => {

    const [image,setImage] = useState(false);
    const [name,setName] = useState("");
    const [desc,setDesc] = useState("");
    const [colour,setColour] = useState("#ffffff");
    const [loading,setLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        
      e.preventDefault();
      setLoading(true);

      try {
        const formData = new FormData();

        formData.append('name', name);
        formData.append('desc', desc);
        formData.append('image', image);
        formData.append('bgColor', colour);

        const response = await axios.post(`${url}/api/album/add`, formData);

        if (response.data.success) {
          toast.success("New Album Added!");
          setName("");
          setDesc("");
          setImage(false);
          setColour("#ffffff");
        } else {
          toast.error("Something went wrong")
        }

      } catch (error) {
        toast.error("Error Occured")
      }
      setLoading(false);
    }

  return loading ?
      (<div className=' grid place-items-center min-h-[80vh]'>
        <div className=' w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin'></div>
      </div>) :
   (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-start gap-8 text-gray-700'>
      <div className='flex flex-col gap-4'>
        <p>Upload Image</p>
        <input onChange={(e) => setImage(e.target.files[0])} id='image' type="file" accept='image/*' hidden />
        <label htmlFor="image">
          <img className=' w-24 cursor-pointer' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
        </label>
      </div>

      <div className=' flex flex-col gap-2.5'>
        <p>Album Name</p>
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" className='bg-transparent outline-green-700 border-2 border-gray-400 rounded-lg p-2.5 w-[max(40vw,250px)]' />
      </div>

      <div className=' flex flex-col gap-2.5'>
        <p>Album Description</p>
        <input value={desc} onChange={(e) => setDesc(e.target.value)} type="text" className='bg-transparent outline-green-700 border-2 border-gray-400 rounded-lg p-2.5 w-[max(40vw,250px)]' />
      </div>

      <div className=' flex flex-col gap-3'>
        <p>Background Colour</p>
        <input value={colour} onChange={(e) => setColour(e.target.value)} type="color" />
      </div>

      <button type='submit' className=' text-base bg-black text-white py-2.5 px-14 rounded-2xl cursor-pointer hover:bg-slate-600'>ADD</button>

    </form>
  )
}

export default AddAlbum
