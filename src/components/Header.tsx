import Link from "next/link";
import Image from "next/image";

import { CaretDown } from '@phosphor-icons/react/dist/ssr'

import logoWhite from '../assets/logo-white.png'


export function Header(){
    return (
        <div className="flex gap-12 items-center width-full border-b-1.5 border-b-primary sm:p-6">
            <Link href="/">
                <Image alt="" src={logoWhite} />
            </Link>

            <button className={
                    "font-medium flex items-center gap-1 text-primary sm:text-xl " +
                    "transition-all ease-linear duration-150 hover:text-shadow-light "
                } 
            >
                Conversas
                <CaretDown className="sm:h-6 sm:w-6" />
            </button>

            <Link href="/login" className={
                "bg-primary text-white font-bold sm:py-2 sm:px-4 sm:text-2xl rounded ml-auto " +
                "transition-opacity  hover:opacity-75"
                }
            >
                Login
            </Link>
        </div>
    )
}