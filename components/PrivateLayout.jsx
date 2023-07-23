'use client'
import React, { useEffect, useMemo } from 'react'
import ChatWindow from './ChatWindow'
import Sidebar from './Sidebar'
import useAuth from '@/app/hooks/useAuth'
import useRefreshToken from '@/app/hooks/useRefreshToken'
import { usePathname, useRouter } from 'next/navigation'
import Modals from '@/modals/Modals'


const PrivateLayout = ({ children }) => {
  const { hideChatWindow, setHideChatWindow, auth, refreshToken, setRefreshToken } = useAuth()
  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen items-center justify-start">
        <div className="hidden w-[30%] lg:w-[20%] xl:w-[15%] md:flex justify-center items-center shadow-sm border-r">
          <Sidebar view={"desktop"} />
        </div>
        <div className={`${hideChatWindow ? 'md:w-[85%]' : 'md:w-[65%]'} w-full flex justify-center items-center border-r min-h-screen max-h-screen overflow-y-auto border-y-secondary py-[200px]`}>
          {children}
        </div>
        <div className="flex w-full md:hidden max-h-[80px] z-30 justify-center items-center sticky bottom-0">
          <Sidebar view={"mobile"} />
        </div>
        {
          hideChatWindow ? <></> :
            <div className="w-[20%] hidden md:flex justify-center items-center">
              <ChatWindow />
            </div>
        }
      </div>
      <Modals/>
    </>
  )
}

export default PrivateLayout