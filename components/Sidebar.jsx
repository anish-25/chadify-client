import React from 'react'
import Logo from '@/assets/Logo.png'
import { FrontFacingChad, Home, NotificationBell, SearchLens, SettingsGear } from '@/assets/icons'
import Image from 'next/image'
import { redirect, useRouter } from 'next/navigation'

const Sidebar = () => {
 const links = [
    {
    name : 'Home',
    icon : Home,
    path : '/',
    },
    {
    name : 'Search',
    icon : SearchLens,
    path : '/'
    },
    {
    name : 'Notifications',
    icon : NotificationBell,
    path : '/'
    },
    {
    name : 'Settings',
    icon : SettingsGear,
    path : '/'
    },
    {
    name : 'Profile',
    icon : FrontFacingChad,
    path : '/'
    },
 ]
 const router = useRouter()
  return (
    <div className='flex flex-col w-full h-screen p-2 justify-start items-start'>
    <div className="flex justify-start items-start h-[10%]">
        <Image src={Logo} className='scale-75 cursor-pointer' onClick={() => router.push('/')}/>
    </div>
    <div className="flex flex-col w-full justify-center mb-32 items-center h-[90%] pl-8 space-y-[40px] text-secondary font-semibold">
        {
            links.map(link => (
                <div className="flex w-full justify-start items-center space-x-3 hover:font-bold cursor-pointer transition-all duration-150">
                <Image src={link.icon} alt='nav-icon' width={22} height={20}/>
                <div className="">{link.name}</div>
                </div>
            ))
        }
    </div>
    </div>
  )
}

export default Sidebar