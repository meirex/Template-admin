import LoadingComponent from "./components/LoadingComponent";


export default function Loading() {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100vw ",
                height: "100vh",
            }}
        >
            <LoadingComponent />
        </div>
    );
}