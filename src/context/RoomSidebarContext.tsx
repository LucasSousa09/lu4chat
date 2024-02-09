'use client'

import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react"

type RoomSidebarProps = {
    sidebarIsOpen: boolean
    setSidebarIsOpen: Dispatch<SetStateAction<boolean>>
}

export const RoomSidebarContext = createContext({} as RoomSidebarProps)

type RoomSidebarProviderProps = {
    children: ReactNode
}

export function RoomSidebarProvider({children}: RoomSidebarProviderProps){
    const [ sidebarIsOpen, setSidebarIsOpen ] = useState(true)

    return (
        <RoomSidebarContext.Provider value={{sidebarIsOpen, setSidebarIsOpen}}>
            {children}
        </RoomSidebarContext.Provider>
    )
}