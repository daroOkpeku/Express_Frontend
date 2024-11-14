import React from 'react'
import { useRouter } from 'next/router';
export default function Navbar() {
    const router = useRouter()
    const pages = [
        {
            title:'home',
            link:'home'
        },
        {
            title:'create recipes',
            link:'/'
        }
    ]
    const handleNextPage = (e, link)=>{
    e.preventDefault();
    router.replace({pathname:`/${link}`})
    }
  return (
    <div className='w-full flex justify-center items-center'>
        <ul className=' w-3/4 m-auto flex flex-row justify-center py-3 items-center space-x-3 '>
        {pages.map((item, index)=>{
          return <li className='text-base  cursor-pointer' key={index} onClick={(e)=>handleNextPage(e,item.link)}>{item.title}</li>

        })}
            
        </ul>
   </div>
  )
}
