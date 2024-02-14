import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { MyChatsSidebar } from "@/components/MyChatsSidebar";
import { RoomInfoBoxMyChat } from "@/components/RoomInfoBoxMyChat";
import { MessagesContainer } from "@/components/MessagesContainer";
import { MyChatsSidebarProvider } from "@/context/MyChatsSidebarContext";
import { MessageSenderForm } from "@/components/MessageSenderForm";

import { api } from "@/libs/axios";

export default async function Chats({params}: {params: {id: string}}){
    const session = await getServerSession()

    //Verify if chat exists
    const resIfChatExists = await api.post('/verify-if-chat-exists', {chatID: params.id})

    const chatExistsData = JSON.parse(resIfChatExists.data)

    //If chat does not exists redirect to Public Rooms
    if(chatExistsData === null){
        redirect('/public-rooms')
    }

    //Verify if user is logged, if not redirect to login
    if(session === null){
        redirect('login')
    }

    //Verify if the user already participates at the chat, if not adds to the user chat list
    const res = await api.post('/add-room-to-user', {email: session.user?.email, room: `${params.id}`})

    let userRoomsData

    if(res.data === 'This room is private'){
        redirect('/private-room-access')
    }

    if(res.status === 200){
        userRoomsData = res.data.userRoomsArray
    }
    else{
        console.error(res.data)
    }

    return (
        <div className="relative bg-white max-w-desktop mx-auto flex h-[calc(100vh-52px)] sm:h-[calc(100vh-80px)] md:h-[calc(100vh-100px)]">
            <MyChatsSidebarProvider>
                <MyChatsSidebar>
                    {
                        userRoomsData.length > 0 &&
                        userRoomsData.map((room: string) => (
                            <RoomInfoBoxMyChat key={room} roomId={room} currentRoom={params.id === room ? true : false} />
                        ))
                    }
                </MyChatsSidebar>

                <main className="flex flex-col-reverse h-full w-full">
                    <MessageSenderForm roomId={params.id} senderId={res.data.userId} sender={session.user?.name || ""}/>

                    <MessagesContainer roomId={params.id} roomName={chatExistsData.name} />
                </main>
            </MyChatsSidebarProvider>
        </div>
    )
}