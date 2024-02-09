import Image from "next/image";

import heroImg from '../assets/hero-image.jpg'
import { Text } from "../components/Text";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-white flex items-center justify-center gap-12 max-w-desktop h-[calc(100vh-100px)] mx-auto px-3">
      <Image className="hidden lg:block lg:h-[450px] lg:w-[450px] xl:h-[600px] xl:w-[600px]" src={heroImg} alt="4 amigos conversando e rindo entre si" />

      <div className="flex flex-col items-center">
        <div className="pl-1">
          <Text>Lu4chat</Text>
          <Text display="block" color="white">O novo aplicativo</Text>
          <Text display="block">de conversas</Text>
          <Text color="white">on-line</Text>
          <Text>para você</Text>
        </div>

        <Link href="/create-account" className={
            "flex justify-center mt-6 font-bold text-2xl leading-normal bg-primary text-white w-full rounded-lg py-2 px-3 " +
            "sm:mt-12 sm:text-4xl sm:leading-normal sm:py-3 sm:px-5 " +
            "lg:text-4xl lg:leading-normal " +
            "xl:text-5xl xl:leading-normal " +
            "transition-opacity  hover:opacity-75"  
          }
        >
          Se conecte ao futuro
        </Link>
      </div>
    </main>
  );
}
