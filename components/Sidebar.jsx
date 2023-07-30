import React from 'react'
import Logo from '@/assets/Logo.png'
import { FrontFacingChad, Home, NotificationBell, SearchLens, SettingsGear } from '@/assets/icons'
import Image from 'next/image'
import { redirect, usePathname, useRouter } from 'next/navigation'
import Logout from 'remixicon-react/LogoutBoxLineIcon'
import Link from 'next/link'
import Button from './Button'
import useAuth from '@/app/hooks/useAuth'
import { useLogout } from '@/app/hooks/useLogout'
import { toast } from 'react-toastify'
import HomeIcon from 'remixicon-react/HomeSmileFillIcon'
import SearchIcon from 'remixicon-react/SearchFillIcon'
import NotificationIcon from 'remixicon-react/Notification3FillIcon'
import SettingsIcon from 'remixicon-react/Settings2FillIcon'
import ProfileIcon from 'remixicon-react/UserFillIcon'

const Sidebar = ({ view }) => {
    const { auth } = useAuth()
    const links = [
        {
            name: 'Home',
            icon: HomeIcon,
            path: '/' + auth?.username,
            tbd: false,
        },
        {
            name: 'Search',
            icon: SearchIcon,
            path: '/',
            tbd: true,
        },
        {
            name: 'Notifications',
            icon: NotificationIcon,
            path: '/',
            tbd: true,
        },
        {
            name: 'Settings',
            icon: SettingsIcon,
            path: '/',
            tbd: true,
        },
        {
            name: 'Profile',
            icon: ProfileIcon,
            path: '/profiles/' + auth?.username,
            tbd: false,
        },
    ]
    const router = useRouter()
    const path = usePathname()
    const { hideChatWindow, setHideChatWindow } = useAuth()
    const logout = useLogout()

    const handleRouteChange = (link) => {
        if (link.tbd) {
            toast.info("This menu is currently under development. Please try again later.", {
                position: 'top-center',
                autoClose: 5000,
            })
        } else {
            router.push(link.path)
        }
    }

    if (view === "desktop") {
        return (
            <div className='flex flex-col w-full h-screen p-2 justify-start items-start'>
                <div className="flex justify-start items-start h-[10%]">
                    <Image src={Logo} className='scale-75 cursor-pointer' onClick={() => router.push('/' + auth?.username)} />
                </div>
                <div className="flex flex-col w-full justify-center mb-32 items-center h-[90%] pl-8 space-y-[40px] font-semibold">
                    {
                        links.map(link => (
                            <div
                                onClick={() => handleRouteChange(link)} className={`flex w-full justify-start items-center space-x-3 cursor-pointer transition-all duration-200 ${link.path === path ? "text-primary" : "text-black hover:text-secondary"}`}>
                                <link.icon />

                                <div className="">{link.name}</div>
                            </div>
                        ))
                    }
                </div>
                <div className="flex justify-center w-full items-end mb-14">
                    <button onClick={() => {
                        logout()
                    }} className='flex justify-center items-end space-x-3 text-primary font-semibold hover:text-secondary transition-all duration-200'>
                        <Logout />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        )
    }
    else if (view === "mobile") {
        return (
            <div className="w-full flex justify-around items-center bg-gray-200 min-h-[60px]">
                {links.map(link => (
                    <div className={`flex w-full justify-center items-center space-x-3 cursor-pointer transition-all duration-200 ${link.path === path ? "text-primary" : "text-black hover:text-secondary"}`} height={20} width={20} onClick={() => handleRouteChange(link)}>
                        <link.icon />
                    </div>
                ))}
            </div>
        )
    }
    else return <></>
}

export default Sidebar