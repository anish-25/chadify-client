import React from 'react'
import ShieldCheckFillIcon from 'remixicon-react/ShieldCheckFillIcon'
const CaughtUp = () => {
  return (
    <div className='flex flex-col w-full md:w-1/2 p-8 rounded space-y-8 justify-center items-center min-h-[150px] border-2 border-secondary text-primary shadow-lg'>
        <div className="flex space-x-3 justify-center items-center">
            <ShieldCheckFillIcon size={35}/>
            <h4 className='text-lg font-semibold'>Caught Up</h4>
        </div>
        <div className=" text-sm font-medium text-center">
        You have caught up with all posts. Comeback later to check if the chads have posted something !
        </div>
        </div>
  )
}

export default CaughtUp