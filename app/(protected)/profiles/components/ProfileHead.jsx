import useApi from '@/app/hooks/useApi'
import useAuth from '@/app/hooks/useAuth'
import useRefreshToken from '@/app/hooks/useRefreshToken'
import FrontFacingChad from '@/assets/FrontFacingChad.png'
import Button from '@/components/Button'
import ChangeProfilePic from '@/modals/ChangeProfilePic'
import { handleApiError } from '@/utils/helpers'
import { Tooltip } from 'flowbite-react'
import Image from 'next/image'
import React, { useState } from 'react'
import Pencil from 'remixicon-react/PencilFillIcon'
const ProfileHead = ({ user, posts, setUserDetails }) => {
  const { auth } = useAuth()
  const refresh = useRefreshToken()
  const { followUser } = useApi()
  const [editProfilePic, setEditProfilePic] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleFollow = () => {
    setLoading(true)
    followUser(auth?.id, user?._id).then(async res => {
      await refresh()
    }).catch(err => handleApiError(err)).finally(() => setLoading(false))
  }

  return (
    <div className="flex justify-between h-[20%] w-full md:w-[80%] items-start pt-6 space-x-4">
      <div className="flex flex-col justify-center items-center">
        <div className="relative group cursor-pointer" onClick={() => { if (auth?.id === user?._id) setEditProfilePic(true) }} >
          <Image className='rounded-full border' width={150} height={150} src={user?.avatar || FrontFacingChad}></Image>
          {
            auth?.id === user?._id ?
              <div className="absolute right-0 bottom-[-5px] group-hover:text-primary transition-all duration-200 cursor-pointer">
                <Pencil />
              </div>
              : <></>
          }
        </div>
        <div className="flex flex-col space-y-2 justify-center items-center">
          <h3 className='text-3xl font-semibold mt-2'>{user?.name}</h3>
          <p className='text-sm text-secondary opacity-60 font-semibold'>{user?.username}</p>
        </div>
      </div>
      <div className="flex flex-col space-y-8 justify-center w-full items-center">
        <div className="flex justify-around md:justify-center w-full items-center">
          <div className="flex min-w-[20%] flex-col space-y-2 justify-center items-center">
            <h3 className='md:text-3xl text-2xl font-semibold'>{user?.followers?.length}</h3>
            <p className='md:text-sm text-xs text-secondary opacity-60 font-semibold'>FOLLOWERS</p>
          </div>
          <div className="flex min-w-[20%] flex-col space-y-2 justify-center items-center">
            <h3 className='md:text-3xl text-2xl font-semibold'>{user?.following?.length}</h3>
            <p className='md:text-sm text-xs text-secondary opacity-60 font-semibold'>FOLLOWING</p>
          </div>
          <div className="flex min-w-[20%] flex-col space-y-2 justify-center items-center">
            <h3 className='md:text-3xl text-2xl font-semibold'>{posts?.length}</h3>
            <p className='md:text-sm text-xs text-secondary opacity-60 font-semibold'>POSTS</p>
          </div>
        </div>
        <div className="md:text-sm text-xs md:max-w-[75%]">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, ad quos. Esse hic dicta dolorem praesentium iusto molestiae quis beatae impedit, accusamus, suscipit reiciendis quo nobis provident voluptatum maxime architecto.
        </div>
        {
          auth?.id !== user?._id ?
            <div className="w-full flex justify-center items-center space-x-7">
              {
                !auth?.following?.includes(user?._id) ?
                  <Button loading={loading} onClick={handleFollow} style={{ width: '50%' }} text={'Follow'} />
                  :
                  <Button loading={loading} onClick={handleFollow} style={{ width: '50%',backgroundColor:'#366473' }} text={'Unfollow'} />
              }
            </div>
            : <></>
        }
      </div>
      <ChangeProfilePic setUserDetails={setUserDetails} open={editProfilePic} setOpen={setEditProfilePic} user={user} />
    </div>
  )
}

export default ProfileHead