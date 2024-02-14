'use client'

import { RoomInfoBox } from "@/components/RoomInfoBox";
import { TitleText } from "@/components/TitleText";

import { onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import { database } from '../../libs/firebase'

export type FirebaseRooms = [
    string, 
    {
        id: string,
        name: string,
        permission: 'public' | 'private',
        description: string,
    }
]

type RoomProps = {
    id: string,
    name: string,
    permission: 'public' | 'private',
    description: string,
}



export default function PublicRooms(){
    const [loading, setLoading] = useState(true)
    const [rooms, setRooms] = useState<RoomProps[]>([])

    useEffect(() => {
        setLoading(true)
        const RoomsRef = ref(database)
        onValue(RoomsRef, (snapshot) => {
            const data = snapshot.val()
            const firebaseRooms = data.rooms ?? {}

            const roomsEntries: FirebaseRooms[] = Object.entries(firebaseRooms)

            // const roomsArray: RoomProps[] = roomsEntries.map(values => values[1])

            const roomsArray: RoomProps[] = roomsEntries.map(values => values[1]).filter(room => room.permission === "public")

            setRooms(roomsArray)
            setLoading(false)
        })
    }, [])

    return (
        <>
            {
                loading ? (
                    <div className="flex items-start justify-center bg-white max-w-desktop h-[calc(100vh-100px)] mx-auto pt-12">
                        <strong className=" bg-secondary py-6 px-8 rounded text-white text-4xl animate-pulse">
                            Loading...
                        </strong>
                    </div>
                ) : (
                    <div className="bg-white flex flex-col items-center w-full max-w-desktop h-[calc(100vh-100px)] pt-12 mx-auto">

                        <TitleText text="Salas Públicas" />

                        <div className="flex flex-col w-11/12 sm:w-full max-w-[540px]">
                            {
                                rooms.map(room => {
                                    return (
                                        <RoomInfoBox key={room.id} roomId={room.id} roomName={room.name} roomDescription={room.description} roomType={room.permission}/>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            }
        </>
    )
}