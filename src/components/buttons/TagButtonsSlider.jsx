import React, { useState } from "react";
import '../../index.css';

export function TagButtonsSlider() {
    const [active, setActive] = useState(false);
    const handleClick = () => {
      setActive(!active);
    };
    return (
        <div className="flex py-5 overflow-y-auto">
            <div className="mr-2">
                <a href="/financieel">
                <button onClick={handleClick} className={`tag-button | border-2 rounded px-4 text-xs font-semibold ${active ? "text-white bg-transparent" : "text-primary bg-white"}`}>Financieel</button>
                </a>
            </div>
            <div className="mr-2">
                <a href="/spullen">
                <button onClick={handleClick} className={`tag-button | border-2 rounded px-4 text-xs font-semibold ${active ? "text-white bg-transparent" : "text-primary bg-white"}`}>Spullen</button>
                </a>
            </div>
            <div className="mr-2">
                <a href="/eten">
                <button className="tag-button | border-2 rounded px-4 w-max text-xs text-white font-semibold">Eten & Drinken</button>
                </a>
            </div>
            <div>
                <a href="/acties">
                <button className="tag-button | border-2 rounded px-4 text-xs text-white font-semibold">Acties</button>
                </a>
            </div>
        </div>
    );
}