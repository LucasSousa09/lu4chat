'use client'

type RoomSidebarProps = {
    children: ReactNode
}

import { ReactNode, useContext } from "react";

import { RoomSidebarContext } from '../context/RoomSidebarContext'

export function RoomSidebar({ children } : RoomSidebarProps){
    const { sidebarIsOpen } = useContext(RoomSidebarContext)
    
    return (
        <div className={
            "bg-white absolute top-0 left-0 bottom-0 md:static md:translate-x-0 transition-transform ease-linear " + 
            "md:w-96 h-full border-r border-primary py-3 px-1 " +
            `${sidebarIsOpen ? 'translate-x-0' : '-translate-x-96'}`
            }
        >
            { children }
        </div>
    )
}