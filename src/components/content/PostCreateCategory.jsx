import React, { useState } from 'react';
// Components
import { PostCreateCategoryCharity } from "./PostCreateCategoryCharity";
import { PostCreateCategoryConsumption } from "./PostCreateCategoryConsumption";
import { PostCreateCategoryFinancial } from "./PostCreateCategoryFinancial";
import { PostCreateCategoryStuff } from "./PostCreateCategoryStuff";

export function PostCreateCategory() {

        // Context Options Toggle
        const contextOptions = [<PostCreateCategoryCharity />, <PostCreateCategoryConsumption />, <PostCreateCategoryFinancial />, <PostCreateCategoryStuff />];
        const [optionsIndex, setOptionsIndex] = useState(0);
        const optionsToggle = (index) => {
            setOptionsIndex(index);
        };

    return (
        <>
            <div className="pt-10">
                <h2 className="text-base text-dark font-bold">Hoofdcategorie</h2>
                <div className="grid grid-cols-2 gap-3 my-4 px-6">
                    <button onClick={() => optionsToggle(0)} 
                            className={`border-2 rounded-lg py-2 w-32 text-xs ${optionsIndex === 0 ? "border-primary text-white font-semibold bg-primary drop-shadow" : "border-gray-400 text-gray-400 font-medium bg-white"}`}>Acties</button>
                    <button onClick={() => optionsToggle(1)}
                            className={`border-2 rounded-lg py-2 w-32 text-xs ${optionsIndex === 1 ? "border-primary text-white font-semibold bg-primary drop-shadow" : "border-gray-400 text-gray-400 font-medium bg-white"}`}>Eten & Drinken</button>
                    <button onClick={() => optionsToggle(2)}
                            className={`border-2 rounded-lg py-2 w-32 text-xs ${optionsIndex === 2 ? "border-primary text-white font-semibold bg-primary drop-shadow" : "border-gray-400 text-gray-400 font-medium bg-white"}`}>Financieel</button>
                    <button onClick={() => optionsToggle(3)}
                            className={`border-2 rounded-lg py-2 w-32 text-xs ${optionsIndex === 3 ? "border-primary text-white font-semibold bg-primary drop-shadow" : "border-gray-400 text-gray-400 font-medium bg-white"}`}>Spullen</button>
                </div>
            </div>
            
            <div className="py-4 h-80">
                <h2 className="text-base text-dark font-bold">Subcategorie</h2>
                <div className="grid grid-cols-2 gap-3 my-4 px-6">
                    {contextOptions[optionsIndex]}
                </div>
            </div>
        </>
    )
}