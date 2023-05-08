import React, { useState } from 'react'
import Image from 'next/image'
import Messages from '@/modals/Messages'
import { chadsOnline } from '@/data/chadsOnline'
const ChatWindow = () => {
  const [showMessages, setShowMessages] = useState(false)
  const [userText, setUserText] = useState("")
  const [selectedUser, setSelectedUser] = useState("")
  return (
    <div className='h-screen max-h-screen w-full py-4 flex flex-col justify-start items-start'>
      <h3 className=' font-semibold text-secondary pl-4 relative opacity-70'>Chads Online
      <span className='absolute h-px bg-gray-400 bottom-0 mt-4 left-1/2 transform -translate-x-1/2 transition-all duration-500 w-4/5'></span>
      </h3>
      <div className="mt-[40px] h-[100%] w-full max-h-full overflow-y-auto flex flex-col space-y-2 justify-start items-start">
      {
        chadsOnline.map(chad => (
          <div onClick={() => {setShowMessages(true);setSelectedUser(chad.name)}} className="flex justify-start space-x-3 items-center hover:bg-gray-100 cursor-pointer w-full h-full py-2 pl-4">
            <div className="rounded-full border border-secondary p-0.5 relative">
              <Image src={chad.profile} height={22} width={22} className='rounded-full'/>
              <span className='h-3 w-3 rounded-full bg-green-500 absolute -right-1 -bottom-1'></span>
            </div>
            <div className=" text-base text-secondary font-medium">
              {chad.name}
            </div>
          </div>
        ))
      }
      </div>
      <Messages userText={userText} selectedUser={selectedUser} setUserText={setUserText} setShow={setShowMessages} show={showMessages}/>
    </div>
  )
}

export default ChatWindow