'use client'

import { RoomSidebarContext } from "@/context/RoomSidebarContext"
import { useContext } from "react"

type RoomInfoBoxProps = {
    roomName: string
    roomType: 'public' | 'private'
    roomDescription: string

    enterRoom?: boolean

    currentRoom?: boolean
}

export function RoomInfoBox({ roomName, roomType, roomDescription, currentRoom = false, enterRoom = true }: RoomInfoBoxProps){
    const { setSidebarIsOpen } = useContext(RoomSidebarContext)

    return (
        <div 
            onClick={() => setSidebarIsOpen(state => !state)}
            className={
                "w-full rounded mb-3 " +
                `${currentRoom ? 'border-none bg-secondary' : 'border border-primary'}` 
            }
        >
            <header 
                className={
                    "flex items-center justify-between p-2 border-b " +
                    `${currentRoom ? 'border-white text-white' : 'border-primary text-primary'}`
                }
            >
                <strong >{roomName}</strong>
                <span className="font-medium text-sm">{roomType === 'private' ? 'Privada' : 'Pública'}</span>
            </header>
            <div className="flex items-center justify-between px-2 py-3">
                <span className="text-terciary text-sm">{roomDescription}</span>
                <button 
                    className={
                        "p-[6px] rounded font-medium text-sm " +
                        `${currentRoom ? 'bg-white text-secondary' : 'bg-primary text-white'}`
                    }
                >
                       {enterRoom ? 'Entrar' : 'Sair'}
                </button>
            </div>
        </div>
    )
}