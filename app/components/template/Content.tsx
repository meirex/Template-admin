
interface ContentProps {
    children?: any
}
export default function Content(props: ContentProps) {
    return (
        <div className="
        dark:text-gray-200
        flex flex-col mt-7 
        ">
            {props.children}
        </div>
    );
}