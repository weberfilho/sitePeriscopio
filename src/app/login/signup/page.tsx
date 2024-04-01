import Button from '@/components/button/Button'
import Input from '@/components/input/Input'
import Link from 'next/link'
import React from 'react'

const SignUp = () => {
  return (
    <div className='px-8 content-center'>
      <div className='flex flex-col'>
        <h1 className='mt-4 italic font-serif size-fit self-center text-4xl pb-2 font-semibold'>Cadastrar
        </h1>
      </div>
      <div className='mt-8' >
        <Input minHeight="12" labelText="Nome" idInput="1" />
        <div className='flex flex-row w-full justify-between'>
          <div className='w-1/2 mr-0'>
            <Input minHeight="12" labelText="Nascimento" idInput="2" />
          </div>
          <div className='w-1/4 '>
            <Input minHeight="12" labelText="Sexo" idInput="3" /></div>
        </div>
        <Input minHeight="12" labelText="Email" idInput="4" />
        <Input minHeight="12" labelText="Senha" idInput="5" />
        <Input minHeight="12" labelText="Confirmar Senha" idInput="6" />
      </div>
      <div className='grid grid-cols-2 gap-4 mt-12'>
        <Link href="/">
          <Button title="CANCELAR" />
        </Link>
        <Link href="">
          <Button title="ENVIAR" />
        </Link>
      </div>
    </div>
  )
}

export default SignUp