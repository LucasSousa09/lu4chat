'use client'

import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react"

type MyChatsSidebarProps = {
    sidebarIsOpen: boolean
    setSidebarIsOpen: Dispatch<SetStateAction<boolean>>
}

export const MyChatsSidebarContext = createContext({} as MyChatsSidebarProps)

type MyChatsSidebarProviderProps = {
    children: ReactNode
}

export function MyChatsSidebarProvider({children}: MyChatsSidebarProviderProps){
    const [ sidebarIsOpen, setSidebarIsOpen ] = useState(true)

    return (
        <MyChatsSidebarContext.Provider value={{sidebarIsOpen, setSidebarIsOpen}}>
            {children}
        </MyChatsSidebarContext.Provider>
    )
}