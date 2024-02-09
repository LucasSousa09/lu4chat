'use client'

import { useContext } from 'react'
import { ArrowLeft } from '@phosphor-icons/react'

import { RoomSidebarContext } from '@/context/RoomSidebarContext'

type TitleTextProps = {
    text: string
    returnButton?: boolean
}

export function TitleText({text, returnButton = false}: TitleTextProps){
    const { setSidebarIsOpen } = useContext(RoomSidebarContext)

    return (
        <strong className="flex items-center gap-2 text-primary font-medium text-xl sm:text-[28px] whitespace-nowrap mb-6">
            <button
                onClick={() => setSidebarIsOpen(state => !state)} 
                className={`md:hidden ${!returnButton && 'hidden'}`}>
                <ArrowLeft />
            </button>
            {text}
        </strong> 
    )
}