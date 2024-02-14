'use client'

import { useForm, SubmitHandler } from 'react-hook-form'

import { TitleText } from "@/components/TitleText";
import { Button } from "../../components/Button";
import { InputBox } from "../../components/InputBox";
import { GoogleLogo } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

type CredetialInputs = {
    email: string,
    password: string,
    'repeat-password': string 
}

export default function CreateAccountPage(){
    const { register, handleSubmit, reset } = useForm<CredetialInputs>()

    const router = useRouter()


    const onSubmit: SubmitHandler<CredetialInputs> = async (data) => {
        try {
            if(data.password !== data['repeat-password']){
                throw new Error('As senhas inseridas são diferentes')
            }


            reset()
        }
        catch(err) {
            console.error(err)
        }
    }

    async function handleSignInWithGoogle(){
        try {


            router.push('/my-chats')
        }
        catch(err) {
            console.error(err)
        }
    }

    return (
        <div className="bg-white flex items-center justify-center w-full max-w-desktop h-[calc(100vh-100px)] mx-auto px-4">
            <div className="sm:mt-[-50px] flex flex-col items-center p-6 sm:py-12 sm:px-16 border-2 border-primary w-full max-w-[520px] rounded">
                
                <TitleText text="Crie uma conta no Lu4chat" />
                
                <form
                    onSubmit={handleSubmit(onSubmit)} 
                    className="flex flex-col w-full"
                >
                    <InputBox {...register("email")} labelText='Email' inputId='email' inputPlaceholder='lu4chat@gmail.com' />

                    <InputBox {...register("password")} labelText='Senha' inputId='password' inputPlaceholder='••••••' inputType='password' />

                    <InputBox {...register("repeat-password")} labelText='Repita sua senha' inputId='password-confirmation' inputPlaceholder='••••••' inputType='password' />

                    <Button>
                        Entrar
                    </Button>
                </form>
                
                <span className="bg-primary h-[2px] w-full my-6"/>
                
                <button 
                    onClick={() => signIn('google', {callbackUrl: '/public-rooms'})}
                    className={ 
                        "flex items-center justify-center gap-3 font-medium text-white bg-primary w-full rounded text-base sm:text-xl leafing-normal p-3 " +
                        "hover:opacity-75 transition-opacity duration-150 "
                    }
                >
                    <GoogleLogo className="h-7 w-7" weight="bold"/>
                    Continue com o Google
                </button>
            </div>
        </div>
    )
}