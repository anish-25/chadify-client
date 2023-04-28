'use client'
import useAuth from '@/app/hooks/useAuth'
import PrivateLayout from '@/components/PrivateLayout'
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
    <PrivateLayout>
    <div className="flex flex-col">
      Welcome {user?.name} 
    </div>
    </PrivateLayout>
  )
}}
export default page