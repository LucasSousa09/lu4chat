type ChatBalloonProps = {
    sender: string
    message: string
    userMessage?: boolean
    evenMessage?: 'even' | 'odd' | undefined
}

export function ChatBalloon({sender, message, userMessage = false, evenMessage = undefined}: ChatBalloonProps){
    return (
        <div 
            className={
                "flex flex-col rounded-lg p-2 gap-1 min-w-80 max-w-[calc(50%-12px)] w-[calc(50%-12px)] " +
                `${evenMessage === 'even' ? 'bg-secondary ' : (evenMessage === 'odd' ? 'bg-white border border-secondary ' : 'bg-terciary ')}` +
                `${userMessage ? 'ml-auto' : 'mr-auto'}` 
            }>
            <strong 
                className={
                    "text-sm font-bold " +
                    `${evenMessage === 'even' ? 'text-white' : 'text-secondary'}` 
                }
            >
                {sender}
            </strong>

            <span 
                className={
                    `${evenMessage === 'even' ? 'text-white' : 'text-secondary'}` 
                }
            >
                {message}
            </span> 
        </div>
    )
}