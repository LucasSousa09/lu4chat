'use client'

import { forwardRef } from 'react'

interface InputBoxProps extends React.ComponentPropsWithoutRef<"input"> {
    inputType?: 'text' | 'password'
    inputId: string
    inputPlaceholder: string
    labelText: string
    textColor?: 'primary' | 'white'
}

export const InputBox = forwardRef<HTMLInputElement, InputBoxProps>(({labelText, inputId, inputType = 'text', inputPlaceholder, textColor = 'primary', ...rest}, ref) => {
    return (
        <>
            <label 
                htmlFor={inputId}
                className={
                    "text-base sm:text-xl leading-normal " + 
                    `${textColor === 'primary' ? 'text-primary' : 'text-white' }`
                }
            >
                {labelText}
            </label>
            <input
                id={inputId} 
                type={inputType} 
                placeholder={inputPlaceholder}
                ref={ref}
                {...rest}
                className="border border-primary rounded py-3 px-4 font-light mb-3 text-sm sm:text-base text-secondary last-of-type:mb-6 focus:outline-primary" 
            />
        </>
    )
})