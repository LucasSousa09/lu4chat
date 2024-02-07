type TitleTextProps = {
    text: string
}

export function TitleText({text}: TitleTextProps){
    return (
        <strong className="text-primary font-medium text-xl sm:text-[28px] whitespace-nowrap mb-6">
            {text}
        </strong> 
    )
}