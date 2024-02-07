import { ReactNode } from "react"

type ButtonProps = {
    children: ReactNode
}

export function Button({children}: ButtonProps){
    return (
        <button 
            className={
                "flex items-center justify-center gap-3 font-medium text-white bg-primary w-full rounded text-base sm:text-xl leafing-normal p-3 " +
                "hover:opacity-75 transition-opacity duration-150 "
            }
        >
            {children}
        </button>
    )
}