import React from 'react'

interface Comment {
  id: number
  userName: string
  commentText: string
  rating: number
  date: string
}

const CommentCard = (props: Comment) => {
  return (
    <div className='px-2 py-1 my-2 flex flex-col rounded-xl border-solid border-2 shadow-md border-black  shadow-gray-500' >
      <div className='flex flex-row w-full justify-between'>
        <h1 className='font-serif text-2xl italic font-bold'>{props.userName}</h1>        
        <img src="https://www.pngmart.com/files/7/Rating-Star-PNG-Background-Image.png" className='w-1/4 h-8 p-2' alt='imagem' />     
        
      </div>
      <p>{props.commentText}</p>

      <div className='flex flex-col w-full p-2'>        
        <h3 className='flex flex-row mt-2 justify-end text-lg'>{props.date}</h3>
      </div>
    </div>
  )
}

export default CommentCard