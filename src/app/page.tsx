import Image from "next/image";

import heroImg from '../assets/hero-image.jpg'
import { Text } from "../components/Text";

export default function Home() {
  return (
    <main className="flex items-center justify-center gap-12 max-w-desktop h-[calc(100vh-100px)] mx-auto">
      <Image src={heroImg} alt="4 amigos conversando e rindo entre si" />

      <div>
        <div>
          <Text>Lu4chat</Text>
          <Text display="block" color="white">O novo aplicativo</Text>
          <Text display="block">de conversas</Text>
          <Text color="white">on-line</Text>
          <Text>para você</Text>
        </div>

        <button className={
            "mt-12 font-bold text-5xl leading-normal bg-primary text-white w-full rounded-lg py-3 px-5 " +
            "transition-opacity  hover:opacity-75"  
          }
        >
          Se conecte ao futuro
        </button>
      </div>
    </main>
  );
}
