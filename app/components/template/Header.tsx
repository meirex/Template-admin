import AvatarUsuario from "./AvatarUsuario";
import Title from "./Title";


interface HeaderProps {
    titulo: string
    subtitulo: string
    children?: any
}
export default function Header(props: HeaderProps) {
    return (
        <div className="flex">
            <Title titulo={props.titulo} subtitulo={props.subtitulo} />
            <div className="flex flex-grow justify-end items-center">
                <AvatarUsuario className="ml-3" />
            </div>
        </div>
    );
}