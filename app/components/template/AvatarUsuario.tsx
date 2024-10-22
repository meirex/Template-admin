"use client"
import Link from "next/link";
import Image from "next/image";
import useAuth from "@/app/data/hook/useAuth";
import macacoTemplate from "../images/images.png"


interface AvatarUsuarioprops {
  className?: string
}

export default function AvatarUsuario(props: AvatarUsuarioprops) {
  const { usuario } = useAuth()

  return (
    <Link href="/perfil">
      <Image width={100} height={100} src={usuario?.imagemUrl ?? macacoTemplate} alt="avatar para template"
        className={`
          h-10 w-10 rounded-full cursor-pointer
          ${props.className} `} />
    </Link>
  );
}