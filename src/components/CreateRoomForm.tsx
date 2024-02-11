'use client'

import { Dispatch, SetStateAction } from "react";
import { useForm, SubmitHandler } from 'react-hook-form'

import { ref, set } from "firebase/database"
import { createId } from '@paralleldrive/cuid2'

import { database } from '../libs/firebase'



import { Button } from "./Button";
import { InputBox } from "./InputBox";
import { SelectorBox } from "./SelectorBox";

import { X } from '@phosphor-icons/react'

type CreateRoomFormProps = {
    modalIsOpen: boolean
    setModalIsOpen: Dispatch<SetStateAction<boolean>>
}

type FormInputs = {
    name: string
    description: string
    permissions: 'public' | 'private'
}

export function CreateRoomForm({ modalIsOpen, setModalIsOpen }: CreateRoomFormProps) {
    const { register, handleSubmit, reset } = useForm<FormInputs>()

    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        const newCuid = createId()
        try{
            set(ref(database, 'rooms/' + newCuid), {
                id: newCuid,
                name: data.name,
                description: data.description,
                permission: data.permissions
            })

            reset()

        }
        catch(err) {
            console.log(err)
        }
        setModalIsOpen(false)
    }

    return (
        <div 
            className={
                "fixed top-0 bottom-0 left-0 right-0 justify-center items-center bg-overlay h-screen w-screen " +
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

                <SelectorBox {...register('permissions')} labelText="Permissões" selectId="room-permissions" />

                <Button>Criar sala</Button>
            </form>
        </div>
    )
}