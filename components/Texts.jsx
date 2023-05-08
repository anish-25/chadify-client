import React from 'react'


const Texts = ({messages}) => {
    return (
        <div className='w-full h-full flex flex-col px-24 py-4'>
            {messages.map(message => (
                <div className={`w-full flex my-4 ${message.user=='user1'?'justify-end':'justify-start'}`}>
                    <p className={`max-w-[45%] min-h-[40px] cursor-pointer group relative rounded-3xl px-3 py-2 text-white flex justify-center items-center hover:opacity-60 transition-all duration-200 ${message.user=='user1'?'bg-primary':'bg-gray-500'}`}>
                        {message.message}
                        <span className={`absolute hidden text-[10px] text-black whitespace-nowrap group-hover:block ${message.user=='user1'?'-right-[50px]': '-left-[50px]'}`}>12:13 PM</span>
                    </p>
                </div>
            ))}
        </div>
    )
}

export default Texts