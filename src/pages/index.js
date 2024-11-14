import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Create_body from "@/components/Create_body";
import { useRouter } from 'next/router'
import axios from "axios";
export default function Home() {
  const router = useRouter()
  const { id } = router.query
const [SingleData, SetSingleData] = useState(null)
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
          SetSingleData(response.data.success)
            // SetinfoData(response.data)
            // SetData(response.data.success)
         }
     
    })
    }
  },[id])
  return (
  <div className="w-full flex flex-col items-center">
    <Navbar />
     <Create_body SingleData={SingleData} id={id} />
  </div>
  );
}
