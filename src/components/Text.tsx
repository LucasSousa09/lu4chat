import { ReactNode } from "react"

type TextProps = {
    display?: 'block' | 'inline'
    color?: 'white' | 'blue'
    children: ReactNode
}


export function Text({display = 'inline', color = 'blue', children }: TextProps) {
    return (
        <span className={
                `${display} ` +
                `${color === 'white' ? 'text-[#D9EFFF] text-shadow-heavy' : 'text-primary'} ` +
                "text-3xl leading-normal font-bold pr-3 " +
                "sm:text-5xl sm:leading-normal pr-5 " +
                "xl:text-6xl xl:leading-normal"
        }>
            {children}
        </span>
    )
}