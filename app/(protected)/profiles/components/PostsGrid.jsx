import React from 'react'
import Image from 'next/image'
import { IMAGE_HOST } from '@/app/config'
const PostsGrid = ({ posts }) => {
  return (
    <div className="grid w-full justify-start grid-cols-3 items-center py-6 space-y-3 space-x-3">
      {posts.map(post => (
        <div className="flex justify-center items-center">
          <Image className='object-contain' src={post.media} width={130}
            height={130}
            alt='post' style={{width:"100%",height:"100%"}}/>
        </div>
      ))}
    </div>
  )
}

export default PostsGrid