"use client"

import { createContext, useState, ReactNode, useEffect } from "react"
import { auth } from "../../firebase/config"
import Usuario from "../../model/Usuario"
import { useRouter } from 'next/navigation'
import Cookies from "js-cookie"
import { User, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'

interface AuthContextProps {
    usuario: Usuario | null
    carregando: boolean
    loginGoogle: () => Promise<void>
    login: (email: string, senha: string) => Promise<void>
    cadastrar: (email: string, senha: string) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({
    usuario: null,
    carregando: true,
    loginGoogle: async () => { },
    login: async () => { },
    cadastrar: async () => { },
    logout: async () => { }
})

async function usuarioNormalizado(usuarioFirebase: User): Promise<Usuario> {
    const token = await usuarioFirebase.getIdToken()
    return {
        uid: usuarioFirebase.uid,
        nome: usuarioFirebase.displayName ?? '',
        email: usuarioFirebase.email ?? '',
        token,
        provedor: usuarioFirebase.providerData[0]?.providerId ?? '',
        imagemUrl: usuarioFirebase.photoURL ?? ''
    }
}

function gerenciarCookie(logado: boolean) {
    if (logado) {
        Cookies.set("admin-meirex-auth", String(logado), {
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

    async function configurarSessao(usuarioFirebase: User | null) {
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
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)

            if (result.user?.email) {
                await configurarSessao(result.user)
                router.push('/')
            }
        } finally {
            setCarregando(false)
        }
    }

    async function login(email: string, senha: string) {
        try {
            setCarregando(true)
            const result = await signInWithEmailAndPassword(auth, email, senha)

            if (result.user?.email) {
                await configurarSessao(result.user)
                router.push('/')
            }
        } finally {
            setCarregando(false)
        }
    }

    async function cadastrar(email: string, senha: string) {
        try {
            setCarregando(true)
            const result = await createUserWithEmailAndPassword(auth, email, senha)

            if (result.user?.email) {
                await configurarSessao(result.user)
                router.push('/')
            }
        } finally {
            setCarregando(false)
        }
    }

    async function logout() {
        try {
            setCarregando(true)
            await signOut(auth)
            await configurarSessao(null)
        } finally {
            setCarregando(false)
        }
    }

    useEffect(() => {
        if (Cookies.get('admin-meirex-auth')) {
            const unsubscribe = auth.onIdTokenChanged(configurarSessao)
            return () => unsubscribe()
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