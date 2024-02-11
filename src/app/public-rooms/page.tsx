'use client'

import { RoomInfoBox } from "@/components/RoomInfoBox";
import { TitleText } from "@/components/TitleText";

import { get, onValue, ref } from 'firebase/database'
import { useEffect, useRef, useState } from 'react'
import { database } from '../../libs/firebase'

type FirebaseRooms = [
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
    const [rooms, setRooms] = useState<RoomProps[]>([])

    useEffect(() => {
        const RoomsRef = ref(database)
        onValue(RoomsRef, (snapshot) => {
            const data = snapshot.val()
            const firebaseRooms = data.rooms ?? {}

            const test : FirebaseRooms[] = Object.entries(firebaseRooms)

            const test2: RoomProps[] = test.map(values => values[1])

            setRooms(test2)
        })
    }, [])

    return (
        <div className="bg-white flex flex-col items-center w-full max-w-desktop h-[calc(100vh-100px)] pt-12 mx-auto">

            <TitleText text="Salas Públicas" />

            <div className="flex flex-col w-11/12 sm:w-full max-w-[540px]">
                {
                    rooms.map(room => (
                        <RoomInfoBox roomDescription={room.description} roomName={room.name} roomType={room.permission} key={room.id} />
                    ))
                }
            </div>
        </div>
    )
}