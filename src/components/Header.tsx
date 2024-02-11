'use client'

import Link from "next/link";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react"

import { CaretDown, ListDashes, X } from '@phosphor-icons/react/dist/ssr'

import { Sidebar } from "./Sidebar";

import logoWhite from '../assets/logo-white.png'
import logoMini from '../assets/logo-mini.png'

import { signOut, useSession } from "next-auth/react";


type HeaderProps = {
    setModalIsOpen: Dispatch<SetStateAction<boolean>>
}

export function Header({ setModalIsOpen }: HeaderProps){
    const [ sidebarIsOpen, setSidebarIsOpen ] = useState(false)
    const [ chatOptionsIsOpen, setChatOptionsIsOpen ] = useState(false)

    const {data: session, status} = useSession()

    return (
        <header className="relative width-full max-w-desktop mx-auto bg-white border-b-primary border-b-1.5 ">
            <nav className={
                "flex gap-3 items-center py-1 px-3 " +
                "sm:gap-12 sm:py-2 sm:px-4 md:p-6"
            }>
                <button 
                    className="sm:hidden"
                    onClick={() => setSidebarIsOpen(state => !state)}
                >
                    {
                        sidebarIsOpen ? 
                        <X className="text-primary h-7 w-7" /> :
                        <ListDashes className="text-primary h-7 w-7" />
                    }
                </button>

                <Sidebar setModalIsOpen={setModalIsOpen} setSidebarIsOpen={setSidebarIsOpen} sidebarIsOpen={sidebarIsOpen}/>

                <Link href="/">
                    <Image className="hidden md:block" alt="" src={logoWhite} />
                    <Image className="block md:hidden h-12 w-12 sm:h-16 sm:w-16" alt="" src={logoMini} />
                </Link>

                <div
                    onClick={() => setChatOptionsIsOpen(state => !state)} 
                    className={
                        "cursor-pointer  relative hidden font-medium sm:flex items-center gap-1 text-primary sm:text-xl " +
                        "hover:text-shadow-light transition-all ease-linear duration-150"
                    } 
                >
                    Conversas
                    <CaretDown 
                        className={
                            "sm:h-6 sm:w-6 transition-transform " +
                            `${chatOptionsIsOpen && 'rotate-180'}`
                        } 
                    />

                    {
                        chatOptionsIsOpen && (
                            <div className="absolute bg-white top-full right-1/2 translate-x-1/2 p-2 mt-4 hidden sm:flex flex-col rounded-md shadow-chat-options z-20" >
                                <Link 
                                    onClick={() => setChatOptionsIsOpen(true)}
                                    className="text-shadow-none whitespace-nowrap text-left py-3 px-2 text-base hover:bg-primary hover:text-white rounded transition-colors ease-in-out" href="/my-chats"
                                >
                                        Minhas Conversas
                                </Link>
                                <Link 
                                    onClick={() => setChatOptionsIsOpen(true)}
                                    className="text-shadow-none whitespace-nowrap text-left py-3 px-2 text-base hover:bg-primary hover:text-white rounded transition-colors ease-in-out" href="/public-rooms"
                                >
                                        Salas Públicas
                                </Link>
                                <button 
                                    onClick={() => {
                                        setChatOptionsIsOpen(true)
                                        setModalIsOpen(state => !state)
                                        return
                                    }}
                                    className="whitespace-nowrap text-left py-3 px-2 text-base hover:bg-primary hover:text-white rounded transition-colors ease-in-out" 
                                >
                                        + Criar sala
                                </button>
                            </div>
                        )
                    }

                </div>

                <div className="ml-auto flex gap-4">
                    {
                        status === 'authenticated' ? (
                            <button 
                                onClick={() => signOut()}
                                className={
                                    "hidden sm:block bg-primary text-white font-bold rounded py-2 px-4 text-base sm:text-xl md:text-2xl " +
                                    "transition-opacity  hover:opacity-75"
                                }
                            >
                                 Sair
                            </button>
                        ) : (
                            <>
                                <Link href="/login" className={
                                    "hidden sm:block bg-primary text-white font-bold rounded py-2 px-4 text-base sm:text-xl md:text-2xl " +
                                    "transition-opacity  hover:opacity-75"
                                    }
                                >
                                    Login
                                </Link>
                                <Link href="/create-account" className={
                                    "border border-primary text-primary font-bold rounded py-2 px-4 text-base sm:text-xl md:text-2xl " +
                                    "transition-opacity  hover:opacity-75"
                                    }
                                >
                                    Crie uma conta
                                </Link>
                            </>
                        )
                    }
                </div>
            </nav>
        </header>
    )
}