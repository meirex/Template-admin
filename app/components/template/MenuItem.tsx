"use client"

import Link from "next/link";

interface MenuItemProps {
    url?: string
    texto: string
    icone: any
    onClick?: (evento: any) => void

}

export default function MenuItem(Props: MenuItemProps) {

    function renderizarConteudo() {
        return (
            <div className="flex flex-col items-center justify-center h-20 w-20 ">
                {Props.icone}
                <span className="text-xs font-light text">
                    {Props.texto}
                </span>
            </div>
        );
    }

    return (
        <li
            onClick={Props.onClick}
            className="hover:bg-gray-200 
            dark:hover:bg-gray-800
            cursor-pointer"
        >
            {Props.url ? (
                <Link href={Props.url}>
                    {renderizarConteudo()}
                </Link>
            ) : (
                renderizarConteudo()
            )}
        </li>
    );
}
