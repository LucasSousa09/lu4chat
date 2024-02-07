type RoomInfoBoxProps = {
    roomName: string
    roomType: 'Pública' | 'Privada'
    roomDescription: string
}

export function RoomInfoBox({ roomName, roomType, roomDescription }: RoomInfoBoxProps){
    return (
        <div className="w-full border border-primary rounded mb-3">
            <header className="flex items-center justify-between p-2 border-b border-primary">
                <strong className="text-primary">{roomName}</strong>
                <span className="text-primary">{roomType}</span>
            </header>
            <div className="flex items-center justify-between px-2 py-3">
                <span className="text-terciary text-sm">{roomDescription}</span>
                <button className="bg-primary text-white p-[6px] rounded">Entrar</button>
            </div>
        </div>
    )
}