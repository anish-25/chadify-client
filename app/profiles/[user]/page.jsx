'use client'
import useAuth from '@/app/hooks/useAuth'
import  FrontFacingChad from '@/assets/FrontFacingChad.png'
import PrivateLayout from '@/components/PrivateLayout'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const page = ({params}) => {
     
  return (
    <PrivateLayout hideChatWindow={true}>
    <div className="flex flex-col w-full justify-center items-center h-screen min-h-screen p-6">
      <div className="flex justify-between h-[20%] w-[80%] items-center pt-6 space-x-4">
        <div className="flex flex-col justify-center items-center">
        <Image className='rounded-full border' src={FrontFacingChad}></Image>
        <div className="flex flex-col space-y-2 justify-center items-center">
        <h3 className='text-3xl font-semibold mt-2'>Anish</h3>
        <p className='text-sm text-secondary opacity-60 font-semibold'>anish25</p>
        </div>
        </div>
        <div className="flex justify-center space-x-8 w-full items-center">
        <div className="flex flex-col space-y-2 justify-center items-center">
        <h3 className='text-3xl font-semibold'>37</h3>
        <p className='text-sm text-secondary opacity-60 font-semibold'>FOLLOWERS</p>
        </div>
        <div className="flex flex-col space-y-2 justify-center items-center">
        <h3 className='text-3xl font-semibold'>89</h3>
        <p className='text-sm text-secondary opacity-60 font-semibold'>FOLLOWING</p>
        </div>
        <div className="flex flex-col space-y-2 justify-center items-center">
        <h3 className='text-3xl font-semibold'>3</h3>
        <p className='text-sm text-secondary opacity-60 font-semibold'>POSTS</p>
        </div>
        </div>
      </div>
      <div style={{height:'80%'}} className="min-h-[80%]"></div>
        as
    </div>
    </PrivateLayout>
  )
}

export default page