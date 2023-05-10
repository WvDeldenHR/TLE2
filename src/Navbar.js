import React from "react";
import "./css/App.css";
import home from './img/icons/icon_home_002_212427_32x32.svg'
import discover from './img/icons/icon_discover_001_212427_32x32.svg'
import plus from './img/icons/icon_plus_001_FFFFFF_32x32.svg'
import overzicht from './img/icons/icon_list_001_212427_32x32.svg'
import profile from './img/icons/icon_user_001_212427_32x32.svg'
//SVG's geimporteerd vanuit Heroicons.
import {NavLink} from "react-router-dom"

export function Navbar() {
    return (
            <nav className="">
                <div className="">
                <router>
                    <ul className="flex place-content-center space-x-15 inset-x-0 border-t-2 h-14 w-screen ">
                        <li className="">
                        <NavLink to="App.js" activeClassName="active">
                                <div className="mt-1.5">
                                        <img className="h-8 w-screen mt-1" src={home} alt={"Ontdekken"}></img>
                                </div>
                            </NavLink>
                        </li>
                        <li className="">
                        <NavLink to="App.js" activeClassName="active">
                                <div className="mt-1.5">
                                        <img className="h-8 w-screen mt-1" src={discover} alt={"Ontdekken"}></img>
                                </div>
                            </NavLink>
                        </li>
                        <li className="">
                        <NavLink to="App.js" activeClassName="active">
                                <div className="mt-1.5">
                                        <img className="h-8 w-screen mt-1" src={plus} alt={"Ontdekken"}></img>
                                </div>
                            </NavLink>
                        </li>
                        <li className="">
                        <NavLink to="App.js" activeClassName="active">
                                <div id="ontdekken" className="mt-1.5">
                                    <p>Wat te doen</p>
                                        <img className="h-8 w-screen mt-1" src={overzicht} alt={"Ontdekken"}></img>
                                </div>
                            </NavLink>
                        </li>
                        <li className="">
                        <NavLink to="..." activeClassName="active">
                                <div className="mt-1.5">
                                        <img className="h-8 w-screen mt-1" src={profile} alt={"Ontdekken"}></img>
                                </div>
                            </NavLink>           
                         </li>                    
                    </ul>
                    </router>
                </div>
            </nav>
    );
}
