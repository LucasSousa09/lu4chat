'use client'

type MyChatsSidebarProps = {
    children: ReactNode
}

import { ReactNode, useContext } from "react";

import { MyChatsSidebarContext } from '../context/MyChatsSidebarContext'
import { X } from "@phosphor-icons/react";

export function MyChatsSidebar({ children } : MyChatsSidebarProps){
    const { sidebarIsOpen, setSidebarIsOpen } = useContext(MyChatsSidebarContext)
    
    return (
        <div className={
            "bg-white absolute top-0 left-0 bottom-0 md:static md:translate-x-0 transition-transform ease-linear " + 
            "md:w-96 h-full border-r border-primary py-3 px-1 " +
            `${sidebarIsOpen ? 'translate-x-0' : '-translate-x-96'}`
            }
        >
            <button
                onClick={() => setSidebarIsOpen(false)} 
                className="flex text-primary ml-auto mb-3 pr-1"
            >
                <X weight="bold" className="h-5 w-5"/>
            </button>
            { children }
        </div>
    )
}