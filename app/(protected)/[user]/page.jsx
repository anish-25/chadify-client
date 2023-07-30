'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import Post from '@/components/Post'
import SearchBar from '@/components/SearchBar'
import AddPostButton from '@/components/AddPostButton'
import AddPost from '@/modals/AddPost'
import useApi from '@/app/hooks/useApi'
import useAuth from '@/app/hooks/useAuth'
import useAxiosPrivate from '@/app/hooks/useAxiosPrivate'
import PageTransition from '@/components/PageTransition'
import CaughtUp from '@/components/CaughtUp'
const page = ({ params }) => {
  const { auth, setShowAddPostModal } = useAuth()
  const { refreshtimeline, userTimeline } = useApi()
  const router = useRouter()
  const [imageUrls, setImageUrls] = useState([])
  const axios = useAxiosPrivate()

  useEffect(() => {
    let userId = auth?.id
    if (params.user !== auth?.username) {
      router.push('/profiles/' + params.user)
    }
    else if (params.user && userId) {
      refreshtimeline()
    }
    else {
      router.push('/accounts/login')
    }
  }, [])
  if (auth?.id) {
    return (
      <>
        <div className="flex relative flex-col h-screen justify-start w-full px-4 pt-8 pb-8">
          <div className="w-full">
            {
              userTimeline?.length && userTimeline.map((post, index) => (
                <Post post={post} imageUrl={imageUrls[index]} />
              ))
            }
          </div>
          {
            typeof userTimeline !== "undefined" ?
              <div className="w-full flex justify-center items-center pb-24">
                <CaughtUp />
              </div>
              : <></>
          }
          <div className="sticky flex justify-end items-center bottom-[-120px] right-0">
            <AddPostButton onClick={() => setShowAddPostModal({ open: true, timeline: true })} />
          </div>
        </div>
      </>
    )
  }
  else {
    return <></>
  }
}
export default page