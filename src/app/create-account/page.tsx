import { TitleText } from "@/components/TitleText";
import { Button } from "../../components/Button";
import { InputBox } from "../../components/InputBox";
import { GoogleLogo } from "@phosphor-icons/react/dist/ssr";

export default function CreateAccountPage(){
    return (
        <div className="bg-white flex items-center justify-center w-full max-w-desktop h-[calc(100vh-100px)] mx-auto px-4">
            <div className="sm:mt-[-50px] flex flex-col items-center p-6 sm:py-12 sm:px-16 border-2 border-primary w-full max-w-[520px] rounded">
                
                <TitleText text="Crie uma conta no Lu4chat" />
                
                <form className="flex flex-col w-full" action="">
                    <InputBox labelText='Email' inputId='email' inputPlaceholder='lu4chat@gmail.com' />

                    <InputBox labelText='Senha' inputId='password' inputPlaceholder='••••••' inputType='password' />

                    <InputBox labelText='Repita sua senha' inputId='password-confirmation' inputPlaceholder='••••••' inputType='password' />

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