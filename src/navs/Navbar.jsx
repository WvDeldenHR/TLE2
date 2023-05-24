import React from "react";
import "../App.css";
import home from '../assets/icons/icon_home_002_212427_32x32.svg'
import {ReactComponent as DiscoverSvg} from '../assets/icons/icon_discover_001_212427_32x32.svg'
import {ReactComponent as PlusSvg} from '../assets/icons/icon_plus_001_FFFFFF_32x32.svg'
import {ReactComponent as ListSvg} from '../assets/icons/icon_list_001_212427_32x32.svg'
import {ReactComponent as UserSvg} from '../assets/icons/icon_user_001_212427_32x32.svg'
//SVG's geimporteerd vanuit Heroicons.
import {NavLink} from "react-router-dom"
import {ReactComponent as HomeSvg} from '../assets/icons/icon_home_002_212427_32x32.svg'

export function Navbar() {
    return (
            <div className="navbar | fixed w-full bottom-0 bg-white z-40">
                    <ul className="flex items-center justify-center px-3 pt-2 pb-4 w-full">
                        <li className="mx-4">
                                <NavLink to="/home" activeClassName="active">
                                        <HomeSvg className="w-8 h-8" src={home} alt={"Home"}></HomeSvg>
                                </NavLink>
                        </li>    
                        <li className="mx-4"> 
                                <NavLink to="/discover" activeClassName="active">    
                                        <DiscoverSvg className="w-8 h-8" src={home} alt={"Home"}></DiscoverSvg>
                                </NavLink>
                        </li>
                        <li className="-mt-6 mx-2 rounded-full p-5 bg-primary">
                                <NavLink to="/post/create" activeClassName="active">
                                        <PlusSvg className="h-8 w-8" src={home} alt={"Home"}></PlusSvg>
                                </NavLink>
                        </li>
                        <li className="mx-4">
                                <NavLink to="/post/list" activeClassName="active">
                                        <ListSvg className="w-8 h-8" src={home} alt={"Home"}></ListSvg>
                                </NavLink>
                        </li>
                        <li className="mx-4">
                                <NavLink to="/profile" activeClassName="active">
                                        <UserSvg className="w-8 h-8" src={home} alt={"Home"}></UserSvg>
                                </NavLink>   
                         </li>                     
                    </ul>       
            </div>
    );
}