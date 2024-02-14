'use client'

import { ReactNode, forwardRef } from "react"

type ButtonProps = {
    children: ReactNode
    disabled?: boolean 
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({children, disabled, ...rest}, ref) => {
    return (
        <button
            {...rest}
            disabled={disabled}
            ref={ref} 
            className={
                "flex items-center justify-center gap-3 font-medium text-white bg-primary w-full rounded text-base sm:text-xl leafing-normal p-3 " +
                "hover:opacity-75 transition-opacity duration-150 " +
                "disabled:bg-slate-600 disabled:cursor-not-allowed"
            }
        >
            {children}
        </button>
    )
})