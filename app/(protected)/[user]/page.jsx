'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Post from '@/components/Post'
import SearchBar from '@/components/SearchBar'
import AddPostButton from '@/components/AddPostButton'
import AddPost from '@/modals/AddPost'
import useApi from '@/app/hooks/useApi'
import firebase from "@/app/firebase"
import useAuth from '@/app/hooks/useAuth'
import useAxiosPrivate from '@/app/hooks/useAxiosPrivate'
const page = ({ params }) => {
  const [caption, setCaption] = useState("")
  const { auth } = useAuth()
  const { getTimeline } = useApi()
  const router = useRouter()
  const [showAddPostModal, setShowAddPostModal] = useState(false)
  const [userPosts, setUserPosts] = useState([])
  const [imageUrls, setImageUrls] = useState([])
  const axios = useAxiosPrivate()
  const refreshPosts = () => {
    let userId = auth?.id
    getTimeline(userId).then(res => setUserPosts(res.data))
  }

  useEffect(() => {
    let userId = auth?.id
    if (params.user !== auth?.username) {
      router.push('/profiles/' + params.user)
    }
    else if (params.user && userId) {
      refreshPosts(userId)
    }
    else {
      router.push('/accounts/login')
    }
  }, [])


  if (auth?.id) {
    return (
      <>
        <div className="flex relative flex-col h-screen justify-start w-full px-4">
          <div className="w-full h-[15%] sticky z-30 top-0 bg-[#FCFBFF]">
            <SearchBar />
          </div>
          <div className="w-full">
            {
              userPosts.map((post, index) => (
                <Post post={post} imageUrl={imageUrls[index]} />
              ))
            }
          </div>
          <div className="sticky flex justify-end items-center pb-[30px] bottom-0 right-0">
            <AddPostButton onClick={() => setShowAddPostModal(true)} />
          </div>
        </div>
        <AddPost refreshPosts={refreshPosts} caption={caption} setCaption={setCaption} setShow={setShowAddPostModal} show={showAddPostModal} />
      </>
    )
  }
  else {
    return <></>
  }
}
export default page