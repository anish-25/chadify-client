import React from 'react'
import RedCross from '@/assets/RedCross.png'
import Image from 'next/image'
import { Tooltip } from 'flowbite-react'
const Input = ({
  placeHolder,
  value,
  onChange,
  error,
  type,
}) => {
  return (
    <>
      <div className="relative">
        <input type={type} placeholder={placeHolder} value={value} onChange={(e) => onChange(e)} className={`w-full pl-[10px] !outline-none text-secondary text-sm placeholder-secondary placeholder:text-sm placeholder:opacity-50 group h-[45px] !ring-transparent hover:!ring-transparent bg-[#F4F4F4] !border !border-transparent transition-all duration-150 ${error?.length ? '!border-b-red-600 focus:!border-b-red-600 hover:!border-b-red-600' : 'focus:!border-b-primary hover:!border-b-primary'}`} />
        {error?.length ? <>
        <div className="absolute z-10 w-fit top-[14px] right-[20px]">
          <Tooltip placement='right' className='!w-fit bg-secondary font-normal text-xs' content={error}>
          <Image alt='red-cross' className='h-[20px] w-[20px] border border-red-600 rounded-[50%] p-[3px]' src={RedCross} />
          </Tooltip>
          </div>
        </>
          :<></>}

        </div>
      </>
      )
}

      export default Input