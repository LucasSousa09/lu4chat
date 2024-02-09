import { ReactNode } from "react"
import { RoomSidebarProvider } from '../context/RoomSidebarContext'

type MyChatsContainerProps = {
    children: ReactNode
}

export function MyChatsContainer({ children }: MyChatsContainerProps){
    return (
        <div className="relative bg-white max-w-desktop mx-auto flex h-[calc(100vh-52px)] sm:h-[calc(100vh-80px)] md:h-[calc(100vh-100px)]">
            <RoomSidebarProvider>
                {children}
            </RoomSidebarProvider>
        </div>
    )
}