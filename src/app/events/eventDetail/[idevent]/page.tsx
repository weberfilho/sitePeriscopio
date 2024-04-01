import Button from '@/components/button/Button'
import Link from 'next/link'
import React from 'react'

interface Props {
  params: { idevent: number }
}

type Event = {
  id: number,
  city: string,
  startDate: string,
  startTime: string,
  endDate: string,
  endTime: string,
  name: string,
  description: string,
  urlTicket: string,
  urlFotos: string,
  contato: string,
  adress: {
    id: number,
    street: string,
    num: number,
    neighborhood: string,
  }
}

const eventDetail = ({params}: Props) => {
  //Fazer um fetch para pegar os dados do evento a partir do ID

  const event: Event = {
    id: 33,
    city: "Belo Horizonte",
    startDate: "24/03",
    startTime: "20:00",
    endDate: "25/03",
    endTime: "04:00",
    name: "Festa da Insanidade",
    description: "Mais um vez, o Montê é a Insanidade se juntam para a alegria de todos!Baile do Montê Insano, vem com o Baile do George Israel com vários convidados, Nega Kely e Dj Elam Moura sacudindo a pista!Não dá para ficar fora dessa Esperamos vocês!",
    urlTicket: "https://www.sympla.com.br",
    urlFotos: "https://images.sympla.com.br/61f187a3d8cb3-xs.jpg",
    contato: "31984839022",
    adress: {
      id: 8,
      street: "Rua das Acácias",
      num: 33,
      neighborhood: "Centro",
    }
  }
  return (
    <div className='px-8 content-center'>
      <div className='flex flex-col'>
      <h1 className='italic font-serif size-fit self-center text-4xl pb-2 font-semibold'>{event.name}</h1>
      <img src={event.urlFotos} className='self-center w-full pt-2' alt='imagem' />
      </div>     
      <p className='py-4 mt-2'>{event.description}</p>
      <p className='pt-4'>Inicio:{` ${event.startDate} as ${event.startTime} Horas`} </p>
      <p className=''>Termino:{` ${event.endDate} ${event.endTime} Horas`} </p>
      <p className='py-4'>Endereço:{` ${event.adress.street}, ${event.adress.num} ${event.adress.neighborhood} -  ${event.city}`} </p>
      <div className='grid grid-cols-2 gap-4'>
        <Link href={event.urlTicket}>
          <Button title="INGRESSOS" />
        </Link>
        <Link href={event.urlTicket}>
          <Button title="CHAT" />
        </Link>
        <Link href={event.contato}>
          <Button title="CONTATO" />
        </Link>
        <Link href={event.urlTicket}>
          <Button title="UBER" />
        </Link>        
      </div>
    </div>
  )
}

export default eventDetail