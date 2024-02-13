import { database } from "@/libs/firebase";
import { get, ref } from "firebase/database";

import Link from "next/link";

type Props = {
    roomId: string,
    currentRoom: boolean
}

type RoomDataProps = {
    id: string,
    name: string,
    description: string,
    permission: 'public' | 'private'
} | null

export async function RoomInfoBoxMyChat({roomId, currentRoom}: Props) {
    const snapshot = await get(ref(database, "/rooms/" + roomId))

    const roomData: RoomDataProps = snapshot.val()

    return (
        <>
        {
            roomData !== null && (
                <div 
                    className={
                        "w-full rounded mb-3 " +
                        `${currentRoom ? 'border-none bg-secondary' : 'border border-primary'}` 
                    }
                    >
                    <header 
                        className={
                            "flex items-center justify-between p-2 border-b " +
                            `${currentRoom ? 'border-white text-white' : 'border-primary text-primary'}`
                        }
                        >
                        <strong >{roomData.name}</strong>
                        <span className="font-medium text-sm">{roomData.permission === 'public' ? "Pública" : "Privada"}</span>
                    </header>
                    <div className="flex items-center justify-between px-2 py-3">
                        <span className="text-terciary text-sm">{roomData.description}</span>
                        <Link
                            href={`/my-chats/${roomData.id}`} 
                            className={
                                "p-[6px] rounded font-medium text-sm " +
                                `${currentRoom ? 'bg-white text-secondary' : 'bg-primary text-white'}`
                            }
                            >
                            Entrar
                        </Link>
                    </div>
                </div>
            )
        }
        </>
    )
}