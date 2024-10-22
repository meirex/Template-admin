"use client"

import AuthInput from "../components/auth/AuthInput";
import { useState } from "react";
import { IconeAtencao, IconeGoogle } from "../components/icons"
import Image from "next/image";
import imagemlogin from "../components/images/Capturar.png";
import useAuth from "../data/hook/useAuth";


export default function Autenticacao() {
    const { login, cadastrar, loginGoogle } = useAuth()

    const [modo, setModo] = useState<'login' | 'cadastro'>('login')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState(null)

    function exibirErro(msg, tempo = 5) {
        setErro(msg)
        setTimeout(() => setErro(null), tempo * 1000)
    }

    async function submeter() {
        try {
            if (modo === 'login') {
                await login?.(email, senha)
            } else {
                if (cadastrar) {
                    await cadastrar(email, senha)
                } else {
                    throw new Error("Função de cadastro não disponível")
                }
            }
        } catch (e) {
            if (e instanceof Error) {
                exibirErro(e.message)
            } else {
                exibirErro('Erro inesperado')
            }
        }
    }

    return (


        <div className="h-screen flex items-center justify-center ">

            <div className="m-8 w-full md:w-1/2 lg:w-1/3">
                <h4 className=" text-2xl font-bold"
                >{modo === 'login' ? 'Olá,' : 'ㅤ'}</h4>

                <h1 className=" text-5xl font-extrabold text-purple-600 mb-5"
                >{modo === 'login' ? 'Bem Vindo!' : 'Cadastre-se!'}</h1>


                {erro ? (
                    <div className="
                 bg-red-500 flex items-center space-x-2 text-white py-3 px-5 my-2 rounded-lg">
                        {IconeAtencao}
                        <span>{erro}</span>
                    </div>
                ) : false}

                <AuthInput
                    label="Email"
                    tipo=""
                    valor={email}
                    valorMudou={setEmail}
                    obrigatorio
                />
                <AuthInput
                    label="Senha"
                    tipo="password"
                    valor={senha}
                    valorMudou={setSenha}
                    obrigatorio
                />
                <button
                    onClick={submeter}
                    className=
                    "w-full flex items-center space-x-2 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 hover:border-white hover:ring-2 hover:ring-offset-2 hover:ring-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-3 focus:ring-purple-600 transition duration-500 ease-in-out"
                >
                    {modo === 'login' ? 'Entrar' : 'Cadastrar'}
                </button>

                <hr className="my-6 border-gray-300 w-full" />

                <button
                    onClick={loginGoogle}
                    className="w-full flex items-center space-x-2 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 hover:border-white hover:ring-2 hover:ring-offset-2 hover:ring-red-600 focus:outline-none focus:ring-2 focus:ring-offset-3 focus:ring-red-600 transition duration-500 ease-in-out"
                >
                    <IconeGoogle />
                    <span>Entre com o Google</span>
                </button>


                <hr className="my-6 border-gray-300 w-full" />


                {modo === 'login' ? (
                    <p className="mt-8">
                        Novo por aqui?
                        <a onClick={() => setModo('cadastro')} className=
                            "text-blue-500 hover:text-blue-700 font-semibold cursor-pointer"> Crie uma conta gratuitamente
                        </a>
                    </p>
                ) : (
                    <p className="mt-8">
                        Tem uma conta?
                        <a onClick={() => setModo('login')} className=
                            "text-blue-500 hover:text-blue-700 font-semibold cursor-pointer">   Acesse com suas credenciais

                        </a>
                    </p>

                )}



            </div>
            <div className="hidden md:block md:w-1/2 lg:w-2/3 ">
                <Image src={imagemlogin}
                    alt="imagem pro login"
                    width={1000}
                    className="h-screen w-full object-cover"

                />
            </div>
        </div>




    );
}