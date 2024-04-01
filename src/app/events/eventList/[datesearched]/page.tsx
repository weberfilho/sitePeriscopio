import EventCard from '@/components/cards/EventCard'
import Link from 'next/link'
import React from 'react'

interface Event {
  id: number
  eventName: string
  startDate: string
  placeName: string
  urlImage:string
}

const events: Event[] = [
  {
    id: 33,
    eventName: "Festa da Insanidade",
    startDate: "24",
    placeName: "Mercado do Cruzeiro",
    urlImage: "https://images.sympla.com.br/61f187a3d8cb3-xs.jpg"
  },
  {
    id: 36,
    eventName: "Baile do Birico",
    startDate: "24",
    placeName: "Casa Rosa do Bonfin",
    urlImage: "https://event-kraken.s3.amazonaws.com/event/posters/70673/large.jpg"
  },
  {
    id: 3,
    eventName: "Baile do Secreto",
    startDate: "24",
    placeName: "Galpão 104",
    urlImage: "https://soubh.uai.com.br/uploads/event/image/22218/85101659_3388181624590482_9081712006704136192_o.jpg"
  },
  {
    id: 37,
    eventName: "Sexta Rock",
    startDate: "24",
    placeName: "Jack Rock Bar",
    urlImage: "https://rockinbh.com.br/wp-content/uploads/2024/03/428688089_18416110378031841_1016505353450858626_n-820x1024.jpg"
    
  },
  {
    id: 13,
    eventName: "Noite do Torresmo",
    startDate: "24",
    placeName: "Mercado Novo",
    urlImage: "https://s3-sa-east-1.amazonaws.com/lets.events-production/events/photos/276/180/61-/cover/SextaJackApp04-05.png"
  },

]
interface Props {
  params: { eventDate: number }

}

const eventList = () => {

  // const events: Event[] => Fazer um Fetch para preencher esta variável
 //a partir do eventDate que foi passado e do id da cidade que estar na variavel global
  return (
    <div>
      <div >
      <h1 className='p-10 text-center  font-serif font-bold text-2xl'>{"BARES E BOTECOS"}</h1>
      <ul>
        {
          events.map(event => (
            <li key={event.id} className='mx-2' >
              <Link href={`../../../events/eventDetail/${event.startDate}`}>
                <EventCard name={event.eventName} local={event.placeName} startDate ={event.startDate} urlImage={event.urlImage} />
              </Link>              
            </li>
          )
          )
        }
      </ul>
    </div>
    </div>
  )
}

export default eventList