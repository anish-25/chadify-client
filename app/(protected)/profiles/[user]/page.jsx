'use client'
import { notFound, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ProfileHead from '../components/ProfileHead'
import PostsGrid from '../components/PostsGrid'
import useApi from '@/app/hooks/useApi'
import useAxiosPrivate from '@/app/hooks/useAxiosPrivate'

const page = ({params}) => {
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([])
  const router = useRouter()
  const axios = useAxiosPrivate()
  const {getCompleteUserDetails,getUserPosts} = useApi()
  useEffect(() => {
    getCompleteUserDetails(params.user).then(res => {
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
    <>  
    {
        user?._id ?
        <div className="flex flex-col w-full justify-start items-center max-h-screen min-h-screen p-6">
        <ProfileHead user={user}/>
          <div style={{height:'80%'}} className="min-h-[80%] py-6 w-[80%] flex-1 flex-grow flex justify-center items-stretch">
            <PostsGrid posts={posts}/>
          </div>
            
        </div> : <>Not found</>
      }
  </>
  )
}

export default page