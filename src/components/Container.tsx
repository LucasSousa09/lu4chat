'use client'

import { ReactNode, useState } from "react"
import { usePathname } from "next/navigation"

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify"

import { Header } from "./Header"
import { CreateRoomForm } from "./CreateRoomForm"

type ContainerProps = {
    children: ReactNode
}

export function Container({ children }: ContainerProps ){
    const [ modalIsOpen, setModalIsOpen ] = useState(false)

    const pathName = usePathname()

    return (
        <div className="relative w-full h-full bg-secondary">
            <Header setModalIsOpen={setModalIsOpen}/>
            <CreateRoomForm modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}/>
            {
                pathName === '/my-chats' && (
                    <div className="flex items-start justify-center bg-white max-w-desktop h-[calc(100vh-100px)] mx-auto pt-12">
                        <strong className=" bg-secondary py-6 px-8 rounded text-white text-4xl animate-pulse">
                            Loading...
                        </strong>
                    </div>
                )
            }
            {children}
            <ToastContainer position="bottom-right" theme="colored"/>
        </div>
    )
}