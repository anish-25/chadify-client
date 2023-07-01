'use client'
import React, { useMemo } from 'react'
import ChatWindow from './ChatWindow'
import Sidebar from './Sidebar'
import useAuth from '@/app/hooks/useAuth'

const PrivateLayout = ({children}) => {
  const token = sessionStorage.getItem("token")
  const routesWithoutChatWindow = ['/profiles']
  const {hideChatWindow, setHideChatWindow} = useAuth()
   useMemo(() => {
    setHideChatWindow(
      routesWithoutChatWindow.filter(val => window.location.pathname.includes(val)).length>0
    )
  },[window.location.pathname]) 
  // routesWithoutChatWindow.includes(window.location.pathname)
  console.log("hideChatwindow",hideChatWindow,window.location.pathname)
 if(token){
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
 else{
  return <>
  {children}
  </>
 }
}

export default PrivateLayout