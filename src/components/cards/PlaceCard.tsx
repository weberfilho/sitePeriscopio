import React from 'react'

type placeResume = { name: string, neighborhood: String, city: string, urlImage: string }

const PlaceCard = (props: placeResume) => {
  return (
    <div className='px-2 py-1 my-2 flex flex-row rounded-xl border-solid border-2 shadow-md border-black  shadow-gray-500' >
      <div className='w-1/4'>
        <img src={props.urlImage} className='w-32 h-32 p-2' alt='imagem' />
      </div>
      <div className='flex flex-col p-2 w-3/4'>
        <h1 className='font-serif text-2xl italic font-bold'>{props.name}</h1>
        <div className='inline'>
          <h3 className='inline font-bold text-lg '>Bairro: </h3>
          <h3 className='mt-2 text-lg inline'>{`${props.neighborhood}, ${props.city} - MG`}</h3>
        </div>
      </div>

    </div>


  )
}

export default PlaceCard