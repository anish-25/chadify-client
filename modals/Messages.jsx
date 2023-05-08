'use-client'
import Button from '@/components/Button'
import Texts from '@/components/Texts'
import { Modal } from 'flowbite-react'
import React, { useMemo, useRef, useState } from 'react'
import SendPlaneFillIcon from 'remixicon-react/SendPlaneFillIcon'

const Messages = ({ show, setShow, userText, setUserText,selectedUser }) => {
  const [height, setHeight] = useState(40)
  const scrollRef = useRef(null)
  const inputRef = useRef(null);
  const messages = [
    {
        user: 'user1',
        message: `Hey, how's it going?`
    },
    {
        user: 'user2',
        message: `Not bad, just busy with work. You?`
    },
    {
        user: 'user1',
        message: `Same here, trying to stay on top of everything. Have you seen any good movies lately?`
    },
    {
        user: 'user2',
        message: `Actually, yes! I saw a great one last weekend. It was a thriller with a really unexpected twist at the end.`
    },
    {
        user: 'user1',
        message: `Sounds interesting! What was it called?`
    },
    {
        user: 'user2',
        message: `It was called "The Silent Patient". Have you heard of it?`
    },
    {
        user: 'user1',
        message: `No, I haven't. But I'll definitely check it out. Thanks for the recommendation!`
    },
    {
        user: 'user2',
        message: `No problem! Let me know what you think of it. By the way, have you tried that new restaurant downtown yet?`
    },
    {
        user: 'user1',
        message: `Not yet, but I've been wanting to. Have you been there?`
    },
    {
        user: 'user2',
        message: `Yeah, I went last week. It was really good! The atmosphere is really nice too.`
    },
    {
        user: 'user1',
        message: `Awesome, I'll definitely have to go soon. Maybe we can go together!`
    },
    {
        user: 'user2',
        message: `Sounds good to me! How's your schedule next week?`
    },
    {
        user: 'user1',
        message: `Let me check...how about Thursday evening?`
    },
    {
        user: 'user2',
        message: `Thursday works for me. What time?`
    },
    {
        user: 'user1',
        message: `How about 7pm?`
    },
    {
        user: 'user2',
        message: `Sounds good! See you then.`
    },
    {
        user: 'user1',
        message: `Looking forward to it!`
    },
    {
        user: 'user2',
        message: `Me too. Have a good day!`
    },
    {
        user: 'user1',
        message: `You too!`
    },
    {
        user: 'user2',
        message: `Bye!`
    }
];
  useMemo(() => {
    console.log(userText.length)
    if (userText.length > 100) {
      setHeight((prev) => prev * 2)
    }
  }, [userText])
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useMemo(() => {
    scrollToBottom()
  }, [messages]);
  return (
    <Modal
      dismissible={true}
      show={show}
      size={'5xl'}
      position={'center'}
      onClose={() => setShow(false)}
    >
      <Modal.Header>
        {selectedUser}
      </Modal.Header>
      <Modal.Body style={{ position:'relative'  }}>
        <div className="space-y-6" ref={scrollRef} style={{maxHeight: '60vh',overflowY: 'auto'}}>
          <div className="space-y-6" style={{ minHeight: '60vh',display:'flex',alignItems:'end',paddingBottom:'40px'}}>
          <Texts messages={messages}/>  
           </div>
        <form style={{ padding: '12px',position:'absolute' }} className='bottom-0 bg-white w-full left-0 flex justify-center items-center'>
          <div className="relative w-full flex justify-center items-center">
          <textarea
            ref={inputRef}
            defaultValue={userText}
            className='w-[80%]'
            maxLength={1000}
            style={{resize:'none',maxHeight:'30vh',paddingRight:'40px'}}
            onBlur={(e) => {
              setUserText(e.target.value)
            }}
            onChange={(e) => {
              const input = e.target;
              input.style.height = 'auto';
              input.style.height = `${input.scrollHeight}px`; 
            }}
            placeholder="Type your message..."
            rows={1}

          />
          <div className="absolute" style={{right:'120px',bottom:'7px'}}>
          <SendPlaneFillIcon className='cursor-pointer hover:text-secondary transition-all duration-150' size={30}/>
          </div>
          </div>
        </form>
        </div>
      </Modal.Body>
      {/* <Modal.Footer style={{ padding: '12px',position:'absolute' }}> */}

      {/* </Modal.Footer> */}
    </Modal>
  )
}

export default Messages