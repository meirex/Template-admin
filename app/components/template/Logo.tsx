export default function Logo() {
    return (
        <div className="relative w-20 h-20 bg">
            <div className="absolute bottom-0 left-1 w-1 h-12 bg-green-500 rounded"></div>
            <div className="absolute bottom-0 left-4 w-1 h-16  bg-green-500 rounded"></div>
            <div className="absolute bottom-0 left-7 w-1 h-8 bg-red-500 rounded"></div>
            <div className="absolute bottom-0 left-10 w-1 h-10  bg-green-500 rounded"></div>
        </div>
    )
}