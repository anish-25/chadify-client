import React, { useState } from 'react'

const Search = ({caption,setCaption}) => {
    const [value, setValue] = useState("")
  return (
    <div className="mt-4 relative">
    <textarea maxLength={256} value={value} onBlur={(e) => {setCaption(e.target.value)}} onChange={(e) => {setValue(e.target.value)}} placeholder='Write a caption' style={{resize:'none',border:'none',outline:'none',width:'100%'}} name="" id="" cols="30" rows="10">

    </textarea>
    <p style={{position:'absolute',bottom:'10px' ,right:'20px'}} className='text-xs opacity-70'>{value.length}/256</p>
 </div>
  )
}

export default Search