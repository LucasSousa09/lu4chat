'use client'
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

import { TitleText } from "./TitleText";

import { database } from "@/libs/firebase";
import { ChatBalloon } from "./ChatBalloon";

type MessagesContainerProps = {
    roomId: string,
    roomName?: string
}

type MessageProps = {
    content: string,
    sender: string,
    id: string,
    senderId: string,
    createdAt: string
}

type FirebaseMessageProps = [
   string, 
   {
       content: string,
       sender: string,
       id: string,
       senderId: string,
       createdAt: string
   }
]

export function MessagesContainer({roomId, roomName = ""}: MessagesContainerProps){
    const [messages, setMessages] = useState<MessageProps[]>()

    const messagesRef = ref(database, "rooms/" + roomId + "/messages")
    
    useEffect(() => {
        
        onValue(messagesRef, (snapshot) => {
            const data = snapshot.val()

            if(data === null){
                return []
            }

            const messagesData: FirebaseMessageProps[] = Object.entries(data)

            const messagesArray: MessageProps[] = messagesData.map(values => {
                return {
                    id: values[0],
                    content: values[1].content,
                    sender: values[1].sender,
                    senderId: values[1].senderId,
                    createdAt: values[1].createdAt
                }
            }).sort(function(a,b){
                return a.createdAt.localeCompare(b.createdAt)
            })

            setMessages(messagesArray)
        })

    },[])

    return (
        <div className="flex-1 p-6 overflow-auto">
            <TitleText returnButton leaveRoom text={roomName} />
            <span className="text-primary font-medium" >Id da sala: </span>
            <span className="text-primary" >{roomId.split('-')[0]}</span>
            <div className="flex flex-col mt-6 gap-2">
                {
                    messages !== undefined && (
                        messages.length > 0 && (
                            messages.map((message, idx) => {
                                return(
                                <ChatBalloon key={message.id} evenMessage={idx % 2 === 0 ? "even" : "odd"} sender={message.sender} message={message.content} />
                            )})
                        ) 
                    )
                }
            </div>
        </div>
    )
}