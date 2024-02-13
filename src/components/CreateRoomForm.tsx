'use client'

import * as zod from 'zod' 
import { X } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { ref, set } from "firebase/database"
import { createId } from '@paralleldrive/cuid2'
import { Dispatch, SetStateAction, useEffect } from "react"
import { useForm, SubmitHandler } from 'react-hook-form'


import { database } from '../libs/firebase'

import { Button } from "./Button";
import { InputBox } from "./InputBox";
import { SelectorBox } from "./SelectorBox";
import { zodResolver } from '@hookform/resolvers/zod'

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
    permissions: zod.enum(['private', 'public']),
    "room-password":  zod.string().refine((val) => val.length > 0, {
        message: 'password must contain moore than 0 characters'
    })
})

type CreateRoomData = zod.infer<typeof CreateRoomSchema>

export function CreateRoomForm({ modalIsOpen, setModalIsOpen }: CreateRoomFormProps) {
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
            permissions: 'public',
            "room-password": '0000'
        }
    })
    useEffect(() => {
        if(formState.dirtyFields.permissions === undefined){
            setValue('room-password', '0000')
        }
        else{
            setValue('room-password', '')
        }
    }, [formState.dirtyFields.permissions])

    
    const onSubmit: SubmitHandler<CreateRoomData> = (data) => {
        const newCuid = createId()

        try{
            if(session === null){
                throw new Error('Must be logged to criate a room')
            }

            if(data['room-password'] === '0000'){
                set(ref(database, 'rooms/' + newCuid), {
                    id: newCuid,
                    name: data.name,
                    description: data.description,
                    permission: data.permissions,
                })

                router.push(`/my-chats/${newCuid}`)

            }
            else {
                set(ref(database, 'rooms/' + newCuid + '-private'), {
                    id: newCuid + '-private',
                    name: data.name,
                    description: data.description,
                    permission: data.permissions,
                    "room-password": data['room-password']
                })
                router.push(`/my-chats/${newCuid}-private`)
            }

            reset()
        }
        catch(err) {
            console.error(err)
        }

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
                    formState.dirtyFields.permissions === true &&
                    <InputBox {...register('room-password')} inputId='private-password' inputPlaceholder='••••••' labelText='Senha da sala' />
                }

                <SelectorBox {...register('permissions')} labelText="Permissões" selectId="room-permissions" />

                <Button>Criar sala</Button>
            </form>
        </div>
    )
}