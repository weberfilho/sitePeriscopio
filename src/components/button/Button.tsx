
import React from 'react';

type Props = {
  title: string;      
}

const Button = ({ title }: Props) => {
  return (        
    <button type='button' className=' bg-gradient-conic 
   from-roxo from 9% to-azul via 87%  
     text-xl w-full p-6 text-white bg-cyan-600 rounded-xl' >{title}</button>    
  )
}
export default Button