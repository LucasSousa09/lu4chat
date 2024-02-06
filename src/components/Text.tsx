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
                "text-6xl font-bold pr-5"
        }>
            {children}
        </span>
    )
}