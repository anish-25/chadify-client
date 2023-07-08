import React from 'react'
import Image from 'next/image'
import { IMAGE_HOST } from '@/app/config'
const PostsGrid = ({posts}) => {
  return (
    <div className="grid w-full justify-start grid-cols-3 items-center py-6 space-y-3">
      {posts.map(post => (
        <div className="flex justify-center items-center">
          <Image className='object-contain !max-h-[300px]' src={IMAGE_HOST+'/'+post.user+'/'+post.media} height={400} width={300}/>
        </div>
      ))}
    </div>
  )
}

export default PostsGrid