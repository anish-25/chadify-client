import React from 'react'
import SearchLine from 'remixicon-react/SearchLineIcon'
const SearchBar = () => {
  return (
    <div className='w-full h-full flex justify-center items-start p-8'>
        <div className="relative bg-[#F4F4F4] hover:bg-[#f2f0f0] focus-within:bg-[#f2f0f0] h-[47px] w-[80%] group transition-all duration-150">
    <input 
    className='outline-none w-full h-[47px] bg-transparent px-6 placeholder:opacity-60 text-secondary font-semibold'
    placeholder='Search Chadify'
    />
    <SearchLine size={30} className='absolute right-4 top-[8px] bottom-0 opacity-40 group-hover:text-primary group-hover:opacity-80 group-focus-within:text-primary group-focus-within:opacity-80'/>
    </div>
    </div>
  )
}

export default SearchBar