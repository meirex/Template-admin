"use client"
import Head from "next/head";
import useAuth from "@/app/data/hook/useAuth";
import { useRouter } from 'next/navigation'
import Loading from "@/app/loading";


export default function ForcarAuth(props) {
    const { usuario, carregando } = useAuth()
    const router = useRouter()


    function renderizarConteudo() {
        return (
            <>
                <Head>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                            if(!document.cookie?.includes("admin-meirex-auth") {
                             window.location.href = "/autenticacao"
                            }
                        `
                        }} />
                </Head>
                {props.children}
            </>
        )
    }

    function renderizarCarregando() {
        return (
            <div className="
            flex justify-center items-center h-screen">
                <Loading />
            </div>
        )
    }
    if (!carregando && usuario?.email) {
        return renderizarConteudo()
    } else if (carregando) {
        return renderizarCarregando()
    } else {
        router.push('/autenticacao')
        return null
    }
}