import React,{useEffect, useState} from 'react'
import Popup from './More/Popup'
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/router';
export default function Create_body({SingleData, id}) {
    const [title, Settitle] = useState("")
    const [ingredients, Setingredients] = useState("")
    const [servings, Setservings] = useState("")
    const [image, Setimage] = useState(null)
    const [editimage, Seteditimage] = useState(null)
    const [instructions, Setinstructions] = useState("")
   const [isedit, Setisedit] = useState(false)
   const [isprocessing, Setisprovessing] = useState(false)
   const [message, Setmessage] = useState('')
   const [isShow, SetisShow]  = useState(false)
   const router = useRouter()
   useEffect(()=>{
    if(SingleData){
      Setisedit(true)
      console.log(SingleData)
      Settitle(SingleData.title)
      Setingredients(SingleData.ingredients)
      Seteditimage(SingleData.image)
      Setinstructions(SingleData.instructions)
      Setservings(SingleData.servings)
    }
   },[SingleData])


   const handleUploadImage = async(img)=>{
    
     const formData = new FormData();
    formData.append("image", img);
   const upload = await axios.post("https://expressassesment-production.up.railway.app/api/image_upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      })

      const picx =  upload.status === 200?upload.data.success:""

      console.log(picx)

      return picx

   }
 
    const handleSubmit = async(e)=>{
        e.preventDefault();
        Setisprovessing(true)

        let ansimg = await handleUploadImage(image)
         const formData = new FormData();
        formData.append("title", title);
        formData.append("ingredients", ingredients);
        formData.append("servings", ingredients);
        formData.append("instructions", instructions);
        formData.append("image", ansimg);

        axios.post("https://expressassesment-production.up.railway.app/api/recipes", formData, {
        headers: {
          "Content-Type": "application/json",
        },
        })
        .then((response) => {
            console.log(response);
            if(response.status == 201){
                Setisprovessing(false)
                Setmessage(response.data.success)
                SetisShow(true)
                setTimeout(()=>{
                  router.replace({
                    pathname:"/home"
                }) 
                },1000)
            }else{
                Setisprovessing(false)
                Setmessage(response.data.message) 
                SetisShow(true)
            }
        })
        .catch((error) => {
            if(error.status == 400){
                Setisprovessing(true)
                Setmessage(error.response.data.message)
                SetisShow(true)
            }
        });

        
    }

    const handleEdit = async(e)=>{
        e.preventDefault()
        Setisprovessing(true)
        let ansimg = image?await handleUploadImage(image):editimage
         const formData = new FormData();
        formData.append("title", title);
        formData.append("ingredients", ingredients);
        formData.append("servings", ingredients);
        formData.append("instructions", instructions);
        formData.append("image", ansimg);
        // formData.append("_method", "PUT")
        axios.put(`https://expressassesment-production.up.railway.app/api/recipes/${id}`, formData, {
        headers: {
            "Content-Type": "application/json",
        },
        timeout: 10000,
        })
        .then((response) => {
            console.log(response);
            if(response.status == 200){
                Setisprovessing(false)
                Setmessage(response.data.success)
                SetisShow(true)
                setTimeout(()=>{
                  router.replace({
                    pathname:"/home"
                }) 
                },1000)
            }else{
                Setisprovessing(false)
                Setmessage(response.data.message) 
                SetisShow(true)
            }
        })
        .catch((error) => {
            if(error.status == 400){
                Setisprovessing(false)
                Setmessage(error.response.data.message)
                SetisShow(true)
            }
        });

    }
  return (
    <div className='w-full flex items-center justify-center'>

        <section className=' w-full  overflow-scroll sm:w-10/12 sm:overflow-scroll md:w-1/2 md:overflow-hidden lg:w-1/2 lg:overflow-hidden flex flex-col  gap-4 items-center rounded-md'>
        
        <article className='w-11/12 flex flex-col items-center'>
          <section className='w-full text-left text-lg capitalize'>title <a className='text-red-500'>*</a></section>
          <article className='w-full'>
            <input type='text' value={title} onChange={(e)=>Settitle(e.target.value)} className='w-full p-2 rounded-md border' />
          </article>
        </article>


        <article className='w-11/12 flex flex-col items-center'>
          <section className='w-full text-left text-lg capitalize'>ingredients </section>
          <article className='w-full'>
            <input type='text' value={ingredients} onChange={(e)=>Setingredients(e.target.value)} className='w-full p-2 rounded-md border' />
          </article>
        </article>

        <article className='w-11/12 flex flex-col items-center'>
          <section className='w-full text-left text-lg capitalize'>servings </section>
          <article className='w-full'>
            <input type='text' value={servings}  onChange={(e)=>Setservings(e.target.value)} className='w-full p-2 rounded-md border' />
          </article>
        </article>

        <article className='w-11/12 flex flex-col items-center'>
          <section className='w-full text-left text-lg capitalize'>Image </section>
          <article className='w-full'>
            <input type='file'  onChange={(e)=>Setimage(e.target.files[0])} className='w-full p-2 rounded-md border' />
          </article>
         {editimage&&<span><Image src={editimage} width={80} height={60} alt="image" /></span>} 
        </article>

        <article className='w-11/12 flex flex-col items-center'>
          <section className='w-full text-left text-lg capitalize'>instructions </section>
          <article className='w-full'>
          <textarea value={instructions}  onChange={(e)=>Setinstructions(e.target.value)} name="instructions" className='border' rows="4" cols="100">
          </textarea>
          </article>
        </article>


        <article className='w-10/12 flex flex-col items-center'>
        {isedit? 
      <button  onClick={(e)=>handleEdit(e)} className='w-full bg-blue-500 text-white text-base text-center rounded-md py-3'>{isprocessing?"Please wait..": "Edit"}</button>
        :
        <button  onClick={(e)=>handleSubmit(e)} className='w-full bg-blue-500 text-white text-base text-center rounded-md py-3'> {isprocessing?"Please wait..": "Submit"} </button>

        }
         </article>
        
        </section>
   <Popup  message={message}/>
    </div>
  )
}
