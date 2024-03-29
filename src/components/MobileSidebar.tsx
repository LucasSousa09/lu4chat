'use client'

import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./Button";
import { signOut } from "next-auth/react";

type SidebarProps = {
    sidebarIsOpen: boolean,
    setSidebarIsOpen: Dispatch<SetStateAction<boolean>>
    setModalIsOpen: Dispatch<SetStateAction<boolean>>
    status: "authenticated" | "loading" | "unauthenticated"
}

export function MobileSidebar({ setModalIsOpen , setSidebarIsOpen, sidebarIsOpen, status }: SidebarProps) {
    return (
        <div 
            className={
                "absolute top-full left-0 h-[calc(100vh-56px)] w-full sm:hidden bg-white border-t border-primary transition-transform z-10 " +
                `${sidebarIsOpen ? 'translate-x-0' : 'translate-x-[-100vw]'}`
            }

        >
            <nav className="flex flex-col h-full pb-4">
                <Link 
                    href="/my-chats"
                    onClick={() => setSidebarIsOpen(state => !state)}
                    className="text-primary font-medium flex p-4 border-b border-primary"
                >
                    Minhas Conversas
                </Link>
                <Link 
                    href="/public-rooms"
                    onClick={() => setSidebarIsOpen(state => !state)}
                    className="text-primary font-medium flex p-4 border-b border-primary" 
                    >
                        Salas Públicas
                </Link>
                <Link 
                    href="/private-room-access"
                    onClick={() => setSidebarIsOpen(state => !state)}
                    className="text-primary font-medium flex p-4 border-b border-primary" 
                    >
                        Entrar numa Sala
                </Link>
                <button
                    onClick={() => {
                        setSidebarIsOpen(state => !state)
                        setModalIsOpen(state => !state)
                        return
                    }}
                    className="text-primary font-medium flex p-4 border-b border-primary"
                >
                    + Criar nova sala
                </button>

                {
                    status === 'authenticated' ? (
                        <button
                            onClick={() => {
                                signOut()
                                setSidebarIsOpen(state => !state)
                            }}
                            className={
                                "mt-auto mx-auto flex items-center justify-center gap-3 font-medium text-white bg-primary w-[calc(100%-32px)] rounded text-base sm:text-xl leafing-normal p-3 " +
                                "hover:opacity-75 transition-opacity duration-150 "
                            }
                        >
                            Sair
                        </button>
                    ) : (
                        <Link
                            href="/login"
                            onClick={() => setSidebarIsOpen(state => !state)}
                            className={
                                "mt-auto mx-auto flex items-center justify-center gap-3 font-medium text-white bg-primary w-[calc(100%-32px)] rounded text-base sm:text-xl leafing-normal p-3 " +
                                "hover:opacity-75 transition-opacity duration-150 "
                            }
                        >
                            Login
                        </Link>
                    )
                }
            </nav>
        </div>
    )
}