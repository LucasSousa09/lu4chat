'use client'

import { ReactNode, useState } from "react"
import { Header } from "./Header"
import { CreateRoomForm } from "./CreateRoomForm"

type ContainerProps = {
    children: ReactNode
}

export function Container({ children }: ContainerProps ){
    const [ modalIsOpen, setModalIsOpen ] = useState(false)

    return (
        <div className="w-full h-full">
            <Header setModalIsOpen={setModalIsOpen}/>
            <CreateRoomForm modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}/>
            {children}
        </div>
    )
}