import React, { useState } from 'react';
import '../../index.css';
// Component
import { SearchbarAlt } from '../../forms/SearchbarAlt.js';

// Images
import IconArrow from './../../assets/icons/icon_arrow_001_212427_32x32.svg';
import IconCharity from './../..//assets/icons/icon_charity_001_FFFFFF_32x32.svg'
import IconConsumption from './../../assets/icons/icon_consumption_001_FFFFFF_32x32.svg';
import IconFinancial from './../../assets/icons/icon_financial_001_FFFFFF_32x32.svg';
import IconStuff from './../../assets/icons/icon_stuff_001_FFFFFF_32x32.svg';


export function FilterButtonAlt() {
    // Overlay Toggle Button
    const [overlay, setOverlay] = useState(false);
    const toggleOverlay = () => {
        setOverlay(!overlay);
    }; 

    return (
        <div>
            <button className="rounded p-2 h-10 bg-gray-200 drop-shadow" onClick={ toggleOverlay }>
                <svg className="fill-dark" width="26" height="26" viewBox="0 0 32 32"><g>
                    <path d="M20.7,8.1c-2.4,0-4.8,0-7.2,0c-0.2,0-0.3,0.1-0.4,0.3c-0.7,1.5-1.9,2.4-3.6,2.4c-1.7,0-2.9-0.9-3.6-2.4
                        C5.7,8.1,5.6,8,5.4,8.1c-0.4,0-0.9,0-1.3,0c-0.8,0-1.3-0.6-1.3-1.3C2.7,6,3.3,5.4,4,5.4c0.4,0,0.9,0,1.3,0c0.2,0,0.3,0,0.4-0.2
                        c0.7-1.6,1.9-2.4,3.6-2.4c1.7,0,3,0.9,3.7,2.4c0.1,0.2,0.2,0.2,0.4,0.2c4.8,0,9.5,0,14.3,0c0.2,0,0.3,0,0.5,0
                        c0.7,0.1,1.2,0.7,1.1,1.4c0,0.7-0.6,1.2-1.3,1.2c-1.1,0-2.2,0-3.2,0C23.5,8.1,22.1,8.1,20.7,8.1z M9.4,8.1c0.7,0,1.3-0.6,1.3-1.3
                        c0-0.7-0.6-1.3-1.3-1.3C8.7,5.4,8.1,6,8.1,6.7C8.1,7.5,8.7,8.1,9.4,8.1z"/>
                    <path d="M20.7,26.7c-2.4,0-4.8,0-7.2,0c-0.2,0-0.3,0.1-0.4,0.3c-0.7,1.5-1.9,2.4-3.6,2.4c-1.7,0-2.9-0.9-3.6-2.4
                        c-0.1-0.2-0.2-0.3-0.4-0.2c-0.4,0-0.8,0-1.2,0c-0.8,0-1.4-0.6-1.4-1.4c0-0.8,0.6-1.3,1.4-1.3c0.4,0,0.8,0,1.2,0
                        c0.2,0,0.3,0,0.4-0.2c0.7-1.6,1.9-2.4,3.6-2.4c1.7,0,2.9,0.9,3.7,2.4c0.1,0.2,0.2,0.2,0.4,0.2c4.8,0,9.6,0,14.4,0
                        c0.2,0,0.4,0,0.6,0.1c0.6,0.2,1,0.7,1,1.4c0,0.6-0.5,1.1-1.1,1.2c-0.2,0-0.3,0-0.5,0C25.4,26.7,23.1,26.7,20.7,26.7z M8.1,25.4
                        c0,0.7,0.6,1.3,1.3,1.3c0.7,0,1.3-0.6,1.3-1.3c0-0.7-0.6-1.3-1.3-1.3C8.7,24.1,8.1,24.7,8.1,25.4z"/>
                    <path d="M24.1,17.4c-1.3,0-2.7,0-4,0c-0.2,0-0.3,0.1-0.4,0.3c-0.7,1.5-1.9,2.4-3.7,2.4c-1.7,0-2.9-0.9-3.6-2.4 c-0.1-0.2-0.2-0.3-0.4-0.3c-2.6,0-5.1,0-7.7,0c-0.2,0-0.4,0-0.6-0.1c-0.7-0.2-1-0.8-0.9-1.5c0.1-0.6,0.6-1.1,1.3-1.1
                        c2.3,0,4.5,0,6.8,0c0.4,0,0.8,0,1.2,0c0.1,0,0.2-0.1,0.3-0.2c0.7-1.6,2-2.5,3.7-2.5c1.7,0,2.9,0.9,3.7,2.5c0.1,0.2,0.2,0.2,0.4,0.2
                        c2.6,0,5.2,0,7.7,0c0.2,0,0.4,0,0.6,0.1c0.6,0.2,1,0.8,1,1.5c-0.1,0.6-0.6,1.1-1.3,1.1C26.8,17.4,25.4,17.4,24.1,17.4
                        C24.1,17.4,24.1,17.4,24.1,17.4z M17.4,16.1c0-0.7-0.6-1.3-1.3-1.3c-0.7,0-1.3,0.6-1.3,1.3c0,0.7,0.6,1.3,1.3,1.3
                        C16.8,17.4,17.4,16.8,17.4,16.1z"/>
                </g></svg>
            </button>

            <div className={`filter-overlay | fixed top-0 left-0 h-full bg-white overflow-x-hidden z-50 ${overlay ? 'w-full': 'w-0'}`}>
                <div className="p-6">
                    <div className="flex pb-8">
                        <div>
                            <button className="mr-4 rounded p-3 w-10 h-10 bg-gray-200 drop-shadow" onClick={ toggleOverlay }>
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
            </div>
        </div>
    );
}