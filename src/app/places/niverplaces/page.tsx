import NiverCard from '@/components/cards/NiverCard'
import Link from 'next/link'
import React from 'react'

interface PromoData{
  id: number
  placeName: string
  promoDescription: string
  urlImage: string
}


const promoPlaces: PromoData[] = [
  {
    id: 1,
    placeName: "Bar do Orlando",
    promoDescription: " Aniversariantes podem reservar mesa e as condições especiais dependem da quantidade de convidados. Mesa com até 4 convidados dá direito a uma entrada off, um drink tradicional (caipi, gin tônica, mojito ou Moscow Mule) ou 1 chope/long neck. De 5 a 9 convidados, 1 entrada off + 1 drink tradicional ou 2 chopes ou 2 long necks. De 10 a 15 convidados, 2 entradas off, + 2 drinks tradicionais ou 4 chopes ou 4 long necks. De 16 a 20 pessoas, 3 entradas off + 3 drinks tradicionais ou 6 chopes ou 6 long necks.",
    urlImage: "https://lh3.googleusercontent.com/p/AF1QipMh0LHeRpkkcFYY1LlvYDRBokPS827MevFSgPUj=s1360-w1360-h1020"
  },
  {
    id: 2,
    placeName: "Bar do Dudi",
    promoDescription: "O pub não faz reserva de mesas, mas aniversariantes podem entrar em contato para confirmar sua lista de convidados e aproveitar as condições especiais: 10 convidados dão direito a 1 drink da casa + 2 entradas off, enquanto a reserva para 20 convidados rende 1 balde com 6 long necks + 2 entradas off.",
    urlImage: "https://pbs.twimg.com/media/Fn0-xckWYAEUvOQ?format=jpg&name=large"
  },
  {
    id: 3,
    placeName: "Bola Bar",
    promoDescription: "Especialista em chopp e carne de porco, a casa oferece um presente em grupo para aniversariantes que reunirem acima de 10 convidados: são 10 copos de chope pilsen de 300 ml, ou 5 drinks indicados pela casa. ",
    urlImage: "https://soubh.uai.com.br/uploads/thumbnail/image/1762/IMG_8898.jpg"
  },
  {
    id: 4,
    placeName: "Tizé Bar",
    promoDescription: " Aniversários e outras celebrações podem incluir o happy hour que rola de terça a sexta-feira, entre 17h e 20h, com chopps de 500 ml pelo preço dos de 300 ml.",
    urlImage: "https://fastly.4sqi.net/img/general/600x600/V3_aGkoBbVP3hLVGkzC7PJQ2pm6fX8IkqCUELcTItwk.jpg"    
  }
]

// const promoPlaces: PromoData [] => Fazer um Fetch para preencher esta variável
// id da cidade que ta na variavel global pegando todos os estabelecimentos com promoção para 

//aniversariantes

const NiverPlaces = () => {
  return (
    <div >
    <h1 className='text-center  font-serif font-bold text-2xl'>PROMOÇAO</h1>
    <h1 className='p-4 pt-1 text-center  font-serif font-bold text-2xl'>ANIVERSARIANTES</h1>
    <div className=' h-dvh overflow-auto'>
    <ul className=''>
      {
        promoPlaces.map(promo => (
          <li key={promo.id} className='mx-2' >
            <Link href={`../../places/placeDetail/${promo.id}`}>
              <NiverCard namePlace={promo.placeName} promoDescription={promo.promoDescription} urlImage={promo.urlImage} />
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

export default NiverPlaces