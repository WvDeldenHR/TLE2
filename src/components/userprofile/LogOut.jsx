import React from 'react';
import {  signOut } from "firebase/auth";
import { auth } from '../../config/firebase';
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import logoutimg from '../../assets/img/logoutimg2.png'

export const LogOut = (props) => {

    const navigate = useNavigate();
 
    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
    }

        return (
            <div className="flex m-auto min-h-full w-full flex-1 flex-col justify-center items-center absolute inset-2 lg:px-8 sm:w-full sm:h-full ">      

                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-28 w-auto"
                        src={logoutimg}
                        alt="Logo"
                    />
                    <h1 className="mt-6 text-center text-xl font-bold leading-9 tracking-tight text-green-700">Uitloggen</h1>
                    <h2 className="mt-0 text-center text-xs leading-9 tracking-tight text-gray-500">
                        Weet u zeker dat u wilt uitloggen?
                    </h2>

                    <button
                            type="submit" 
                            onClick={handleLogout} 
                            className="flex w-80 justify-center m-auto mt-20 shadow rounded bg-gray-100 px-5 py-3 text-xs font-semibold leading-6 text-red-800 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
                        >  
                            Ja, log uit                               
                        </button>
                                                                     
                   
                        <p className="flex mt-10 justify-center text-xs text-gray-500">
                            <NavLink to="/home/settings" className="font-semibold leading-6 text-grey-900 hover:text-green-700">
                                Nee, Ga terug
                            </NavLink>
                        </p>        
                </div>
                 


                </div>
          );
}

