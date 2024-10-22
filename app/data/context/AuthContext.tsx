"use client"

import { createContext, useState, ReactNode, useEffect } from "react"
import firebase from "../../firebase/config"
import Usuario from "../../model/Usuario"
import { useRouter } from 'next/navigation'
import Cookies from "js-cookie"

interface AuthContextProps {
    usuario: Usuario | null
    carregando?: boolean
    loginGoogle: () => Promise<void>
    login?: (email: string, senha: string) => Promise<void>
    cadastrar?: (email: string, senha: string) => Promise<void>
    logout?: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({
    usuario: null,
    loginGoogle: async () => { }
})

async function usuarioNormalizado(usuarioFirebase: firebase.User): Promise<Usuario> {
    const token = await usuarioFirebase.getIdToken()
    return {
        uid: usuarioFirebase.uid,
        nome: usuarioFirebase.displayName,
        email: usuarioFirebase.email,
        token,
        provedor: usuarioFirebase.providerData[0]?.providerId,
        imagemUrl: usuarioFirebase.photoURL
    }
}
function gerenciarCookie(logado: boolean) {
    if (logado) {
        Cookies.set("admin-meirex-auth", logado, {
            expires: 7

        })
    } else {
        Cookies.remove('admin-meirex-auth')
    }
}

interface AuthProviderProps {
    children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {

    const router = useRouter()
    const [usuario, setUsuario] = useState<Usuario | null>(null)
    const [carregando, setCarregando] = useState(true)



    async function configurarSessao(usuarioFirebase) {

        if (usuarioFirebase?.email) {
            const usuario = await usuarioNormalizado(usuarioFirebase)
            setUsuario(usuario)
            gerenciarCookie(true)
            setCarregando(false)
            return usuario.email
        } else {
            setUsuario(null)
            gerenciarCookie(false)
            setCarregando(false)
            return false
        }
    }

    async function loginGoogle() {
        try {
            setCarregando(true)
            const resp = await firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider()
            )

            if (resp.user?.email) {
                await configurarSessao(resp.user)
                router.push('/')
            }
        } finally {
            setCarregando(false)
        }
    }


    async function login(email, senha) {
        try {
            setCarregando(true)
            const resp = await firebase.auth()
                .signInWithEmailAndPassword(email, senha)

            if (resp.user?.email) {
                await configurarSessao(resp.user)
                router.push('/')
            }
        } finally {
            setCarregando(false)
        }
    }

    async function cadastrar(email, senha) {
        try {
            setCarregando(true)
            const resp = await firebase.auth()
                .createUserWithEmailAndPassword(email, senha)

            if (resp.user?.email) {
                await configurarSessao(resp.user)
                router.push('/')
            }
        } finally {
            setCarregando(false)
        }
    }

    async function logout() {
        try {
            setCarregando(true)
            await firebase.auth().signOut()
            await configurarSessao(null)
        } finally {
            setCarregando(false)
        }
    }

    useEffect(() => {
        if (Cookies.get('admin-meirex-auth')) {
            const cancelar = firebase.auth().onIdTokenChanged(configurarSessao)
            return () => cancelar()
        } else {
            setCarregando(false)
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            usuario,
            carregando,
            loginGoogle,
            login,
            cadastrar,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
