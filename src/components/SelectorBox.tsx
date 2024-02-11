'use client'

import { forwardRef } from 'react'
import { CaretDown } from '@phosphor-icons/react'

interface SelectorBoxProps extends React.ComponentPropsWithoutRef<"select"> {
    selectId: string
    labelText: string
}

export const SelectorBox = forwardRef<HTMLSelectElement, SelectorBoxProps>(({labelText, selectId, ...rest}, ref) =>{
    return (
        <>
            <label className="text-primary text-base sm:text-xl leading-normal" htmlFor={selectId}>{labelText}</label>
            <div className="relative border border-primary rounded overflow-clip font-light mb-3 text-sm sm:text-base last-of-type:mb-6">
                <select
                    id={selectId}
                    className="appearance-none w-full py-3 px-4 bg-white text-primary focus:outline-primary"
                    ref={ref}
                    {...rest}
                >
                    <option value="private" defaultChecked >Pública</option>
                    <option value="public">Privada</option>
                </select>
                <CaretDown className="absolute z-10 h-6 w-6 text-primary bottom-1/2 translate-y-1/2 right-4" />
            </div>
        </>
    )
})