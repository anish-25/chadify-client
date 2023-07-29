import Image from 'next/image'
import React, { useState } from 'react'
import MoreLineIcon from 'remixicon-react/MoreLineIcon'
import SendPlaneFill from 'remixicon-react/SendPlaneFillIcon'
import CommentIcon from 'remixicon-react/Chat3LineIcon'
import { FrontFacingChad } from '@/assets/icons'
import Sivaji from '@/assets/Sivaji.png'
import Reactions from './Reactions'
import { Dropdown } from 'flowbite-react'
import { IMAGE_HOST } from '@/app/config'

const Post = ({ post,imageUrl }) => {
  const [showMore, setShowMore] = useState(false)
  const caption = post.caption
  return (
    <div className='flex flex-col !w-full mb-[50px] px-[20px] md:px-[100px]'>
      <div className="flex justify-between items-center w-full px-5">
        <div className="flex justify-around items-center space-x-3">
          <div className="w-[34px] h-[33px] rounded-full border border-secondary">
            <Image src={post.avatar || FrontFacingChad} alt='user-profile-picture' className='rounded-full  h-[33px]' width={33} height={32} />
          </div>
          <div className="flex flex-col">
            <p className='text-secondary text-base font-medium cursor-pointer'>{post.username}</p>
            <p className='text-xs'>{post.location}</p>
          </div>
        </div>
        <Dropdown style={{ background: 'transparent', color: 'black', outline: 'none', borderStyle: 'none', padding: '0px', margin: '0px', cursor: 'default', borderColor: 'transparent' }} className='focus:!outline-none focus:!border-none !ring-transparent focus:!ring-transparent' arrowIcon={false} label={
          <MoreLineIcon size={28} className='cursor-pointer bg-transparent hover:text-secondary transition-all duration-150' />
        }>
          <Dropdown.Item>
            Dashboard
          </Dropdown.Item>
          <Dropdown.Item>
            Settings
          </Dropdown.Item>
          <Dropdown.Item>
            Earnings
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            Separated link
          </Dropdown.Item>
        </Dropdown>
      </div>
      <div className="mt-4 relative">
        <Image className='w-full max-h-[450px]' style={{ objectFit: 'contain' }} width={300} height={180} src={post.media} alt='post-image' />
      </div>
      <div className="px-3 mt-2 cursor-pointer min-h-[30px] hover:text-secondary" onClick={() => setShowMore(prev => !prev)}>
        {caption?.length < 180 ? caption :
         showMore ?
         <>
          {caption + ' '}
            <span className='font-semibold'>less</span>
         </>
         :
          <>
            {
              caption?.substring(0, 180) + '.... '
            }
            <span className='font-semibold'>more</span>
          </>
        }
      </div>
      <div className="flex justify-between items-center w-full mt-6 px-5">
        <div className="">
          <Reactions post={post} reaction={post.reactions} />
        </div>
        <div className="flex space-x-3 items-center justify-around">
          <CommentIcon className='cursor-pointer hover:text-secondary transition-all duration-150' size={30} />
          <SendPlaneFill className='cursor-pointer hover:text-secondary transition-all duration-150' size={30} />
        </div>
      </div>
    </div>
  )
}

export default Post