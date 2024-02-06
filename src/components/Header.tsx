import Link from "next/link";
import Image from "next/image";

import { CaretDown } from '@phosphor-icons/react/dist/ssr'

import logoWhite from '../assets/logo-white.png'
import logoMini from '../assets/logo-mini.png'


export function Header(){
    return (
        <header className="width-full border-b-primary border-b-1.5 ">
            <nav className={
                "max-w-desktop mx-auto flex gap-3 items-center py-1 px-3 " +
                "sm:gap-12 sm:py-2 sm:px-4 md:p-6"
            }>

                <Link href="/">
                    <Image className="hidden md:block" alt="" src={logoWhite} />
                    <Image className="block md:hidden h-12 w-12 sm:h-16 sm:w-16" alt="" src={logoMini} />
                </Link>

                <button className={
                        "font-medium flex items-center gap-1 text-primary text-base sm:text-xl " +
                        "transition-all ease-linear duration-150 hover:text-shadow-light "
                    } 
                >
                    Conversas
                    <CaretDown className="sm:h-6 sm:w-6" />
                </button>

                <Link href="/login" className={
                    "bg-primary text-white font-bold rounded ml-auto py-2 px-4 text-base sm:text-2xl " +
                    "transition-opacity  hover:opacity-75"
                    }
                >
                    Login
                </Link>
            </nav>
        </header>
    )
}