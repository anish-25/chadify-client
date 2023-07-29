'use-client'
import React, { useMemo, useState } from 'react'
import DepressedChad from '@/assets/reaction-pngs/DepressedChad.png'
import ShockedWojak from '@/assets/reaction-pngs/ShockedWojak.png'
import SmilingWojak from '@/assets/reaction-pngs/SmilingWojak.png'
import SmokingWojak from '@/assets/reaction-pngs/SmokingWojak.png'
import Image from 'next/image'
import useAuth from '@/app/hooks/useAuth'
import useApi from '@/app/hooks/useApi'
const Reactions = ({ reaction, post }) => {
  const { auth } = useAuth()
  const [spinner, setSpinner] = useState("")
  const { reactToAPost, userTimeline, setUserTimeline } = useApi()
  const reactionButtons = [
    {
      name: 'Depressed Wojak',
      image: DepressedChad,
      alt: 'depressed-reaction',
      key: 'depressedWojak',
    },
    {
      name: 'Shocked Wojak',
      image: ShockedWojak,
      alt: 'shocked-reaction',
      key: 'shockedWojak',
    },
    {
      name: 'Smiling Wojak',
      image: SmilingWojak,
      alt: 'smiling-reaction',
      key: 'smilingWojak',
    },
    {
      name: 'Smoking Wojak',
      image: SmokingWojak,
      alt: 'meh-reaction',
      key: 'smokingWojak',
    },
  ]

  const handleClick = (key) => {
    setSpinner(key)
    reactToAPost(post?._id, key).then(res => {
      if (res.data?._id) {
        let timeLine = userTimeline
        const index = timeLine.findIndex(post => post?._id === res.data?._id)
        if (index >= 0) {
          timeLine[index] = { ...res.data, media: timeLine[index].media }
          setUserTimeline([...timeLine])
        }
      }
    }).finally(() =>{
    setTimeout(() => {
      setSpinner("")
    }, 500);
    } 
    )
  }
  function sortReactionButtonsByCountAndUserClick(reactionButtons) {
    return [...reactionButtons].sort((a, b) => {
      if (reaction[a.key].includes(auth?.id)) {
        return -1;
      } else if (reaction[b.key].includes(auth?.id)) {
        return 1;
      } else {
        return 0
      }
    });
  }
  return (
    <>
      <div className="flex justify-start items-center space-x-6">
        {
          sortReactionButtonsByCountAndUserClick(reactionButtons).map(userReaction => (
            <div className={`w-[25px] h-[26px] md:w-[38px] md:h-[39px] border border-black rounded-full transition-all duration-500 ease-in-out transform relative ${reaction[userReaction.key].includes(auth?.id) ? 'bg-green-400' : 'bg-gray-200'} bg-gray-200 hover:bg-green-400 transition-all duration-150 cursor-pointer`} onClick={() => {
              ; handleClick(userReaction.key)
            }} onDragEnd={() => { handleClick(userReaction.key) }}>
              <div className={`absolute -top-3 -right-5 rounded-2xl ${reaction[userReaction.key].includes(auth?.id) ? 'bg-green-400' : 'bg-primary'} h-4 md:h-5 text-white text-xs md:text-sm px-3 flex justify-center items-center text-center`}>
                {reaction[userReaction.key].length}
              </div>
              <div className="relative">
              <div className={spinner==userReaction.key?"spin spinner":""}></div>
                <Image src={userReaction.image} alt={userReaction.alt} className='w-[24px] h-[25px] md:w-[37px]  md:h-[38px] rounded-full' />
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Reactions