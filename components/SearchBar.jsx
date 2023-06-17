import React, { useMemo, useState } from 'react'
import SearchLine from 'remixicon-react/SearchLineIcon'
import SearchBarSkeleton from './skeletons/SearchBar.skeleton'
import useDebounce from '@/app/hooks/useDebouncer'
import useAuth from '@/app/hooks/useAuth'
const SearchBar = () => {
  const [searchKeyWord, setSearchKeyWord] = useState("")
  const [userResults, setUserResults] = useState([])
  const debouncedKey = useDebounce(searchKeyWord,500)
  const {searchUser} = useAuth()
  useMemo(() => {
    if(debouncedKey.length){
      searchUser(debouncedKey).then(res => setUserResults(res.data.data))
    }
  }, [debouncedKey])

  return (
    <div className='w-full h-full flex justify-center items-start p-8 relative'>
        <div className="relative bg-[#F4F4F4] hover:bg-[#f2f0f0] focus-within:bg-[#f2f0f0] h-[47px] w-[80%] group transition-all duration-150">
    <input 
    className='outline-none w-full h-[47px] bg-transparent px-6 placeholder:opacity-60 text-secondary font-semibold'
    placeholder='Search Chadify'
    value={searchKeyWord}
    onChange={(e) => setSearchKeyWord(e.target.value)}
    />
    <SearchLine size={30} className='absolute right-4 top-[8px] bottom-0 opacity-40 group-hover:text-primary group-hover:opacity-80 group-focus-within:text-primary group-focus-within:opacity-80'/>
    </div>
    <div className={`absolute w-[74%] top-[5.2rem] ${debouncedKey.length? 'visible': 'invisible'}`}>
      <div className="min-h-[40vh] max-h-[40vh] overflow-auto w-full bg-gray-100">
        {!userResults.length?
      <SearchBarSkeleton/>
        : userResults.map(user => (
          <div role="status" class="space-y-4 border border-gray-200 divide-y p-5 divide-gray-200 rounded dark:divide-gray-700 dark:border-gray-700">
          <div class="flex items-center justify-between">
              <div>
                  <div class=" rounded-full  w-24 mb-2.5">{user.name}</div>
                  <div class="w-32  rounded-full ">{user.username}</div>
              </div>
              <div class="rounded-full w-12">View</div>
          </div>
          </div>
        ))}
</div>

    </div>
    </div>
  )
}

export default SearchBar