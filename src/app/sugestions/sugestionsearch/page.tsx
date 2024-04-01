import Button from '@/components/button/Button'
import Link from 'next/link'
import React from 'react'

const sugestionSearch = () => {
  return (
    <div className='px-8 content-center'>
      <h1 className='p-4 text-center  font-serif font-bold text-4xl'>Contamos com você!</h1>
      <h3 className='py-4 text-lg'>
        A comunidade Periscópio está cada dia maior. E para que a gente possa continuar oferecendo as melhores dicas de diversão da cidade precisamos da sua ajuda.
        Caso você conheça algum evento ou estabelecimento de destaque, pedimos a gentileza de sugerí-lo através dos botões abaixo.
      </h3>
      <div className='grid grid-col-2 gap-8 mt-16'>
      <Link href={`/sugestions/sugestion/1`}>
        <Button title="SUGERIR EVENTO" />
      </Link>
      <Link href={`/sugestions/sugestion/2`}>
        <Button title="SUGERIR LOCAL" />
      </Link>
      </div>
    </div>
  )
}
export default sugestionSearch