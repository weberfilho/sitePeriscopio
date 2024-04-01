import Button from '@/components/button/Button'
import Input from '@/components/input/Input'
import Link from 'next/link'
import React from 'react'

const Assessment = () => {
  return (
    <div className='px-8'>
      <div className='flex flex-col mb-8 mt-4'>
        <h1 className='px-4 text-center font-serif font-bold text-4xl'>Avaliar Local</h1>
        <div className='w-full flex flex-row justify-center mb-8 mt-4 '>
          <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEipx3fJ6B3hppoCZ3TjvW2YYpb6Ga07UHwFtQlzsHQqG0NF0isWIrnAoTb0JkwXUQ78Knk0vINNg8rwEnl2uWMkGOHiwdlKQymtsmCMhPyI3Dw5akRYXLOZd333C-Zm_VKLEZMCYpkyoEE/s1600/3+estrelas.png" className='w-64 h-16 p-2 items-end' alt='imagem' />
        </div>
        <Input minHeight="60" labelText= "Digite seu comentário" idInput= "33"/>
        <div className='grid grid-cols-2 gap-8 mt-16'>
        <Link href="/places/placeDetail/1">
          <Button title="CANCELAR" />
        </Link>
        <Link href={"/"}>
          <Button title="ENVIAR" />
        </Link>

        </div>        
      </div>
    </div>
  )
}

export default Assessment