'use client';
import React from 'react'
import FrontFacingChad from '@/assets/FrontFacingChad.png'
import Logo from '@/assets/Logo.png'
import Image from 'next/image';
const Loader = () => {
  return (
   <>
<div className="min-h-screen flex justify-center items-center">
  <Image className='h-20 w-20' src={FrontFacingChad} alt="front-facing-chad"/>
  <Image className='absolute bottom-4' src={Logo} alt="front-facing-chad"/>
</div>
   </>
  )
}

export default Loader