import React from 'react'

type PromoInfo = { namePlace: String, promoDescription: string, urlImage: string }

const NiverCard = (props: PromoInfo) => {
  return (
    <div className='px-2 py-1 my-2 flex flex-row rounded-xl border-solid border-2 shadow-md border-black  shadow-gray-500' >
      <div className='w-1/4'>
        <img src={props.urlImage} className='w-32 h-32 p-2' alt='imagem' />
      </div>
      <div className='flex flex-col p-2 w-3/4'>
        <h1 className='font-serif text-2xl italic font-bold'>{props.namePlace}</h1>
        <h3 className='flex flex-row mt-2 text-lg'>{props.promoDescription}</h3>
      </div>
    </div>
  )
}
export default NiverCard