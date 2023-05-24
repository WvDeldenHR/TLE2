import '../index.css';
// Images
import iconLocation from './../assets/icons/icon_location_001_212427_32x32.svg';
import iconFinancial from './../assets/icons/icon_financial_001_FFFFFF_32x32.svg';

export function PostCardSmall() {
    return (
        <div className="content-box | relative mr-4 rounded-lg h-48">
            <div className="absolute rounded p-2.5 -top-4 right-4 bg-primary drop-shadow z-10">
                <img className="w-5" src={iconFinancial} alt="Financieel"></img>
            </div>
            <div className="flex flex-col w-38 h-full drop-shadow">
                <div className="flex items-end h-full">
                    <div className="flex overflow-y-auto pl-3 py-3">
                        <div className="mr-2"><button className="rounded px-2 py-1 bg-primary w-max text-white text-xxs font-semibold">Financieel</button></div>
                        <div><button className="rounded px-2 py-1 bg-primary w-max text-white text-xxs font-semibold">Buurthuis-activiteiten</button></div>
                    </div>
                </div>
                <div className="flex flex-col rounded-b-lg px-3 py-1 bg-white">
                    <h3 className="text-dark text-sm font-bold truncate">Post Titel</h3>
                    <div className="flex items-center">
                        <img className="w-2 mr-1" src={iconLocation} alt="Location"></img>
                        <span className="text-dark text-xxs truncate">Locatie</span>
                    </div>
                </div>
            </div>
        </div>
    );
}