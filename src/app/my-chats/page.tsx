import { PaperPlaneRight } from '@phosphor-icons/react/dist/ssr'

import { RoomSidebarProvider } from '../../context/RoomSidebarContext'

import { TitleText } from '@/components/TitleText'
import { ChatBalloon } from '@/components/ChatBalloon'
import { RoomInfoBox } from '@/components/RoomInfoBox'
import { RoomSidebar } from '@/components/RoomSidebar'

export default function MyChats(){
    return (
        <div className="relative bg-white max-w-desktop mx-auto flex h-[calc(100vh-52px)] sm:h-[calc(100vh-80px)] md:h-[calc(100vh-100px)]">
            <RoomSidebarProvider>

                <RoomSidebar>
                    <RoomInfoBox enterRoom={false} currentRoom roomType='Pública' roomName='Honkai Star Rail' roomDescription='Para todos os fãs de Star Rail' />
                    <RoomInfoBox enterRoom={false} roomType='Privada' roomName='Grupo da Família' roomDescription='Grupo especial da família' />
                </RoomSidebar>

                <main className="flex flex-col-reverse h-full w-full">
                    <form className="flex items-center gap-4 w-full max-w-[100vw] p-4 border-t border-primary" action="">
                        <input 
                            className="h-[44px] sm:h-[52px] w-full border-2 border-primary text-secondary rounded py-3 px-4" 
                            type="text" 
                            />
                        <button 
                            className="flex items-center gap-2 rounded bg-secondary text-white font-bold text-sm sm:text-xl px-4 py-3"
                            >
                            Enviar
                            <PaperPlaneRight className="" weight='fill' />
                        </button>
                    </form>
                    
                    <div className="flex-1 p-6">
                        <TitleText returnButton text='Honkai Star Rail' />
                        <div className="flex flex-col mt-6 gap-2">
                            <ChatBalloon evenMessage='odd' sender='Nickolas' message='Penacony finalmente chegou!!!!' />
                            <ChatBalloon userMessage sender='Lucas' message='Verdade, espero pegar a Black Suan... Já foram 30 draws e nada ainda...' />
                            <ChatBalloon evenMessage='even' sender='Caio' message='Nunca mais nem loguei, kkkk' />
                        </div>
                    </div>
                </main>
            </RoomSidebarProvider>
        </div>
    )
}