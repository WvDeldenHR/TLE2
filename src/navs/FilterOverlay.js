import './../../css/index.css';

import { SearchbarAlt } from './../../components/forms/SearchbarAlt.js';
// Images
import IconArrow from './../../assets/icons/icon_arrow_001_212427_32x32.svg';
import IconCharity from './../..//assets/icons/icon_charity_001_FFFFFF_32x32.svg'
import IconConsumption from './../../assets/icons/icon_consumption_001_FFFFFF_32x32.svg';
import IconFinancial from './../../assets/icons/icon_financial_001_FFFFFF_32x32.svg';
import IconStuff from './../../assets/icons/icon_stuff_001_FFFFFF_32x32.svg';

export function FilterOverlay() {
    return (
        <div className="fixed p-6 inset-0 bg-white z-50" onSelect={selected=> {console.log(selected)}}>
            <div className="flex pb-8">
                <div>
                    <button className="mr-4 rounded p-3 w-10 h-10 bg-gray-200 drop-shadow">
                        <img className="w-100" src={ IconArrow } alt="Terug"></img>
                    </button>
                </div>
                <div className="w-full">
                    { <SearchbarAlt /> }
                </div>
            </div>
            <div className="pb-4">
                <h2 className="text-dark text-xl font-bold">Filter</h2>
            </div>
            <div className="grid grid-cols-2">
                <div className="">
                    <div className="flex items-center pb-4">
                        <div className="mr-2 rounded p-2 bg-primary">
                            <img className="w-4" src={ IconFinancial } alt="Financieel"></img>
                        </div>
                        <div>
                            <h3 className="text-dark font-semibold">Financieel</h3>
                        </div>
                    </div>
                    <div className="px-4 pb-4">
                        <button className="flex items-center">
                            <span className="block mr-2 rounded-full w-2 h-2 bg-primary"></span>
                            <span className="text-primary font-semibold">Onderwijs</span>
                        </button>
                        <div className="flex items-center"><span className="block mr-2 rounded-full w-2 h-2"></span><span>Milieu</span></div>
                    </div>
                </div>
                <div className="">
                    <div className="flex items-center">
                        <div className="mr-2 rounded p-2 bg-primary">
                            <img className="w-4" src={ IconStuff } alt="Spullen"></img>
                        </div>
                        <div>
                            <h3 className="text-dark font-semibold">Spullen</h3>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="flex items-center">
                        <div className="mr-2 rounded p-2 bg-primary">
                            <img className="w-4" src={ IconConsumption } alt="Eten & Drinken"></img>
                        </div>
                        <div>
                            <h3 className="text-dark font-semibold">Eten & Drinken</h3>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="flex items-center">
                        <div className="mr-2 rounded p-2 bg-primary">
                            <img className="w-4" src={ IconCharity } alt="Acties"></img>
                        </div>
                        <div>
                            <h3 className="text-dark font-semibold">Acties</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}