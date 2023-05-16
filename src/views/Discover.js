import React, { useState } from 'react';
import './../css/index.css';
// Components
import { NotificationButtonAlt } from './../components/buttons/NotificationButtonAlt.js';
import { SearchbarAlt } from './../components/forms/SearchbarAlt.js';
import { TagButtonsSliderPrimary } from '../components/buttons/TagButtonsSliderPrimary';
import { PostCard } from '../components/PostCard.js';
import { PostCardSmall } from '../components/PostCardSmall.js';
import { FilterButtonAlt } from '../components/buttons/FilterButtonAlt';

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

    return (
        <div>
            <div className={`fixed top-0 left-0 right-0 m-1 px-6 py-4 rounded bg-white z-50 ${color ? "drop-shadow-lg" : ""}`}>
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
                    { <FilterButtonAlt />}
                </div>
                <div className="-mr-5">
                    { <TagButtonsSliderPrimary /> }
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