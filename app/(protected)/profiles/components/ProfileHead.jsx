import  FrontFacingChad from '@/assets/FrontFacingChad.png'
import Button from '@/components/Button'
import Image from 'next/image'
import React, { useState } from 'react'

const ProfileHead = ({user}) => {
  console.log("profileUser",user)
  return (
    <div className="flex justify-between h-[20%] w-[80%] items-start pt-6 space-x-4">
    <div className="flex flex-col justify-center items-center">
    <Image className='rounded-full border' src={FrontFacingChad}></Image>
    <div className="flex flex-col space-y-2 justify-center items-center">
    <h3 className='text-3xl font-semibold mt-2'>{user?.name}</h3>
    <p className='text-sm text-secondary opacity-60 font-semibold'>{user?.username}</p>
    </div>
    </div>
    <div className="flex flex-col space-y-8 justify-center w-full items-center">
    <div className="flex justify-center w-full items-center">
    <div className="flex min-w-[20%] flex-col space-y-2 justify-center items-center">
    <h3 className='text-3xl font-semibold'>{user?.followers?.length}</h3>
    <p className='text-sm text-secondary opacity-60 font-semibold'>FOLLOWERS</p>
    </div>
    <div className="flex min-w-[20%] flex-col space-y-2 justify-center items-center">
    <h3 className='text-3xl font-semibold'>{user?.following?.length}</h3>
    <p className='text-sm text-secondary opacity-60 font-semibold'>FOLLOWING</p>
    </div>
    <div className="flex min-w-[20%] flex-col space-y-2 justify-center items-center">
    <h3 className='text-3xl font-semibold'>{user?.posts?.length}</h3>
    <p className='text-sm text-secondary opacity-60 font-semibold'>POSTS</p>
    </div>
    </div>
    <div className=" text-sm max-w-[75%]">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, ad quos. Esse hic dicta dolorem praesentium iusto molestiae quis beatae impedit, accusamus, suscipit reiciendis quo nobis provident voluptatum maxime architecto.
    </div>
    <div className="w-full flex justify-center items-center space-x-7">
    <Button style={{width:'50%'}} text={'Follow'}/>
    </div>
    </div>
  </div>
  )
}

export default ProfileHead