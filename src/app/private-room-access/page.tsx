'use client'

import * as zod from 'zod'
import { useForm, SubmitHandler } from "react-hook-form"

import { Button } from "@/components/Button"
import { InputBox } from "@/components/InputBox"
import { zodResolver } from '@hookform/resolvers/zod'

import { api } from '@/libs/axios'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const EnterPrivateRoomSchema = zod.object({
    id: zod.string()
                .length(24, 'O id deve conter 24 caracteres'),
    password: zod.string()
                .min(6, 'A senha deve conter pelo menos 6 caracteres')
                .max(30, 'A descrição sala não deve conter mais de 30 caracteres'),
})

type EnterPrivateRoomData = zod.infer<typeof EnterPrivateRoomSchema>

export default function PrivateRoomAccess(){
    const [enteringRoom, setEnteringRoom] = useState(false)
    const {data: session} = useSession()

    const router = useRouter()

    const { handleSubmit, register, formState, setFocus } = useForm<EnterPrivateRoomData>({
        resolver: zodResolver(EnterPrivateRoomSchema)
    })

    useEffect(() => {
        const currentError = Object.keys(formState.errors)[0]
        const errorMessage = formState.errors[currentError as keyof EnterPrivateRoomData]?.message

        toast.error(errorMessage)
    },[formState.errors])

    const onSubmit: SubmitHandler<EnterPrivateRoomData> = async (data) => {
        setEnteringRoom(true)
        const resIfChatExists = await api.post('/verify-if-chat-exists', {chatID: `${data.id + '-private'}`})
        const chatExistsData = JSON.parse(resIfChatExists.data)

        if(chatExistsData === null){
            toast.error('Essa sala não existe')
            setFocus('id')
            setEnteringRoom(false)
            return
        }
        
        const res = await api.post('/enter-private-room', {chatID: `${data.id + '-private'}`, password: data.password, email:session?.user?.email})
        
        if(res.data === 'OK'){
            toast.success('Redirecionamento bem sucedido')
            router.push(`/my-chats/${data.id + '-private'}`)
        }
        else{
            setFocus('password')
            toast.error('Senha incorreta')
        }
        setEnteringRoom(false)
    }

    return (
        <div className=" bg-white flex justify-center items-center h-[calc(100vh-100px)] max-w-desktop mx-auto">
            <form
                onSubmit={handleSubmit(onSubmit)} 
                className="relative bg-secondary rounded flex flex-col py-8 sm:py-12 px-6 sm:px-16 max-w-[520px]"
            >   
                <strong className="font-medium text-xl sm:text-[28px] text-white mb-3">Entre na Sala Privada</strong>

                <InputBox textColor='white' {...register('id')} inputId="room-id" inputPlaceholder="aznshbglçustnnldsjfnliau" labelText="Id da Sala" />        

                <InputBox textColor='white' {...register('password')} inputId="room-password" type="password" inputPlaceholder="••••••" labelText="Senha" />

                <Button
                    disabled={enteringRoom}
                >Entrar</Button>
            </form>
        </div>
    )
}