import React from "react";
import "./css/App.css";
import home from './img/icons/icon_home_002_212427_32x32.svg'
import {ReactComponent as DiscoverSvg} from './img/icons/icon_discover_001_212427_32x32.svg'
import {ReactComponent as PlusSvg} from './img/icons/icon_plus_001_FFFFFF_32x32.svg'
import {ReactComponent as ListSvg} from './img/icons/icon_list_001_212427_32x32.svg'
import {ReactComponent as UserSvg} from './img/icons/icon_user_001_212427_32x32.svg'
//SVG's geimporteerd vanuit Heroicons.
import {NavLink} from "react-router-dom"
import {ReactComponent as HomeSvg} from './img/icons/icon_home_002_212427_32x32.svg'

export function Navbar() {
    return (
        <nav className="">
            <div className="flex">
                <router>
                    <ul className="flex content-center border-t-2 w-screen">
                        <li className="w-screen">
                            <div className="mt-1">
                                <NavLink to="App.js" activeClassName="active">
                                        <HomeSvg className="w-8 h-8" src={home} alt={"Home"}></HomeSvg>
                                </NavLink>
                            </div>
                        </li>    
                        <li className="w-screen">
                            <div className="mt-1 content-center">
                                <NavLink to="..." activeClassName="active">    
                                        <DiscoverSvg className="w-8 h-8" src={home} alt={"Home"}></DiscoverSvg>
                                </NavLink>
                            </div>
                        </li>
                        <li className="w-screen">
                            <div className="mt-1">
                                <NavLink to="..." activeClassName="active">
                                        <PlusSvg className="max-w-none h-8 w-8" src={home} alt={"Home"}></PlusSvg>
                                </NavLink>
                            </div>
                        </li>
                        <li className="w-screen">
                            <div className="mt-1">
                                <NavLink to="nonactive" activeClassName="active">
                                        <ListSvg className="w-8 h-8" src={home} alt={"Home"}></ListSvg>
                                </NavLink>
                            </div>
                        </li>
                        <li className="w-screen">
                            <div className="mt-1">
                                <NavLink to="alsonon" activeClassName="active">
                                        <UserSvg className="w-8 h-8" src={home} alt={"Home"}></UserSvg>
                                </NavLink>   
                            </div>        
                         </li>                     
                    </ul>
                </router>
            </div>
        </nav>
    );
}
