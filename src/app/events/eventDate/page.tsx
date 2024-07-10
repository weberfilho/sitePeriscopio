import Button from '@/components/button/Button'
import Link from 'next/link'
import React from 'react'

const eventDate = () => {

  return (
    <div className="flex flex-col space-y-5 my-8 mx-16 flex-grow ">
      
      <Link href={`../../events/eventList/1`}>
        <Button title="HOJE"/>
      </Link>
      <Link href={`../../events/eventList/1`}>
        <Button title="OUTRAS DATAS" />
      </Link>

      
     
    </div>
  )
}

export default eventDate