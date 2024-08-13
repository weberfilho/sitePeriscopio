'use client'

import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { createPopper } from '@popperjs/core'

interface PopUpProps {

  children: ReactNode
  popUpRef: React.RefObject<HTMLElement>;
  isVisible: boolean
}

export const Popup = ({ children, popUpRef, isVisible }: PopUpProps) => {

  const [popUpInstance, setPopUpInstance] = useState(null)
  const popUpElement = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!popUpRef.current || !popUpElement.current) {
      return
    }
    const popper = createPopper(popUpRef.current, popUpElement.current, {
      placement: 'bottom'
    })
    setPopUpInstance(popper)

    return () => {
      popper.destroy
    }

  }, [popUpRef])
  
  useEffect(()=>{
    if(popUpInstance){
      popUpInstance.update()
    }
  }, [isVisible])

  return (
    isVisible && (<div ref={popUpElement} style={{ display: isVisible ? 'block' : 'none' }}>{children}</div>)
  )
}
