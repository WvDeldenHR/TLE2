import React from "react";
import "../App.css";
import { NavLink } from "react-router-dom"
// Images
import { ReactComponent as IconHome } from '../assets/icons/icon_home_002_212427_32x32.svg'
import { ReactComponent as IconDiscover } from '../assets/icons/icon_discover_001_212427_32x32.svg'
import { ReactComponent as IconPlus } from '../assets/icons/icon_plus_001_FFFFFF_32x32.svg'
import { ReactComponent as IconList } from '../assets/icons/icon_list_001_212427_32x32.svg'
import { ReactComponent as IconUser } from '../assets/icons/icon_user_001_212427_32x32.svg'


export function Navbar() {
    return (
        <div className="navbar | fixed w-full bottom-0 bg-white z-40">
            <ul className="flex items-center justify-center px-3 pt-3 pb-4 w-full">
                <li className="mx-4">
                    <NavLink to="home">
                        <IconHome className="w-6 h-6"></IconHome>
                    </NavLink>
                </li>    
                <li className="mx-4">
                    <NavLink to="discover">    
                        <IconDiscover className="w-6 h-6"></IconDiscover>
                    </NavLink>
                </li>
                <li className="-mt-6 mx-2 rounded-full p-5 bg-primary">
                    <NavLink to="post">
                        <IconPlus className="w-6 h-6"></IconPlus>
                    </NavLink>
                </li>
                <li className="mx-4">
                    <NavLink to="overview">
                        <IconList className="w-6 h-6"></IconList>
                    </NavLink>
                </li>
                <li className="mx-4">
                    <NavLink to="settings">
                        <IconUser className="w-6 h-6"></IconUser>
                    </NavLink>     
                </li>                     
            </ul>
        </div>
    );
}