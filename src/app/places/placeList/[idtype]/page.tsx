import Link from 'next/link'
import React from 'react'
import PlaceCard from '@/components/cards/PlaceCard'
import Globals from '@/components/global/Globals'

interface Place {
  id: number
  placeName: string
  city: string
  neighborhood: string
  urlImage: string
}


const places: Place[] = [
  {
    id: 1,
    placeName: "Bar do Orlando",
    city: "Belo Horizonte",
    neighborhood: "Santa Tereza",
    urlImage: "https://lh3.googleusercontent.com/p/AF1QipMh0LHeRpkkcFYY1LlvYDRBokPS827MevFSgPUj=s1360-w1360-h1020"
  },
  {
    id: 2,
    placeName: "Bar do Dudi",
    city: "Belo Horizonte",
    neighborhood: "Sion",
    urlImage: "https://pbs.twimg.com/media/Fn0-xckWYAEUvOQ?format=jpg&name=large"
  },
  {
    id: 3,
    placeName: "Bola Bar",
    city: "Belo Horizonte",
    neighborhood: "Serra",
    urlImage: "https://soubh.uai.com.br/uploads/thumbnail/image/1762/IMG_8898.jpg"
  },
  {
    id: 4,
    placeName: "Tizé Bar",
    city: "Belo Horizonte",
    neighborhood: "Lourdes",
    urlImage: "https://fastly.4sqi.net/img/general/600x600/V3_aGkoBbVP3hLVGkzC7PJQ2pm6fX8IkqCUELcTItwk.jpg"
    
  }
]
interface Props {
  params: {idtype:number}

}

const placeList = ({params}: Props) => {
  
const cidade: string = Globals.cityName
const idType: number = params.idtype

// const constPlacesBD: Place => Fazer um Fetch para preencher esta variável
//a partir do idtype que foi passado e do id da cidade que ta na variavel global

  return (
    <div >
      <h1 className='p-10 text-center  font-serif font-bold text-2xl'>{"BARES E BOTECOS"}</h1>
      <ul>
        {
          places.map(place => (
            <li key={place.id} className='mx-2' >
              <Link href={`../../places/placeDetail/${place.id}`}>
                <PlaceCard name={place.placeName} neighborhood={place.neighborhood} city={place.city} urlImage={place.urlImage} />
              </Link>              
            </li>
          )
          )
        }
      </ul>
    </div>
  )
}

export default placeList