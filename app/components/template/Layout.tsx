"use client"
import Header from "./Header";
import LateralMenu from "./LateralMenu";
import Content from "./Content";
import ForcarAuth from "../auth/ForcarAuth";


interface LayoutProps {
    titulo: string;
    subtitulo: string;
    children?: React.ReactNode; // Usar React.ReactNode para permitir qualquer tipo de filho
}

export default function Layout(props: LayoutProps) {
    return (
        <ForcarAuth>
            <div className="flex h-screen w-screen dark:bg-gray-900 bg-gray-100">
                <LateralMenu />
                <div className="flex flex-col w-full p-7 bg-gray-300 dark:bg-gray-800">
                    <Header titulo={props.titulo} subtitulo={props.subtitulo} />
                    <Content>
                        {props.children}
                    </Content>
                </div>
            </div>
        </ForcarAuth>

    );
}

