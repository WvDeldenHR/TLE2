import React from "react";
import "./css/App.css";
import home from './img/icons/icon_home_002_212427_32x32.svg'
import discover from './img/icons/icon_discover_001_212427_32x32.svg'
import plus from './img/icons/icon_plus_001_FFFFFF_32x32.svg'
import overzicht from './img/icons/icon_list_001_212427_32x32.svg'
import profile from './img/icons/icon_user_001_212427_32x32.svg'
//SVG's geimporteerd vanuit Heroicons.


export function Navbar() {
    return (
        <div className="">
            <nav className="">
                <div className="">
                    <ul className="flex place-content-center space-x-15 inset-x-0 border-t-2 h-14 w-screen ">
                        <li className="">
                            <div className="mt-1.5">
                                <a href="..."><img className="h-8 w-screen mt-1" src={home} alt={"Home"}></img></a>
                            </div>
                        </li>
                        <li className="">
                            <div className="mt-1.5">
                                <a href="..."><img className="h-8 w-screen mt-1" src={discover} alt={"Ontdekken"}></img></a>
                            </div>
                        </li>
                        <li className="">
                            <div className="mt-1.5">
                                <a href="..."><img className="h-10 w-screen mt-0.5" src={plus} alt={"Ontdekken"}></img></a>
                            </div>
                        </li>
                        <li className="">
                            <div className="mt-1.5">
                                <a href="../."><img className="h-8 w-screen mt-1" src={overzicht} alt={"Overzicht"}></img></a>
                            </div>
                        </li>
                        <li className="">
                            <div className="mt-1.5">
                                <a href ="App.js"> <img className="h-8 w-screen mt-1" src={profile} alt={"Ontdekken"}></img></a>  
                            </div>            
                         </li>                    
                    </ul>
                </div>
            </nav>
        </div>
    );
}