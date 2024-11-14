import React, {useEffect, useState} from 'react'
import Image from 'next/image';
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { useRouter } from 'next/router';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
export default function HomeBody({infoData}) {
    const [last_Page, Setlast_Page] = useState(1)
    const [Data, SetData] = useState([])
    const router = useRouter()
    useEffect(()=>{
        if(infoData && Object.keys(infoData).length >0){
            Setlast_Page(infoData.lastPage)
            SetData(infoData.recipes)
        }
    
    },[infoData])

    const handleEdit = (e, id)=>{
        e.preventDefault();
        router.push({
            pathname: '/',
            query: { id: id },
        });
    }

    const handleDelete = (e, id)=>{
        e.preventDefault(); 
        axios.delete("https://expressassesment-production.up.railway.app/api/recipes/"+id, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
             if(response.status == 200){
                router.replace({
                    pathname:"/home"
                }) 
             }
         
        })
    }


    const handlePaginate =(ans)=>{
        let Answer = ans.selected + 1;

            axios.get("https://expressassesment-production.up.railway.app/api/recipes?page="+Answer, {
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                },
            })
            .then((response) => {
                // console.log(response)
                 if(response.status == 201){
                    SetData(response.data.recipes)
                    Setlast_Page(response.data.lastPage)
                 }
             
            })

        }

        const handleSinglePage = (e, id)=>{
          e.preventDefault()
          router.replace({
            pathname:"/recipes/"+id
        }) 
        }
  return (
    <article className='w-full'>
    <div className='w-full  flex flex-col items-center sm:flex sm:flex-col sm:items-center md:flex md:flex-row md:items-center lg:flex lg:flex-row lg:items-center justify-center gap-4'>

        {Data && Data.length > 0?
        Data.map((item, index)=>{
          return <section key={index} className='w-10/12 sm:w-10/12 md:w-2/5 lg:w-2/5 gap-3 rounded-md flex flex-col items-center border py-2 px-2'>
          <div  onClick={(e)=>handleSinglePage(e, item.id)} className='w-full cursor-pointer'>
              <Image src={item.image} width={500} height={300}  className='m-auto' layout="intrinsic" alt='image' />
          </div>
          <section className='px-2 text-base capitalize text-left w-full'  onClick={(e)=>handleSinglePage(e, item.id)} >{item.title}</section>
          <div className='w-full'>
              <span className='w-1/5 float-right flex flex-row items-center gap-2'>
              <button><CiEdit onClick={(e)=>handleEdit(e, item.id)} className='text-lg text-green-500'/></button>
              <button><MdDeleteForever  onClick={(e)=>handleDelete(e, item.id)}  className='text-lg text-red-500' /></button>
              </span>
          </div>
          </section>
        })
        :""}
       

     

      

    </div>
    <div className='w-full flex items-center justify-center mt-4 px-2'>
        <article classNam="w-[40%] m-auto">
        <ReactPaginate
                         containerClassName="w-full  flex flex-row items-center  space-x-2"
                         pageClassName="w-6 w-6 text-xs sm:w-6 sm:w-6 sm:text-xs md:w-8 md:h-8 md:text-sm  lg:w-6 lg:h-6 lg:text-sm grid place-content-center rounded-full bg-[#4C4C4C] text-white hover:bg-blue-500 hover:text-black "
                           pageRangeDisplayed={3}
                           pageCount={last_Page}
                           onPageChange={handlePaginate}
                           nextClassName='text-xs sm:text-xs md:text-base lg:text-base'
                           previousClassName='text-xs sm:text-xs md:text-base lg:text-base'
                           nextLabel="next"
                           previousLabel="prev"
                         />
        </article>
        </div>
    </article>
  )
}
