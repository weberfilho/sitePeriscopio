import Button from '@/components/button/Button'
import Link from 'next/link'
import React from 'react'

interface Props {
  params: { idplace: number }
}

type Place = {
  id: number,
  city: string,
  category: string,
  name: string,
  description: string,
  urlMenu: string,
  urlJuckebox: string,
  urlFotos: string,
  contato: string,
  niverPromo: string
  adress: {
    id: number,
    street: string,
    num: number,
    neighborhood: string,
  }
}

function placeDetail({ params }: Props) {
  //Fazer um fetch para pegar os dados do estabelecimento a partir do ID

  const place: Place = {
    id: 3,
    city: "Belo Horizonte MG",
    category: "Bares e Botecos",
    name: "Bar do Orlando",
    description: "Bar do Orlando é o típico buteco mineiro, repleto de bons tira-gostos, cerveja gelada e uma boa prosa. Foi inaugurado originalmente como uma loja de artigos de pesca, já que na época da fundação ainda era possível tirar traíras e lambaris do Rio Arrudas, ali pertinho. Hoje, as prateleiras acomodam itens de mercearia, como sabão em pó e enlatados. O menu conta com porção de batatas assadas, torresmo de barriga e linguiça da roça com batata, além de espetinhos.",
    urlMenu: "https://mercearia130.pedidosite.com.br/delivery/montarModal?idProduto=290621",
    urlJuckebox: "https://open.spotify.com/playlist/37i9dQZF1DWTUHOvJwQIMp",
    urlFotos: "https://www.google.com.br",
    contato: "319847856575",
    niverPromo: "Aniversariantes com mais de 10 convidados ganham 15 chopps de 300 ml ou 2 drinks.",
    adress: {
      id: 2,
      street: "Rua Alvinópolis",
      num: 74,
      neighborhood: "Santa Tereza"
    }
  }
  return (
    <div className='px-8 content-center'>
      <div className='flex flex-col'>
        <h1 className='italic font-serif size-fit self-center text-4xl font-semibold'>{place.name}</h1>
        <img src='https://maisbaqueiro.files.wordpress.com/2015/06/35estrelas.jpg' className='self-center w-32 pt-2' alt='imagem' />
      </div>
      <div className='p-x-2 shadow-fuchsia-800 pt-2 mt-4 flex flex-col rounded-xl border-solid border-2 shadow-md'>
        <h1 className='font-serif text-md italic font-bold self-center'>ANIVERSARIANTES</h1>
        <p className='flex flex-row text-md px-4'>{place.niverPromo}</p>
      </div>
      <p className='py-4 mt-1'>{place.description}</p>
     
      <p className='pb-4'>Endereço:{` ${place.adress.street}, ${place.adress.num} ${place.adress.neighborhood} -  ${place.city}`} </p>
      <div className='grid grid-cols-2 gap-4'>
        <Link href="../../../places/placeList/1">
          <Button title="AGENDA" />
        </Link>
        <Link href={place.urlFotos}>
          <Button title="FOTOS" />
        </Link>
        <Link href={place.urlJuckebox}>
          <Button title="JUCKEBOX" />
        </Link>
        <Link href={place.urlMenu}>
          <Button title="CARDAPIO" />
        </Link>
        <Link href="/places/placeComents/1">
          <Button title="AVALIAÇÕES" />
        </Link>
        <Link href={place.contato}>
          <Button title="CONTATO" />
        </Link>
      </div>
    </div>

  )
}

export default placeDetail