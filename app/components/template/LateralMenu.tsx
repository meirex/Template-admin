
"use client"
import { IconeCasa, IconeConfig, IconeLogout, IconeNotificacoes } from "../icons";
import Logo from "./Logo";
import MenuItem from "./MenuItem";
import Link from "next/link";
import useAuth from "@/app/data/hook/useAuth";

export default function LateralMenu() {

    const { logout } = useAuth()
    return (
        <aside className="flex 
        flex-col
        bg-gray-200 text-gray-700
        dark:bg-gray-900 dark:text-gray-200
       
       ">
            <div className="flex 
            flex-col items-cemter 
            justify-center
            bg-gradient-to-r
          to-gray-550 from-slate-600
            ">
                <Logo />
            </div>
            <ul className="flex-grow">
                <MenuItem url="/" texto="Inicio" icone={IconeCasa} />
                <MenuItem url="/ajustes" texto="Ajustes" icone={IconeConfig} />
                <MenuItem url="/notificacoes" texto="Notificações" icone={IconeNotificacoes} />
            </ul>
            <ul className="text-red-600">
                <Link href='/autenticacao'>
                    <MenuItem
                        texto="Sair" icone={IconeLogout}
                        onClick={logout}

                    />
                </Link>
            </ul>
        </aside>

    );
}