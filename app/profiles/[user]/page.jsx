'use client'
import useAuth from '@/app/hooks/useAuth'
import PrivateLayout from '@/components/PrivateLayout'
import { notFound, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ProfileHead from '../components/ProfileHead'
import PostsGrid from '../components/PostsGrid'

const page = ({params}) => {
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([])
  const router = useRouter()
  const {getCompleteUserDetails,getUserPosts} = useAuth()
  useEffect(() => {
    getCompleteUserDetails(params.user).then(res => {
      console.log(res.data)
      if(res.data.username){
        setUser(res.data)
        getUserPosts(res.data._id).then(res => {
          setPosts(res.data)
        })
      }
      else{
       return notFound()
      }
    })
  }, [])
  
     
  return (
    <PrivateLayout hideChatWindow={true}>
      {
        user?._id ?
        <div className="flex flex-col w-full justify-start items-center max-h-screen min-h-screen p-6">
        <ProfileHead/>
          <div style={{height:'80%'}} className="min-h-[80%] py-6 w-[80%] flex-1 flex-grow flex justify-center items-stretch">
            <PostsGrid posts={posts}/>
          </div>
            
        </div> : <>Not found</>
      }
  
    </PrivateLayout>
  )
}

export default page