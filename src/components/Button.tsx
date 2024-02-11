'use client'

import { ReactNode, forwardRef } from "react"

type ButtonProps = {
    children: ReactNode
    handleSignInWithGoogle?: () => void 
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({children, ...rest}, ref) => {
    return (
        <button
            {...rest}
            ref={ref} 
            className={
                "flex items-center justify-center gap-3 font-medium text-white bg-primary w-full rounded text-base sm:text-xl leafing-normal p-3 " +
                "hover:opacity-75 transition-opacity duration-150 "
            }
        >
            {children}
        </button>
    )
})