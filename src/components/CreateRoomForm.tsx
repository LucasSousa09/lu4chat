'use client'

import * as zod from 'zod' 
import { toast } from 'react-toastify'
import { X } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useForm, SubmitHandler } from 'react-hook-form'

import { Button } from "./Button";
import { InputBox } from "./InputBox";
import { SelectorBox } from "./SelectorBox";
import { api } from '@/libs/axios'

type CreateRoomFormProps = {
    modalIsOpen: boolean
    setModalIsOpen: Dispatch<SetStateAction<boolean>>
}

const CreateRoomSchema = zod.object({
    name: zod.string()
                .min(3, 'O Nome da sala deve ter no mínimo 3 caracteres')
                .max(20, 'O nome da sala não deve conter mais de 20 caracteres'),
    description: zod.string()
                .min(3, 'A descrição da sala deve ter no mínimo 3 caracteres')
                .max(20, 'A descrição sala não deve conter mais de 40 caracteres'),
    permission: zod.enum(['private', 'public']),
    "room-password":  zod.string().refine((val) => val.length > 5, {
        message: 'A senha deve conter no minímo 6 caracteres'
    })
})

type CreateRoomData = zod.infer<typeof CreateRoomSchema>

export function CreateRoomForm({ modalIsOpen, setModalIsOpen }: CreateRoomFormProps) {
    const [ creatingRoom, setCreatingRoom ] = useState(false)
    const {data: session} = useSession()
    
    const router = useRouter()
    const { 
        register, 
        handleSubmit, 
        reset, 
        formState,
        setValue 
    } = useForm<CreateRoomData>({
        resolver: zodResolver(CreateRoomSchema),
        defaultValues: {
            permission: 'public',
            "room-password": '000000'
        }
    })
    
    useEffect(() => {
        if(formState.dirtyFields.permission === undefined){
            setValue('room-password', '000000')
        }
        else{
            setValue('room-password', '')
        }
    }, [formState.dirtyFields.permission])

    useEffect(() => {
        const currentError = Object.keys(formState.errors)[0]
        const errorMessage = formState.errors[currentError as keyof CreateRoomData]?.message

        toast.error(errorMessage)
    },[formState.errors])

    
    const onSubmit: SubmitHandler<CreateRoomData> = async (data) => {
        setCreatingRoom(true)
        try{
            if(session === null){
                throw new Error('Must be logged to criate a room')
            }

            const res = await api.post('/create-room', {
                name: data.name, 
                description: data.description,
                "room-password": data['room-password'],
                permission: data.permission,
                email: session.user?.email
            })

            router.push(`/my-chats/${res.data.roomIdForRedirect}`)

            reset()
        }
        catch(err) {
            console.error(err)
        }
        setCreatingRoom(false)
        setModalIsOpen(false)
    }

    return (
        <div 
            className={
                "fixed top-0 bottom-0 left-0 right-0 justify-center items-center bg-overlay h-screen w-screen z-50 " +
                `${modalIsOpen ? 'flex' : 'hidden' }`
            }
        >
            <form
                onSubmit={handleSubmit(onSubmit)} 
                className="relative bg-white flex flex-col py-8 sm:py-12 px-6 sm:px-16 rounded border-2 border-primary max-w-[520px]"
            >
                <button
                    onClick={() => setModalIsOpen(false)} 
                    className="absolute right-6 sm:right-16"
                >
                    <X className="text-primary h-5 w-5 sm:h-6 sm:w-6" weight="bold" />
                </button>
                
                <strong className="font-medium text-xl sm:text-[28px] text-primary mb-3">Crie uma Sala</strong>

                <InputBox {...register('name')} inputId="room-name" inputPlaceholder="ex: Honkai Star Rail - BR" labelText="Nome da Sala" />        

                <InputBox {...register('description')} inputId="room-description" inputPlaceholder="ex: Para todos os fãs de Star Rail" labelText="Descrição" />

                {
                    formState.dirtyFields.permission === true &&
                    <InputBox {...register('room-password')} inputType='password'  inputId='private-password' inputPlaceholder='••••••' labelText='Senha da sala' />
                }

                <SelectorBox {...register('permission')} labelText="Permissões" selectId="room-permission" />

                <Button
                 disabled={creatingRoom}
                >
                    Criar sala
                </Button>
            </form>
        </div>
    )
}