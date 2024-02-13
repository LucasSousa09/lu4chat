'use client'

import { createId } from '@paralleldrive/cuid2'
import { database } from "@/libs/firebase";
import { ref, set } from "firebase/database";
import { PaperPlaneRight } from "@phosphor-icons/react";
import { useForm, SubmitHandler } from "react-hook-form";

type MessageSenderFormProps = {
    roomId: string,
    senderId: string,
    sender: string
}

type MessageSenderInput = {
    message: string
}

//FormData = sender, message, senderId

export function MessageSenderForm({roomId, senderId, sender }: MessageSenderFormProps){
    const { register, handleSubmit, reset } = useForm<MessageSenderInput>()

    
    const onSubmit: SubmitHandler<MessageSenderInput> = async (data) => {
        try {
            const date = new Date

            set(ref(database, 'rooms/' + roomId + '/messages/' + createId()), {
                sender, 
                senderId,
                content: data.message,
                createdAt: JSON.stringify(date)
            })

            reset()
        }
        catch(err){
            console.error(err)
        }
    }


    return (
        <form
            onSubmit={handleSubmit(onSubmit)} 
            className="flex items-center gap-4 w-full max-w-[100vw] p-4 border-t border-primary"
        >
            <input
                {...register('message')}
                type="text"
                className="h-[44px] sm:h-[52px] w-full border-2 border-primary text-secondary rounded py-3 px-4"
            />
            <button
                className="flex items-center gap-2 rounded bg-secondary text-white font-bold text-sm sm:text-xl px-4 py-3"
                >
                Enviar
                <PaperPlaneRight className="" weight='fill' />
            </button>
        </form>
    )
}