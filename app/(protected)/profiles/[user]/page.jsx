'use client'
import { notFound, useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import ProfileHead from '../components/ProfileHead'
import PostsGrid from '../components/PostsGrid'
import useApi from '@/app/hooks/useApi'
import useAxiosPrivate from '@/app/hooks/useAxiosPrivate'
import NoPosts from '@/components/NoPosts'
import useAuth from '@/app/hooks/useAuth'
import AddPostButton from '@/components/AddPostButton'

const page = ({ params }) => {
  const [user, setUser] = useState({})
  const [paramsUserPosts, setParamsUserPosts] = useState(undefined)
  const router = useRouter()
  const axios = useAxiosPrivate()
  const { auth, setShowAddPostModal } = useAuth()
  const { getCompleteUserDetails, getUserPosts, refreshUserPosts, userPosts } = useApi()
  const [notFound, setNotFound] = useState(false)

  const posts = useMemo(() => {
    if (user?._id && auth?.id === user?._id) return userPosts
    else if (user?._id) return paramsUserPosts
    else return undefined
  }, [userPosts, paramsUserPosts])

  const setUserDetails = () => {
    getCompleteUserDetails(params.user).then(res => {
      if (res.data.username) {
        setUser(res.data)
        if (res.data?._id === auth?.id) {
          refreshUserPosts()
        } else {
          getUserPosts(res.data._id).then(res => {
            setParamsUserPosts(res.data)
          })
        }
      }
    }).catch(err => setNotFound(true))
  }

  useEffect(() => {
    setUserDetails()
  }, [])


  return (
    <>
      {
        user?._id ?
          <div className="flex flex-col w-full justify-start items-center max-h-screen min-h-screen p-6">
            <ProfileHead setUserDetails={setUserDetails} user={user} posts={posts} />
            <div style={{ height: '80%' }} className="min-h-[80%] py-6 w-full md:w-[80%] border-t mt-12 flex-1 flex-grow flex justify-center items-stretch">
              {
                typeof posts === "undefined" ? <></> :
                  posts?.length ?
                    <PostsGrid posts={posts} />
                    :
                    <NoPosts />
              }
            </div>
            {/* {
              auth?.id === user?._id ?
                <div className="sticky flex justify-end items-center w-full pb-[70px] md:pb-[30px] bottom-0 right-0">
                  <AddPostButton onClick={() => setShowAddPostModal({open:true,timeline:false})} />
                </div> : <></>
            } */}
          </div> :
          notFound ?
            <>Not found</> :
            <></>
      }
    </>
  )
}

export default page