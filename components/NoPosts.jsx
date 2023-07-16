import React from 'react'
import CameraThree from 'remixicon-react/Camera3LineIcon'
const NoPosts = () => {
  return (
    <div className="flex w-full">
        <div className="w-[12%]"></div>
    <div className='flex w-[88%] justify-center items-center flex-col space-y-3'>
        <span>
        <CameraThree size={45}/>
        </span>
        <span>
        No Posts Yet
        </span>
    </div>
    </div>
  )
}

export default NoPosts