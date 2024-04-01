import Button from '@/components/button/Button'
import Input from '@/components/input/Input'
import Link from 'next/link'
import React from 'react'

interface Props {
  params: { slug: number }}

const sugestionForms = ({ params }: Props) => {
  return (
    <div className='px-8 content-center'>
      <div className='flex flex-col'>
        <h1 className='mt-4 italic font-serif size-fit self-center text-4xl pb-2 font-semibold'>{params.slug == 1 ? "Sugerir Evento" : "Sugerir Local"}
        </h1>
      </div>
      <div className='mt-8' >
        <Input minHeight="12" labelText={params.slug == 1 ? "Digite o nome do evento" : "Digite o nome do estabelecimento" } idInput= "1"/>
        <Input minHeight="12" labelText={params.slug == 1 ? "Cidade que vai ocorrer o evento" : "Cidade onde está o estabelecimento" } idInput= "2" />
        <Input minHeight="60" labelText={params.slug == 1 ? "Descrição do evento (nome, data, atrações etc)" : "Dados do estabelecimento (end, atrativos etc)"} idInput= "3" />
        <Input minHeight="12" labelText="Telefone ou email para contato (opcional)" idInput= "4" />

      </div>
      <div className='grid grid-cols-2 gap-4 mt-12'>
        <Link href="">
          <Button title="CANCELAR" />
        </Link>
        <Link href="">
          <Button title="ENVIAR" />
        </Link>
      </div>
    </div>
  )
}

export default sugestionForms