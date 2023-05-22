import React, { useState } from 'react';
import './../css/index.css';
// Components
import { CreatePostContext } from '../components/content/CreatePostContext';
import { CreatePostCategorie } from '../components/content/CreatePostCategorie';
// Images
import IconArrow from './../assets/icons/icon_arrow_002_FFFFFF_32x32.svg';






export function CreatePost() {
    const switchOptions = [<CreatePostContext />, <CreatePostCategorie />];
    const [active, setActive] = useState(switchOptions[0]);


    function ProgressButton() {
        return (
            <>
                <button onClick={() => setActive(switchOptions[1])} className="flex items-center rounded-xl px-6 py-2 bg-primary text-white font-semibold drop-shadow">Volgende
                    <img className="ml-4 w-4 h-4" src={IconArrow} alt=""></img></button>
                <button onClick={() => setActive(switchOptions[0])} className="flex items-center border-2 border-primary rounded-xl px-6 py-2 bg-white text-primary font-semibold">
                <img className="ml-4 w-4 h-4" src={IconArrow} alt=""></img>Vorige
                   </button>
            </>
        )
        // if (setActive(switchOptions[0])) {
        // return (
        //     <button onClick={() => setActive(switchOptions[1])} className="flex items-center rounded-xl px-6 py-2 bg-primary text-white font-semibold">Volgende
        //         <img className="ml-4 w-4 h-4" src={IconArrow} alt=""></img></button>
        // )}
        // )} else if (setActive(switchOptions[1])) {
        // return (
        //     <button onClick={() => setActive(switchOptions[0])} className="flex items-center rounded-xl px-6 py-2 bg-primary text-white font-semibold">Volgende
        //         <img className="ml-4 w-4 h-4" src={IconArrow} alt=""></img></button>
        // )}
    }

    return (
        <>
            <div className="bg-primary">
                <div className="flex items-center justify-center py-6">
                    <span className="lines | block -mr-2 w-8 bg-white"></span>
                    <div className="flex flex-col items-center">
                        <span className="pb-3 text-xxs text-white">Stap 1</span>
                        <span className="block border-white border-2 rounded-full w-5 h-5 bg-primary z-10"></span>
                        </div>
                    <span className="lines | block -mx-2 w-12 bg-gray-300"></span>
                    <div className="flex flex-col items-center">
                        <span className="pb-3 text-xxs text-gray-300">Stap 2</span>
                        <span className="block border-gray-300 border-2 rounded-full w-5 h-5 bg-primary z-10"></span>
                    </div>
                    <span className="lines | block -mx-2 w-12 bg-gray-300"></span>
                    <div className="flex flex-col items-center">
                        <span className="pb-3 text-xxs text-gray-300">Stap 3</span>
                        <span className="block border-gray-300 border-2 rounded-full w-5 h-5 bg-primary z-10"></span>
                    </div>
                    <span className="lines | block -ml-2 w-8 bg-gray-300"></span>
                </div>
                <div className="flex flex-col items-center px-16 pb-6">
                    <h1 className="text-xl text-white font-semibold pb-1">Context</h1>
                    <p className="text-center text-xxs text-white">Lorum Ipsum bullshit tekst geen idee wat hier moet staan</p>
                </div>
            </div>

            <div>
                {active}
            </div>

            <div className="flex justify-center">
                <ProgressButton />
            </div>
        </>
    )
}