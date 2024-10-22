"use client"

interface AuthInputProps {
    label: string
    valor: any
    obrigatorio?: boolean
    tipo?: 'text' | "email" | "password"
    naoRenderQuando?: boolean
    valorMudou: (novoValor: any) => void
}

export default function AuthInput(props) {
    return props.naoRenderQuando ? null : (
        <div className="flex flex-col ">
            <label>{props.label}</label>
            <input
                type={props.tipo ?? 'text'}
                value={props.valor}
                onChange={e => props.valorMudou?.(e.target.value)}
                required={props.obrigatorio}
                className=" mb-4
                mt-1 block w-full 
                py-2 px-3 
                bg-gray-100
                border border-gray-300 
                rounded-md shadow-sm 
                focus:outline-none focus:ring-2 
              focus:ring-purple-500 focus:border-transparent 
              focus:bg-white
                transition duration-300 ease-in-out
                "
            />
        </div>
    );
}