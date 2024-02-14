'use client'

import { useContext } from 'react'
import { ArrowLeft, Trash } from '@phosphor-icons/react'

import { MyChatsSidebarContext } from '@/context/MyChatsSidebarContext'
import { useParams, useRouter } from 'next/navigation'
import { api } from '@/libs/axios'
import { useSession } from 'next-auth/react'

type TitleTextProps = {
    text: string
    returnButton?: boolean,
    leaveRoom?: boolean 
}

export function TitleText({text, returnButton = false, leaveRoom = false}: TitleTextProps){
    const { setSidebarIsOpen } = useContext(MyChatsSidebarContext)

    const params = useParams()
    const {data: session} = useSession()
    const router = useRouter()

    async function handleLeaveRoom(paramsId: string | string[]){ 
        if(session !== null && session.user){
            const res = await api.post('/remove-room-from-user', {roomId: paramsId, email: session.user.email})

            if(res.status === 200){
                router.push('/my-chats')
            }
        }    
    }

    return (
        <strong className="flex items-center gap-2 text-primary font-medium text-xl sm:text-[28px] whitespace-nowrap mb-6">
            <button
                onClick={() => setSidebarIsOpen(state => !state)} 
                className={`md:hidden ${!returnButton && 'hidden'}`}>
                <ArrowLeft />
            </button>
            {text}

            <button
                onClick={() => handleLeaveRoom(params.id)} 
                className={
                    "flex items-center px-2 rounded gap-2 text-red-700 border border-none sm:border-solid border-red-700 sm:ml-auto sm:text-lg md:text-xl " + 
                    `${leaveRoom ? 'flex' : 'hidden'} ` +
                    "hover:hover:opacity-75 transition-opacity duration-150"
                }
            >
                <Trash />
                <span className="hidden sm:inline">Sair da sala</span>
            </button>
        </strong> 
    )
}