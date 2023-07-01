'use client'
import React, { useEffect, useMemo } from 'react'
import ChatWindow from './ChatWindow'
import Sidebar from './Sidebar'
import useAuth from '@/app/hooks/useAuth'
import useRefreshToken from '@/app/hooks/useRefreshToken'
import { useRouter } from 'next/navigation'

const PrivateLayout = ({children}) => {
  const routesWithoutChatWindow = ['/profiles']
  const {hideChatWindow, setHideChatWindow,auth} = useAuth()
  const refresh = useRefreshToken()
  const router = useRouter()
  useMemo(() => {
    if(!auth?.accessToken?.token && sessionStorage.getItem('rT')){
      refresh()
    }
    else if(!sessionStorage.getItem('rT')){
      router.push('/accounts/login')
    }
  }, [auth])
  
   useMemo(() => {
    setHideChatWindow(
      routesWithoutChatWindow.filter(val => window.location.pathname.includes(val)).length>0
    )
  },[window.location.pathname]) 
 if(auth?.accessToken?.token){
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
 else if(window.location.pathname.includes('/accounts')){
  console.log("loginaccounts")
  return <>
  {children}
  </>
 }
 else{
  console.log("login!accounts")
  router.push('/accounts/login')
  return <></>
 }
}

export default PrivateLayout