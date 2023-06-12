// Images
import iconCharium from "./../../assets/icons/icon_charity_001_FFFFFF_32x32.svg"

export function LoadingScreen() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-primary">
            <img className="mb-4 w-10" src={iconCharium} alt=""></img>
            <h1 className="text-white font-semibold">Loading ...</h1>
        </div>
    )
}