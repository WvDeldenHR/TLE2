import React, { useState } from 'react';
import './../../index.css';
// Images
import iconNotification from './../../assets/icons/icon_mail_001_212427_32x32.svg';
import IconArrow from './../../assets/icons/icon_arrow_001_212427_32x32.svg';


export function NotificationButton() {
    // Overlay Toggle Button
    const [overlay, setOverlay] = useState(false);
    const toggleOverlay = () => {
        setOverlay(!overlay);
    }; 

    return (
        <div className="flex justify-end">
            <span className="absolute flex items-center justify-center -mt-1 ml-7 rounded-full w-6 h-6 bg-error text-xxxs text-white font-semibold z-10">1</span>
            <button className="flex items-center justify-center rounded-full w-12 h-12 bg-white drop-shadow" onClick={ toggleOverlay }>
                <img className="w-6" src={iconNotification} alt="Notifications"></img>
            </button>

            <div className={`filter-overlay | fixed top-0 left-0 w-full bg-white overflow-y-hidden z-50 ${overlay ? 'h-full': 'h-0'}`}>
                <div className="p-6">
                    <div className="flex pb-8">
                        <div>
                            <button className="mr-4 rounded p-3 w-10 h-10 bg-gray-200 drop-shadow" onClick={ toggleOverlay }>
                                <img className="w-100" src={ IconArrow } alt="Terug"></img>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}