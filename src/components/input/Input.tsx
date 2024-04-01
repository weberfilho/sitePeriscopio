"use client"
import React from 'react'

interface Props{
  idInput: string
  minHeight: string
  labelText: string
}

const Input = (props: Props) => {
  return (
    <div>      
      <label htmlFor={props.idInput} className='pl-2'>{props.labelText}</label>
      <input type='text' id={props.idInput} value={""} onChange={()=> ""} className={`px-8 w-full mb-2 flex flex-row rounded-md border-solid border-2 shadow-md shadow-gray-500 border-black ${props.minHeight == "60"? "min-h-60": "min-h-12"}`}/>      
    </div>
  )
}

export default Input