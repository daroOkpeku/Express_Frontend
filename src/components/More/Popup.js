import React from 'react'

export default function Popup({isShow, message}) {
    return (
        <div className={isShow?'w-full top-0 left-0 right-0 bottom-0 z-50 fixed bg-cover bg-black bg-opacity-10  backdrop-blur-[2px] flex flex-row items-center justify-center':'hidden'}  >

        
        <section className='bg-white rounded-md w-10/12 sm:w-3/5 md:w-1/2 lg:w-2/5 mt-10 flex flex-col items-center justify-center gap-4 py-4'>

        <div className='w-full flex flex-col items-center justify-center mt-2'>
            <span className='w-24 h-24 flex items-center justify-center m-auto'>

            </span>
            <span className='w-full text-center flex items-center justify-center  text-sm sm:text-base md:text-2xl lg:text-2xl font-semibold capitalize'>{message?message:message}</span>

        </div>
    
          
        </section>


        </div>
    )
}