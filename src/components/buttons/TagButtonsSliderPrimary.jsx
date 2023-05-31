import React, { useState } from "react";
import '../../index.css';

export function TagButtonsSliderPrimary() {

    const [active, setActive] = useState({"button1": false, "button2": false})

    const handleClick = (event) => {
        setActive({...active, [event.target.name]: !active[event.target.name]})
        console.log("test")
    }

    // const [active, setActive] = useState(false);
    // const handleClick = () => {
    //   setActive(!active);
    // }

    return (
        <div className="flex py-5 overflow-y-auto">
            <div className="mr-2">
                <a href="/financieel">
                <button onClick={handleClick} className={`tag-button | border-2 border-primary rounded px-4 text-xs font-semibold ${!active ? "text-white bg-primary" : "text-primary bg-transparent"}`}>Financieel</button>
                </a>
            </div>
            <div className="mr-2">
                <a href="/spullen">
                <button onClick={handleClick} className={`tag-button | border-2 border-primary rounded px-4 text-xs font-semibold ${!active ? "text-white bg-primary" : "text-primary bg-transparent"}`}>Spullen</button>
                </a>
            </div>
            <div className="mr-2">
                <a href="/eten">
                <button className="tag-button | border-2 border-primary rounded px-4 w-max text-xs text-primary font-semibold">Eten & Drinken</button>
                </a>
            </div>
            <div>
                <a href="/acties">
                <button className="tag-button | border-2 border-primary rounded px-4 text-xs text-primary font-semibold">Acties</button>
                </a>
            </div>
        </div>
    );
}