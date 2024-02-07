'use client'

import { CaretDown } from '@phosphor-icons/react'

type SelectorBoxProps = {
    selectId: string
    labelText: string
}

export function SelectorBox({labelText, selectId}: SelectorBoxProps){
    return (
        <>
            <label className="text-primary text-base sm:text-xl leading-normal" htmlFor={selectId}>{labelText}</label>
            <div className="relative border border-primary rounded overflow-clip font-light mb-3 text-sm sm:text-base last-of-type:mb-6">
                <select
                    id={selectId}
                    className="appearance-none w-full py-3 px-4 bg-white text-primary focus:outline-primary" 
                >
                    <option value="1" defaultChecked >Pública</option>
                    <option value="2">Privada</option>
                </select>
                <CaretDown className="absolute z-10 h-6 w-6 text-primary bottom-1/2 translate-y-1/2 right-4" />
            </div>
        </>
    )
}