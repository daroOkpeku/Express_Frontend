//   
import React,{useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';
export default function RecipesDetails() {
    let router = useRouter()
    const { id } = router.query
   const [Data, SetData] = useState(null)   
    useEffect(()=>{
        if(id){
            axios.get("https://expressassesment-production.up.railway.app/api/recipes/"+id, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                console.log(response)
                 if(response.status == 200){
                    // SetinfoData(response.data)
                    SetData(response.data.success)
                 }
             
            })
        }
    },[id])
    console.log(Data)
  return (
   
    <div className='w-full flex flex-col  gap-4'>
         <section className='w-10/12 m-auto '>
         <h2 className='text-lg font-semibold capitalize text-center underline'>{Data? Data.title :""}</h2>
         </section>
        <section className='w-10/12 m-auto rounded-md '>
        {Data ?<Image  src={Data.image} width={400} height={100} className='w-full  object-cover' layout="intrinsic" alt='image' />:"" }
        </section>
        <div className='w-10/12 flex flex-col gap-3 m-auto rounded-md '>
          <span className='font-medium text-base'>Ingredients: {Data?Data.ingredients:""}</span>
          <span  className='font-medium text-base'>Servings: {Data?Data.servings:""}</span>

          <h2 className='mt-5 text-center font-bold text-lg capitalize'>instructions</h2>
          <article className='text-base font-medium capitalize text-center sm:text-center md:text-justify lg:text-justify '>
          {Data?Data.instructions:""}
          </article>
        </div>
        </div>
  )
}
