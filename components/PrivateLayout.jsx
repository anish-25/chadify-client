'use client'
import React, { useEffect, useMemo } from 'react'
import ChatWindow from './ChatWindow'
import Sidebar from './Sidebar'
import useAuth from '@/app/hooks/useAuth'
import useRefreshToken from '@/app/hooks/useRefreshToken'
import { usePathname, useRouter } from 'next/navigation'


const PrivateLayout = ({children}) => {
  const {hideChatWindow, setHideChatWindow,auth,refreshToken, setRefreshToken} = useAuth()
   return (
     <>
     <div className="flex min-h-screen items-center justify-start">
       <div className="hidden w-[15%] md:flex justify-center items-center shadow-sm">
         <Sidebar/>
       </div>
       <div className={`${hideChatWindow? 'md:w-[85%]': 'md:w-[65%]'} w-full flex justify-center items-center border-x min-h-screen max-h-screen overflow-y-auto border-y-secondary`}>
       {children}
       </div>
       {
         hideChatWindow ? <></> :
       <div className="w-[20%] hidden md:flex justify-center items-center">
         <ChatWindow/>
       </div>
       }
     </div>
     </>
   )
}

export default PrivateLayout