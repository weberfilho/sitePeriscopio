import Button from '@/components/button/Button'
import CommentCard from '@/components/cards/CommentCard'
import Link from 'next/link'
import React from 'react'

interface Comment {
  id: number
  userName: string
  commentText: string
  rating: number
  date: string
}

const coments: Comment[] = [
  {
    id: 1,
    userName: "Weber",
    commentText: "Adorei o bar. Tinha tempos que eu pretendia conhecer o Bar do Orlando, pela fama da tradição, e finalmente tive oportunidade. E eu adorei que ele não usa essa tradição e os mais de 100 anos de funcionamento como argumento pra cobrar caro pelas coisas. Achei tudo muito acessível e gostoso, como todo bar raiz deve ser. Além disso, ele fica em frente a uma pracinha super deliciosa e bem arborizada. Voltarei muitas vezes!!!",
    rating: 3.5,
    date: "24/03/2024"
  },
  {
    id: 2,
    userName: "Denga",
    commentText: "Bar antigo e muito legal em Santa Tereza, que junta muita gente nos arredores também. Ponto forte pra mim lá é a comida. O torresmo e o pastel de angu estão certamente entre os melhores de Belo Horizonte.",
    rating: 5,
    date: "12/11/2021"
  },
  {
    id: 3,
    userName: "Toto",
    commentText: "Preço justo e ambiente top, as opções de tira gosto também são bacanas, mas a mandioca assada não estava sequinha.",
    rating: 3,
    date: "12/11/2022"
  },
  {
    id: 4,
    userName: "Branca",
    commentText: "Bar mais antigo de BH, ótimo atendimento e excelente tira gosto! Quem vem à BH ou mora aqui, tem a obrigação de conhecer o Bar, ponto dos melhores que tem na cidade!",
    rating: 4,
    date: "12/10/2022"
  },
  {
    id: 5,
    userName: "Preta",
    commentText: "Particularmente esperava mais, pq bons comentários geram expectativas. Mas achei bem ok. Legal é q fica numa quebrada mais deslocada e descolada. Mas nota 7/10 na escala eu de butecos",
    rating: 4,
    date: "22/01/2021"
  }
]

interface Props {
  params: { idplace: number }
}



const CommentsList = (props: Props) => {

  //Fazer um fetch para pegar a lista de comentarios com o parametro idplace

  return (
    <div className='px-2'>
      <div className='flex flex-col mb-8 mt-4'>
        <h1 className='px-4 text-center font-serif font-bold text-4xl'>Bar do Orlando</h1>
        <div className='w-full flex flex-row justify-center '>
          <img src="https://www.pngmart.com/files/7/Rating-Star-PNG-Background-Image.png" className='w-36 h-12 p-2 items-end' alt='imagem' />
        </div>
        <p className=' w-fit self-center'>(790 Comentários)</p>
      </div>
      <ul className='mb-8'>
        {
          coments.map(comment => (
            <li key={comment.id} className='mx-2' >
              <CommentCard id={comment.id} userName={comment.userName} commentText={comment.commentText} rating={comment.rating} date={comment.date} />
            </li>
          )
          )
        }
      </ul>
      <Link href ={`/places/placeAssessment/${props.params.idplace}`} className='' >
      <Button title='AVALIAR ESTE LOCAL'/>
      </Link>     
      
    </div>
  )
}

export default CommentsList