'use client'
import { notFound, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ProfileHead from '../components/ProfileHead'
import PostsGrid from '../components/PostsGrid'
import useApi from '@/app/hooks/useApi'
import useAxiosPrivate from '@/app/hooks/useAxiosPrivate'
import NoPosts from '@/components/NoPosts'

const page = ({params}) => {
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([])
  const router = useRouter()
  const axios = useAxiosPrivate()
  const {getCompleteUserDetails,getUserPosts} = useApi()

  const setUserDetails = () => {
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
  }

  useEffect(() => {
    setUserDetails()
  }, [])
  
     
  return (
    <>  
    {
        user?._id ?
        <div className="flex flex-col w-full justify-start items-center max-h-screen min-h-screen p-6">
        <ProfileHead setUserDetails={setUserDetails} user={user} posts={posts}/>
          <div style={{height:'80%'}} className="min-h-[80%] py-6 w-[80%] border-t mt-12 flex-1 flex-grow flex justify-center items-stretch">
            {
              posts?.length?
              <PostsGrid posts={posts}/>
               :
              <NoPosts/>
            }
          </div>
            
        </div> : <>Not found</>
      }
  </>
  )
}

export default page