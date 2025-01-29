import React from "react";

type Evento = {name:String, local:String , startDate:Date | string, urlImage: string}

const EventCard = (props: Evento) => {

  return (
    <div className='px-2 py-1 my-2 flex flex-row rounded-xl border-solid border-2 shadow-md  shadow-gray-500 border-black'>
      <div className='w-1/4'>
        <img src={props.urlImage} className='w-32 h-32 p-2' alt='imagem' />
      </div>
      <div className='flex flex-col p-2 w-3/4'>
        <h1 className='font-serif text-2xl italic font-bold'>{props.name}</h1>
        <h3 className='flex flex-row mt-2 text-lg'>{`Data: ${props.startDate}`}</h3>
        <h3 className='flex flex-row mt-2 text-lg'>{`Local: ${props.local}`}</h3>
      </div> 

    </div>
 
  )
}
export default EventCard
