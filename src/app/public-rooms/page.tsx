import { RoomInfoBox } from "@/components/RoomInfoBox";
import { TitleText } from "@/components/TitleText";

export default function PublicRooms(){
    return (
        <div className="bg-white flex flex-col items-center w-full max-w-desktop h-[calc(100vh-100px)] pt-12 mx-auto">

            <TitleText text="Salas Públicas" />

            <div className="flex flex-col w-11/12 sm:w-full max-w-[540px]">
                <RoomInfoBox roomDescription="Para todos os fãs de Star Rail" roomName="Honkai Star Rail - BR" roomType="Pública"/>
                <RoomInfoBox roomDescription="Para todos os fãs de Wutering Waves" roomName="Wutering Waves - BR" roomType="Pública"/>
            </div>
        </div>
    )
}