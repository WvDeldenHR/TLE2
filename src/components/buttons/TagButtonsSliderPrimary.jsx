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
                <button onClick={handleClick} className={`tag-button | border-2 border-primary rounded px-4 text-xs font-semibold ${!active ? "text-white bg-primary" : "text-primary bg-transparent"}`}>Financieel</button>
            </div>
            <div className="mr-2">
                <button onClick={handleClick} className={`tag-button | border-2 border-primary rounded px-4 text-xs font-semibold ${!active ? "text-white bg-primary" : "text-primary bg-transparent"}`}>Spullen</button>
            </div>
            <div className="mr-2">
                <button className="tag-button | border-2 border-primary rounded px-4 w-max text-xs text-primary font-semibold">Eten & Drinken</button>
            </div>
            <div>
                <button className="tag-button | border-2 border-primary rounded px-4 text-xs text-primary font-semibold">Acties</button>
            </div>
        </div>
    );
}