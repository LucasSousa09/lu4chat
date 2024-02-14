import Link from "next/link"

type RoomInfoBoxProps = {
    roomId: string

    roomName?: string
    roomType?: 'public' | 'private'
    roomDescription?: string

    enterRoom?: boolean
}

export function RoomInfoBox({ roomId, roomName, roomDescription, roomType }: RoomInfoBoxProps){
        return(
            <div 
                className={
                    "w-full rounded mb-3 border border-primary " 
                }
            >
                <header 
                    className={
                        "flex items-center justify-between p-2 border-b border-primary text-primary "
                    }
                >
                    <strong >{roomName}</strong>
                    <span className="font-medium text-sm">{roomDescription}</span>
                </header>
                <div className="flex items-center justify-between px-2 py-3">
                    <span className="text-terciary text-sm">{roomType === "private" ? "Privada" : "Pública"}</span>
                    <Link
                        href={`/my-chats/${roomId}`} 
                        className={
                            "p-[6px] rounded font-medium text-sm bg-primary text-white "
                        }
                    >
                        Entrar
                    </Link>
                </div>
            </div>
        )
}