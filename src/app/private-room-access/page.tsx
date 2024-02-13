'use client'

import * as zod from 'zod'
import { useForm, SubmitHandler } from "react-hook-form"

import { Button } from "@/components/Button"
import { InputBox } from "@/components/InputBox"
import { zodResolver } from '@hookform/resolvers/zod'

import { api } from '@/libs/axios'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const EnterPrivateRoomSchema = zod.object({
    id: zod.string()
                .length(24, 'O id deve conter 24 caracteres'),
    password: zod.string()
                .min(6, 'A senha deve conter pelo menos 6 caracteres')
                .max(30, 'A descrição sala não deve conter mais de 30 caracteres'),
})

type EnterPrivateRoomData = zod.infer<typeof EnterPrivateRoomSchema>

export default function PrivateRoomAccess(){
    const {data: session} = useSession()

    const router = useRouter()

    const { handleSubmit, register, reset } = useForm<EnterPrivateRoomData>({
        resolver: zodResolver(EnterPrivateRoomSchema)
    })

    const onSubmit: SubmitHandler<EnterPrivateRoomData> = async (data) => {
        const resIfChatExists = await api.post('/verify-if-chat-exists', {chatID: `${data.id + '-private'}`})
        const chatExistsData = JSON.parse(resIfChatExists.data)

        if(chatExistsData === null){
            console.error('Room not found')
            reset()
            return
        }
        
        const res = await api.post('/enter-private-room', {chatID: `${data.id + '-private'}`, password: data.password, email:session?.user?.email})
        
        if(res.data === 'OK'){
            router.push(`/my-chats/${data.id + '-private'}`)
        }
    }

    return (
        <div className="flex justify-center items-center h-[calc(100vh-100px)]">
            <form
                onSubmit={handleSubmit(onSubmit)} 
                className="relative bg-white flex flex-col py-8 sm:py-12 px-6 sm:px-16 rounded border-2 border-primary max-w-[520px]"
            >   
                <strong className="font-medium text-xl sm:text-[28px] text-primary mb-3">Entre na Sala Privada</strong>

                <InputBox {...register('id')} inputId="room-id" inputPlaceholder="aznshbglçustnnldsjfnliau" labelText="Id da Sala" />        

                <InputBox {...register('password')} inputId="room-password" type="password" inputPlaceholder="••••••" labelText="Senha" />

                <Button>Entrar</Button>
            </form>
        </div>
    )
}