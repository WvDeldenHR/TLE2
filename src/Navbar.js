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
            <div className="">
                <router>
                    <ul className="flex place-content-center space-x-10 inset-0 border-t-2 h-12 w-screen ">
                        <li className="">
                            <NavLink to="App.js" activeClassName="active">
                                <div className="mt-1.5">
                                    <HomeSvg className="w-10 h-10" src={home} alt={"Home"}></HomeSvg>
                                </div>
                            </NavLink>
                        </li>    
                        <li className="">
                            <NavLink to="..." activeClassName="active">
                                <div className="mt-1.5">
                                    <DiscoverSvg className="w-10 h-10" src={home} alt={"Home"}></DiscoverSvg>
                                </div>
                            </NavLink>
                        </li>
                        <li className="">
                            <NavLink to="..." activeClassName="active">
                                <div className="mt-1.5">
                                    <PlusSvg className="max-w-none h-10 w-10" src={home} alt={"Home"}></PlusSvg>
                                </div>
                            </NavLink>
                        </li>
                        <li className="">
                            <NavLink to="nonactive" activeClassName="active">
                                <div className="mt-1.5">
                                    <ListSvg className="w-10 h-10" src={home} alt={"Home"}></ListSvg>
                                </div>
                            </NavLink>
                        </li>
                        <li className="">
                            <NavLink to="alsonon" activeClassName="active">
                                <div className="mt-1.5">
                                    <UserSvg className="w-10 h-10" src={home} alt={"Home"}></UserSvg>
                                </div>
                            </NavLink>           
                         </li>                    
                    </ul>
                </router>
            </div>
        </nav>
    );
}
