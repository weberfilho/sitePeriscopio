import React from 'react'

type FormData = {
  labelText1: string
  labelText2: string
  labelText3: string
  labelText4: string
}



const SuggestionForm = ({labelText1, labelText2, labelText3, labelText4}: FormData) => {
  return (
    <div>
      <label className='pl-2'>{labelText1}</label>
      <input type='text'  className="px-8 w-full mb-2 flex flex-row rounded-md border-solid border-2 shadow-md shadow-gray-500 border-black min-h-12"/>

    </div>
  )
}

export default SuggestionForm