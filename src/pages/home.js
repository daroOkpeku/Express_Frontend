import HomeBody from '@/components/HomeBody'
import Navbar from '@/components/Navbar'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
export default function Home() {
const [infoData, SetinfoData] = useState(null)
    useEffect(()=>{
        axios.get("https://expressassesment-production.up.railway.app/api/recipes?page="+1, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            // console.log(response)
             if(response.status == 201){
                SetinfoData(response.data)
             }
         
        })
    },[])


  return (
    <div className='w-full flex flex-col items-center'>
     <Navbar/>
     {infoData? 
     <HomeBody infoData={infoData} />
     :""}
     
    </div>
  )
}
