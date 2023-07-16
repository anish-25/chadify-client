import React from 'react'
import Logo from '@/assets/Logo.png'
import { FrontFacingChad, Home, NotificationBell, SearchLens, SettingsGear } from '@/assets/icons'
import Image from 'next/image'
import { redirect, useRouter } from 'next/navigation'
import Logout from 'remixicon-react/LogoutBoxLineIcon'
import Link from 'next/link'
import Button from './Button'
import { getFireBaseFile, handleLogout } from '@/utils/helpers'
import useAuth from '@/app/hooks/useAuth'
import { useLogout } from '@/app/hooks/useLogout'

const Sidebar = () => {
    const {auth} = useAuth()
    const links = [
        {
            name: 'Home',
            icon: Home,
            path: '/'+auth?.username,
        },
        {
            name: 'Search',
            icon: SearchLens,
            path: '/'
        },
        {
            name: 'Notifications',
            icon: NotificationBell,
            path: '/'
        },
        {
            name: 'Settings',
            icon: SettingsGear,
            path: '/'
        },
        {
            name: 'Profile',
            icon: FrontFacingChad,
            path: '/profiles/'+auth?.username
        },
    ]
    const router = useRouter()
    const { hideChatWindow, setHideChatWindow } = useAuth()
    const logout = useLogout()
    return (
        <div className='flex flex-col w-full h-screen p-2 justify-start items-start'>
            <div className="flex justify-start items-start h-[10%]">
                <Image src={Logo} className='scale-75 cursor-pointer' onClick={() => router.push('/'+auth?.username)} />
            </div>
            <div className="flex flex-col w-full justify-center mb-32 items-center h-[90%] pl-8 space-y-[40px] text-secondary font-semibold">
                {
                    links.map(link => (
                        <div onClick={() => { if (link.name === "Profile") { setHideChatWindow(true) } else { setHideChatWindow(false) }; router.push(link.path) }} className="flex w-full justify-start items-center space-x-3 hover:opacity-100 opacity-80 cursor-pointer transition-all duration-200">
                            <Image src={link.icon} alt='nav-icon' width={22} height={20} />
                            <div className="">{link.name}</div>
                        </div>
                    ))
                }
            </div>
            <div className="flex justify-center w-full items-end mb-14">
                <button onClick={() => {
                    logout()
                }} className='flex justify-center items-end w-[40%] space-x-3'>
                    <Logout color='red' />
                    <span className='text-red-500 font-medium'>Logout</span>
                </button>
            </div>
        </div>
    )
}

export default Sidebar