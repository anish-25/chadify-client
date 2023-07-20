'use-client'
import React, { useState } from 'react'
import DepressedChad from '@/assets/reaction-pngs/DepressedChad.png'
import ShockedWojak from '@/assets/reaction-pngs/ShockedWojak.png'
import SmilingWojak from '@/assets/reaction-pngs/SmilingWojak.png'
import SmokingWojak from '@/assets/reaction-pngs/SmokingWojak.png'
import Image from 'next/image'
const Reactions = ({reaction}) => {
  const [counts, setCounts] = useState(reaction)
  const [initialCountState, setInitialCountState] = useState(reaction)
  const [userClickedOn, setUserClickedOn] = useState("")
  console.log("counts",counts)
  const reactionButtons = [
    {
      name : 'Depressed Wojak',
      image : DepressedChad,
      alt : 'depressed-reaction',
      key : 'depressedWojak',
    },
    {
      name : 'Shocked Wojak',
      image : ShockedWojak,
      alt : 'shocked-reaction',
      key : 'shockedWojak',
    },
    {
      name : 'Smiling Wojak',
      image : SmilingWojak,
      alt : 'smiling-reaction',
      key : 'smilingWojak',
    },
    {
      name : 'Smoking Wojak',
      image : SmokingWojak,
      alt : 'meh-reaction',
      key : 'smokingWojak',
    },
  ]

  const handleClick = (key) => {
    if(userClickedOn == key){
      setCounts(prev => ({...initialCountState,[key]:prev[key]-1}))
      setUserClickedOn("")
    }
    else{
      setCounts(prev => ({...initialCountState,[key]:initialCountState[key]+1}))
    }
  }
  function sortReactionButtonsByCountAndUserClick(reactionButtons) {
    return [...reactionButtons].sort((a, b) => {
      if (a.key === userClickedOn) {
        return -1;
      } else if (b.key === userClickedOn) {
        return 1;
      } else {
        // return counts[b.key] - counts[a.key];
      }
    });
  }

  return (
    <>
      <div className="flex justify-start items-center space-x-6">
    {
     sortReactionButtonsByCountAndUserClick(reactionButtons).map(reaction => (
    <div className={`w-[25px] h-[26px] md:w-[38px] md:h-[39px] border border-black rounded-full transition-all duration-500 ease-in-out transform relative ${userClickedOn == reaction.key?'bg-green-400': 'bg-gray-200'} bg-gray-200 hover:bg-green-400 transition-all duration-150 cursor-pointer`} onClick={() => {
      setUserClickedOn(reaction.key); handleClick(reaction.key)}} onDragEnd={() => {setUserClickedOn(reaction.key); handleClick(reaction.key)}}>
      <div className={`absolute -top-3 -right-5 rounded-2xl ${userClickedOn == reaction.key?'bg-green-400':'bg-primary'} h-4 md:h-5 text-white text-xs md:text-sm px-3 flex justify-center items-center text-center`}>
        {counts[reaction.key].length}
      </div>
      <Image src={reaction.image} alt={reaction.alt} className='w-[24px] h-[25px] md:w-[37px]  md:h-[38px] rounded-full'/>
    </div>
      ))
}
      </div>
  </>
  )
}

export default Reactions