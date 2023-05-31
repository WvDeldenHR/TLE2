import React, { useState } from 'react';
import './../index.css';
// Components
import { Navbar } from "./../components/navs/Navbar.jsx";
import { NotificationButtonAlt } from '../components/buttons/NotificationButtonAlt';
import { SearchbarAlt } from '../components/forms/SearchbarAlt';
import { OverviewUser } from '../components/content/OverviewUser';
import { OverviewOther } from '../components/content/OverviewOther';

export function Overview() {
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

    // Context Options Toggle
    const contextOptions = [<OverviewUser />, <OverviewOther />];
    const [optionsIndex, setOptionsIndex] = useState(0);
    const optionsToggle = (index) => {
        setOptionsIndex(index);
    };

    return (
        <div className="bg-white ">
            <Navbar />

            <div className={`fixed top-0 left-0 right-0 m-1 px-6 mb-10 pt-5 rounded bg-white z-50 ${color ? "drop-shadow-lg" : ""}`}>
                <div className="flex items-center pb-5">
                    <div className="w-full">
                        <h2 className="text-lg text-dark font-bold">Ontdekken</h2>
                    </div>
                    { <NotificationButtonAlt /> }
                </div>
                <div className="flex">
                    <div className="w-full">
                        { <SearchbarAlt /> }
                    </div>
                </div>
                <div className="flex justify-center gap-4 my-6 px-3">
                    <button onClick={() => optionsToggle(0)} 
                            className={`border-2 border-primary rounded py-2 w-full text-sm font-semibold ${optionsIndex === 0 ? "text-white bg-primary drop-shadow" : " text-primary bg-white"}`}>Mijn Posts</button>
                    <button onClick={() => optionsToggle(1)} 
                            className={`border-2 border-primary rounded py-2 w-full text-sm font-semibold ${optionsIndex === 1 ? "text-white bg-primary drop-shadow" : " text-primary bg-white"}`}>Waarbij Ik Help</button>
                </div>
            </div>

            <div className="mt-60 px-6 pb-20">
                {contextOptions[optionsIndex]}
            </div>
        </div>
    )
}