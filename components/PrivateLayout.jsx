import React from 'react'
import ChatWindow from './ChatWindow'
import Sidebar from './Sidebar'

const PrivateLayout = ({hideChatWindow,children}) => {
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

export default PrivateLayout