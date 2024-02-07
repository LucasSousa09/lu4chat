import { Button } from '../../components/Button'
import { InputBox } from '../../components/InputBox'
import { GoogleLogo } from '@phosphor-icons/react/dist/ssr'

export default function LoginPage(){
    return (
        <div className="flex items-center justify-center w-full max-w-desktop h-[calc(100vh-100px)] mx-auto px-4">
            <div className="sm:mt-[-50px] flex flex-col items-center p-6 sm:py-12 sm:px-16 border-2 border-primary w-full max-w-[520px] rounded">
                
                <strong className="text-primary font-medium text-xl sm:text-[28px] whitespace-nowrap mb-6">
                    Faça o seu login ao Lu4chat    
                </strong>
                
                <form className="flex flex-col w-full" action="">
                    <InputBox labelText='Email' inputId='email' inputPlaceholder='lu4chat@gmail.com' />

                    <InputBox labelText='Senha' inputId='password' inputPlaceholder='••••••' inputType='password' />

                    <Button>
                        Entrar
                    </Button>
                </form>
                
                <span className="bg-primary h-[2px] w-full my-6"/>
                
                <Button>
                    <GoogleLogo className="h-7 w-7" weight="bold"/>
                    Continue com o Google
                </Button>
            </div>
        </div>
    )
}