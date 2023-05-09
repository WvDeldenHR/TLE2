import React, { useState } from 'react';
import './../css/index.css';
// Components
import { NotificationButtonAlt } from './../components/buttons/NotificationButtonAlt.js';
import { SearchbarAlt } from './../components/forms/SearchbarAlt.js';
import { FilterButtonAlt } from '../components/buttons/FilterButtonAlt';
import { TagButtonsSliderPrimary } from '../components/buttons/TagButtonsSliderPrimary';
import { PostCard } from '../components/PostCard.js';
import { PostCardSmall } from '../components/PostCardSmall.js';
// Images
import IconArrow from './../assets/icons/icon_arrow_001_212427_32x32.svg';
import IconCharity from './../assets/icons/icon_charity_001_FFFFFF_32x32.svg'
import IconConsumption from './../assets/icons/icon_consumption_001_FFFFFF_32x32.svg';
import IconFinancial from './../assets/icons/icon_financial_001_FFFFFF_32x32.svg';
import IconStuff from './../assets/icons/icon_stuff_001_FFFFFF_32x32.svg';

export function Discover() {

    // Scroll
    const [color, setColor] = useState(false)
    const changeColor = () => {
        if (window.scrollY >= 15) {
            setColor(true)
        } else {
            setColor(false)
        }
    }
    window.addEventListener('scroll', changeColor)

    const [active, setActive] = useState(false);
    const handleClick = () => {
      setActive(!active);
    };

    return (
        <div>
            <div className={`fixed top-0 left-0 right-0 m-1 px-6 py-4 rounded bg-white z-50 ${color ? "drop-shadow-lg" : ""}`}>
                <div className="flex items-center pb-5">
                    <div className="w-full">
                        <h2 className="text-lg text-dark font-bold">Ontdekken</h2>
                    </div>
                    <div className="-mr-1">
                        { <NotificationButtonAlt /> }
                    </div>
                </div>
                <div className="flex">
                    <div className="w-full">
                        { <SearchbarAlt /> }
                    </div>
                    <div className="">
                        { <FilterButtonAlt /> }
                    </div>
                </div>
                <div className="-mr-5">
                    { <TagButtonsSliderPrimary /> }
                </div>
            </div>

            <div className="fixed p-6 inset-0 bg-white z-50">
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
                            <button className="flex items-center" onClick={handleClick}>
                                <span className={`block mr-2 rounded-full w-2 h-2 ${color ? "bg-primary" : "bg-transparent"}`}></span>
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

            <div className="mt-56 px-6">
                <div className="mb-6">
                    <div className="">
                        <h2 className="text-lg text-dark font-bold">Aanbevolen Voor Jou</h2>
                    </div>
                    <div className="flex -mt-1 -mr-6 pt-5 overflow-y-auto">
                        { <PostCardSmall /> }
                        { <PostCardSmall /> }
                        { <PostCardSmall /> }
                        { <PostCardSmall /> }
                        { <PostCardSmall /> }
                    </div>
                </div>

                <div className="">
                    <div className="">
                        <h2 className="text-lg text-dark font-bold">In Jou Buurt</h2>
                    </div>
                    <div className="flex -mt-1 -mr-6 pt-5 overflow-y-auto">
                        { <PostCard /> }
                        { <PostCard /> }
                        { <PostCard /> }
                        { <PostCard /> }
                        { <PostCard /> }
                    </div>
                </div>

                <div className="">
                    <div className="">
                        <h2 className="text-lg text-dark font-bold">Acties</h2>
                    </div>
                    <div className="flex -mt-1 -mr-6 pt-5 overflow-y-auto">
                        { <PostCard /> }
                        { <PostCard /> }
                        { <PostCard /> }
                        { <PostCard /> }
                        { <PostCard /> }
                    </div>
                </div>
            </div>
        </div>
    );
}