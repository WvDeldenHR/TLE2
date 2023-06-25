export function TagButtonsSliderPrimary() {
    return (
        <div className="flex py-5 overflow-y-auto">
            <div className="mr-2">
                <a href="/financieel">
                <   button className="tag-button | border-2 border-primary rounded px-4 text-xs text-primary font-semibold">Financieel</button>
                </a>
            </div>
            <div className="mr-2">
                <a href="/spullen">
                    <button className="tag-button | border-2 border-primary rounded px-4 text-xs text-primary font-semibold">Spullen</button>
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