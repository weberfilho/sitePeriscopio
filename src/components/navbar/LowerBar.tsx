import Link from 'next/link'
import React from 'react'

const LowerBar = () => {
  return (
    <div>
      <nav className='grid grid-cols-5 gap-2 mt-4 py-8 justify-items-center'>
        <Link href="/">
          <img src='/home.ico' className='self-center w-8 pt-2' alt='imagem' />
        </Link>
        <Link href="/sugestions/sugestionsearch">
          <img src='/sugestion.ico' className='self-center w-8 pt-2' alt='imagem' />
        </Link>

        <img src='/city.ico' className='self-center w-8 pt-2' alt='imagem' />

        <Link href="/places/niverplaces">
          <img src='/birthday2.ico' className='self-center w-8 pt-2' alt='imagem' />
        </Link>
        <Link href="/login/signin">
          <img src='/profile.ico' className='self-center w-8 pt-2' alt='imagem' />
        </Link>


      </nav>
    </div>
  )
}
export default LowerBar