'use client'
import React, { useEffect, useMemo } from 'react'
import ChatWindow from './ChatWindow'
import Sidebar from './Sidebar'
import useAuth from '@/app/hooks/useAuth'
import useRefreshToken from '@/app/hooks/useRefreshToken'
import { usePathname, useRouter } from 'next/navigation'


const PrivateLayout = ({children}) => {
  const routesWithoutChatWindow = ['/profiles']
  const {hideChatWindow, setHideChatWindow,auth,refreshToken, setRefreshToken} = useAuth()
  const refresh = useRefreshToken()
  const router = useRouter()
  const pathname = usePathname()
  useEffect(() => {
    let token = sessionStorage.getItem('rT')
    if(!auth?.accessToken?.token && token){
      setRefreshToken(token)
      refresh()
    }
    else if(!refreshToken){
      router.push('/accounts/login')
    }
  }, [auth])

 if(auth?.accessToken?.token && refreshToken){
   return (
     <>
     <div className="flex min-h-screen items-center justify-start">
       <div className="w-[15%] flex justify-center items-center">
         <Sidebar/>
       </div>
       <div className={`${hideChatWindow? 'w-[85%]': 'w-[65%]'}  flex justify-center items-center border-x min-h-screen max-h-screen overflow-y-auto border-y-secondary`}>
       {children}
       </div>
       {
         hideChatWindow ? <></> :
       <div className="w-[20%] flex justify-center items-center">
         <ChatWindow/>
       </div>
       }
     </div>
     </>
   )
 }
 else if(pathname.includes('/accounts')){
  return <>
  {children}
  </>
 }
 else{
  router.push('/accounts/login')
  return <></>
 }
}

export default PrivateLayout