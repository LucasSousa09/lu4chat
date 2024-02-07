'use client'

import Link from "next/link";
import Image from "next/image";
import { useState } from "react"

import { CaretDown, ListDashes, X } from '@phosphor-icons/react/dist/ssr'

import { Sidebar } from "./Sidebar";

import logoWhite from '../assets/logo-white.png'
import logoMini from '../assets/logo-mini.png'


export function Header(){
    const [ sidebarIsOpen, setSidebarIsOpen ] = useState(false)

    return (
        <header className="relative width-full border-b-primary border-b-1.5 ">
            <nav className={
                "max-w-desktop mx-auto flex gap-3 items-center py-1 px-3 " +
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

                <Sidebar setSidebarIsOpen={setSidebarIsOpen} sidebarIsOpen={sidebarIsOpen}/>

                <Link href="/">
                    <Image className="hidden md:block" alt="" src={logoWhite} />
                    <Image className="block md:hidden h-12 w-12 sm:h-16 sm:w-16" alt="" src={logoMini} />
                </Link>

                <button className={
                        "hidden font-medium sm:flex items-center gap-1 text-primary sm:text-xl " +
                        "transition-all ease-linear duration-150 hover:text-shadow-light "
                    } 
                >
                    Conversas
                    <CaretDown className="sm:h-6 sm:w-6" />
                </button>

                <div className="ml-auto flex gap-4">
                    <Link href="/login" className={
                        "hidden sm:block bg-primary text-white font-bold rounded py-2 px-4 text-base sm:text-2xl " +
                        "transition-opacity  hover:opacity-75"
                        }
                    >
                        Login
                    </Link>
                    <Link href="/create-account" className={
                        "border border-primary text-primary font-bold rounded py-2 px-4 text-base sm:text-2xl " +
                        "transition-opacity  hover:opacity-75"
                        }
                    >
                        Crie uma conta
                    </Link>    
                </div>
            </nav>
        </header>
    )
}