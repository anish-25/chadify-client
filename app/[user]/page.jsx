'use client'
import useAuth from '@/app/hooks/useAuth'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = ({params}) => {
  const [user, setUser] = useState({})
  const {getCompleteUserDetails} = useAuth()
  const router = useRouter()
  useEffect(() => {
    let userId = sessionStorage.getItem('userId')
    if(params.user && userId){
      getCompleteUserDetails(userId).then(res => setUser(res.data))
    }
    else{
      router.push('/accounts/login')
    }
  }, [])
  
  if(user?._id){
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="absolute right-0 top-0 mr-6 mt-6 cursor-pointer" onClick={() => {sessionStorage.clear();window.location.reload()}}>Logout</div>
      Welcome {user?.name} 
    </div>
  )
}}
export default page