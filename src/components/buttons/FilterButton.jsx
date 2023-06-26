import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Component
import { SearchbarAlt } from '../forms/SearchbarAlt';
// Images
import IconArrow from './../../assets/icons/icon_arrow_001_212427_32x32.svg';
import IconCharity from './../..//assets/icons/icon_charity_001_FFFFFF_32x32.svg';
import IconConsumption from './../../assets/icons/icon_consumption_001_FFFFFF_32x32.svg';
import IconFinancial from './../../assets/icons/icon_financial_001_FFFFFF_32x32.svg';
import IconStuff from './../../assets/icons/icon_stuff_001_FFFFFF_32x32.svg';


export function FilterButton() {
    // Overlay Toggle Button
    const [overlay, setOverlay] = useState(false);
    const toggleOverlay = () => {
        setOverlay(!overlay);
    }; 

    const navigate = useNavigate();


const handleSubcategoryClick = (subcategory) => {
  navigate(`/subcategory/${subcategory}`);
};

    return (
        <>
            <button onClick={ toggleOverlay } className="rounded p-2 h-10 bg-white bg-opacity-25 drop-shadow">
                <svg className="fill-white" width="26" height="26" viewBox="0 0 32 32"><g>
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

            <div className={`transition-5 | fixed h-full top-0 left-0 bg-white overflow-x-hidden z-50 ${overlay ? 'w-full': 'w-0'}`}>
                <div className="p-6">
                    <div className="flex pb-8">
                        <button onClick={ toggleOverlay } className="mr-4 rounded p-3 w-10 h-10 bg-gray-200 drop-shadow">
                            <img className="w-4" src={ IconArrow } alt="Terug"></img>
                        </button>
                        <div className="w-full">
                            <SearchbarAlt />
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
                                    <a href="/financieel">
                                    <h3 className="text-dark font-semibold">Financieel</h3>
                                    </a>
                                </div>
                            </div>
                            <div className="px-4 pb-4">

                                <button className="flex items-center"
                                 onClick={() => handleSubcategoryClick('Onderwijs')}>
                                    <span className="mr-2 w-2 h-2 pb-8"></span>
                                    <span>Onderwijs</span>
                                </button>

                                <button className="flex items-center"
                                 onClick={() => handleSubcategoryClick('Medisch Hulp')}>
                                    <span className="mr-2 w-2 h-2 pb-8"></span>
                                    <span>Medisch Hulp</span>
                                </button>

                                <button className="flex items-center"
                                 onClick={() => handleSubcategoryClick('Ondersteuning')}>
                                    <span className="mr-2 w-2 h-2 pb-8"></span>
                                    <span>Ondersteuning</span>
                                </button>

                                <button className="flex items-center"
                                 onClick={() => handleSubcategoryClick('Moeilijke situaties')}>
                                    <span className="mr-2 w-2 h-2 pb-8"></span>
                                    <span>Moeilijke situaties</span>
                                </button>

                                <button className="flex items-center"
                                 onClick={() => handleSubcategoryClick('Zware dagen')}>
                                    <span className="mr-2 w-2 h-2 pb-8"></span>
                                    <span>Zware dagen</span>
                                </button>

                                <button className="flex items-center"
                                 onClick={() => handleSubcategoryClick('Huisvesting')}>
                                    <span className="mr-2 w-2 h-2 pb-8"></span>
                                    <span>Huisvesting</span>
                                </button>
                              
                            </div>
                        </div>

                        <div className="">
                            <div className="flex items-center">
                                <div className="mr-2 rounded p-2 bg-primary">
                                    <img className="w-4" src={ IconStuff } alt="Spullen"></img>
                                </div>
                                <div>
                                    <a href="/spullen">
                                    <h3 className="text-dark font-semibold">Spullen</h3>
                                    </a>
                                </div>
                            </div>

                            <div className="px-4 pb-4 mt-5">

                                <button className="flex items-center"
                                 onClick={() => handleSubcategoryClick('Kleding')}>
                                    <span className="mr-2 w-2 h-2 pb-8"></span>
                                    <span>Kleding</span>
                                </button>

                                <button className="flex items-center"
                                 onClick={() => handleSubcategoryClick('Elektronica')}>
                                    <span className="mr-2 w-2 h-2 pb-8"></span>
                                    <span>Elektronica</span>
                                </button>

                                <button className="flex items-center text-left"
                                 onClick={() => handleSubcategoryClick('Boeken & Media')}>
                                    <span className="mr-2 w-2 h-2 pb-10"></span>
                                    <span>Boeken & Media</span>
                                </button>

                                <button className="flex items-center text-left"
                                 onClick={() => handleSubcategoryClick('Meubels & Huishoudelijke artikelen')}>
                                    <span className="mr-2 w-2 h-2 pb-8 ps-1"></span>
                                    <span> Meubels & Huishoudelijke artikelen</span>
                                </button>

                                <button className="flex items-center text-left"
                                 onClick={() => handleSubcategoryClick('Kunst & Ambachten')}>
                                    <span className="mr-2 w-2 h-2 pb-8 pt-10"></span>
                                    <span> Kunst & Ambachten</span>
                                </button>

                                <button className="flex items-center text-left"
                                 onClick={() => handleSubcategoryClick('Speelgoed & Spellen')}>
                                    <span className="mr-2 w-2 h-2 pb-8"></span>
                                    <span> Speelgoed & Spellen</span>
                                </button>

                            </div>
                        </div>

                        <div className="">
                            <div className="flex items-center">
                                <div className="mr-2 rounded p-2 bg-primary">
                                    <img className="w-4" src={ IconConsumption } alt="Eten & Drinken"></img>
                                </div>
                                <div>
                                    <a href="/eten">
                                    <h3 className="text-dark font-semibold">Eten & Drinken</h3>
                                    </a>
                                </div>
                            </div>

                            <div className="px-4 pb-4 mt-5">

                                <button className="flex items-center"
                                 onClick={() => handleSubcategoryClick('Voedselreclycing')}>
                                    <span className="mr-2 w-2 h-2 pb-10"></span>
                                    <span>Voedselreclycing</span>
                                </button>

                                <button className="flex items-center"
                                 onClick={() => handleSubcategoryClick('Voedselbanken')}>
                                    <span className="mr-2 w-2 h-2 pb-10"></span>
                                    <span>Voedselbanken</span>
                                </button>

                                <button className="flex items-center"
                                 onClick={() => handleSubcategoryClick('Voedselpakketten')}>
                                    <span className="mr-2 w-2 h-2 pb-10"></span>
                                    <span>Voedselpakketten</span>
                                </button>

                                <button className="flex items-center text-left"
                                 onClick={() => handleSubcategoryClick('Ongeopende etenswaren')}>
                                    <span className="mr-2 w-2 h-2 pb-12"></span>
                                    <span>Ongeopende <br></br>etenswaren</span>
                                </button>

                                <button className="flex items-center"
                                 onClick={() => handleSubcategoryClick('Boodschappen')}>
                                    <span className="mr-2 w-2 h-2 pb-8 pt-2"></span>
                                    <span>Boodschappen</span>
                                </button>

                            </div>


                        </div>
                        <div className="">
                            <div className="flex items-center">
                                <div className="mr-2 rounded p-2 bg-primary">
                                    <img className="w-4" src={ IconCharity } alt="Acties"></img>
                                </div>
                                <div>
                                    <a href="/acties">
                                    <h3 className="text-dark font-semibold">Acties</h3>
                                    </a>
                                </div>
                            </div>

                            <div className="px-4 pb-4 mt-8">

                                <button className="flex items-center text-left"
                                 onClick={() => handleSubcategoryClick('Buurthuis-activiteiten')}>
                                    <span className="mr-2 w-2 h-2 pb-10"></span>
                                    <span>Buurthuis <br></br> activiteiten</span>
                                </button>

                                <button className="flex items-center"
                                 onClick={() => handleSubcategoryClick('Milieu')}>
                                    <span className="mr-2 w-2 h-2 pb-8"></span>
                                    <span>Milieu</span>
                                </button>

                                <button className="flex items-center"
                                 onClick={() => handleSubcategoryClick('Vrijwilligerswerk')}>
                                    <span className="mr-2 w-2 h-2 pb-10"></span>
                                    <span>Vrijwilligerswerk</span>
                                </button>

                                <button className="flex items-center"
                                 onClick={() => handleSubcategoryClick('Buurtmarkten')}>
                                    <span className="mr-2 w-2 h-2 pb-10"></span>
                                    <span>Buurtmarkten</span>
                                </button>

                                <button className="flex items-center text-left"
                                 onClick={() => handleSubcategoryClick('Buurt-collectieven')}>
                                    <span className="mr-2 w-2 h-2 pb-12"></span>
                                    <span>Buurt <br></br>collectieven</span>
                                </button>

                                <button className="flex items-center"
                                 onClick={() => handleSubcategoryClick('Evenementen')}>
                                    <span className="mr-2 w-2 h-2 pb-8 pt-2"></span>
                                    <span>Evenementen</span>
                                </button>

                                <button className="flex items-center"
                                 onClick={() => handleSubcategoryClick('Sport')}>
                                    <span className="mr-2 w-2 h-2 pb-8 pt-2"></span>
                                    <span>Sport</span>
                                </button>

                                <button className="flex items-center"
                                 onClick={() => handleSubcategoryClick('Dierenwelzijn')}>
                                    <span className="mr-2 w-2 h-2 pb-8"></span>
                                    <span>Dierenwelzijn</span>
                                </button>
                                

                                <button className="flex items-center"
                                 onClick={() => handleSubcategoryClick('Wijkhuis')}>
                                    <span className="mr-2 w-2 h-2 pb-8 pt-2"></span>
                                    <span>Wijkhuis</span>
                                </button>

                                <button className="flex items-center"
                                 onClick={() => handleSubcategoryClick('Ouderen')}>
                                    <span className="mr-2 w-2 h-2 pb-8"></span>
                                    <span>Ouderen</span>
                                </button>

                                <button className="flex items-center"
                                 onClick={() => handleSubcategoryClick('Jongeren')}>
                                    <span className="mr-2 w-2 h-2 pb-8"></span>
                                    <span>Jongeren</span>
                                </button>

                                <button className="flex items-center"
                                 onClick={() => handleSubcategoryClick('Kinderen')}>
                                    <span className="mr-2 w-2 h-2 pb-8"></span>
                                    <span>Kinderen</span>
                                </button>

                                <button className="flex items-center"
                                 onClick={() => handleSubcategoryClick('Studenten')}>
                                    <span className="mr-2 w-2 h-2 pb-8"></span>
                                    <span>Studenten</span>
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}