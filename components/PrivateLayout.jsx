import React from 'react'
import ChatWindow from './ChatWindow'
import Sidebar from './Sidebar'

const PrivateLayout = ({children}) => {
  return (
    <>
    <div className="flex min-h-screen items-center justify-start">
      <div className="w-[15%] flex justify-center items-center">
        <Sidebar/>
      </div>
      <div className="w-[65%] flex justify-center items-center border-x min-h-screen max-h-screen overflow-y-auto border-y-secondary">
      {children}
      </div>
      <div className="w-[20%] flex justify-center items-center">
        <ChatWindow/>
      </div>
    </div>
    </>
  )
}

export default PrivateLayout