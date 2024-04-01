import Button from '@/components/button/Button'
import Input from '@/components/input/Input'
import Link from 'next/link'
import React from 'react'

const SignIn = () => {
  return (
    <div className='px-8 content-center'>
      <div className='flex flex-col'>
        <h1 className='mt-4 italic font-serif size-fit self-center text-4xl pb-2 font-semibold'>Login
        </h1>
      </div>
      <div className='mt-8' >
        <Input minHeight="12" labelText="Email" idInput= "1"/>
        <Input minHeight="12" labelText="Senha" idInput= "2" />
        <Link href="../signup">Esqueci minha senha</Link>     

      </div>
      <div className='grid grid-cols-2 gap-4 mt-12'>
        <Link href="/login/signup">
          <Button title="CADASTRAR" />
        </Link>
        <Link href="">
          <Button title="ENTRAR" />
        </Link>
      </div>
    </div>
  )
}

export default SignIn