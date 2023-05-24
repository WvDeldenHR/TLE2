import React, { useState } from 'react';
import { auth } from '../../config/firebase';
import { NavLink } from 'react-router-dom';
import { updatePassword } from "firebase/auth";

export const UpdatePassword = () => { 

    const currentUser = auth.currentUser
    const [newPassword, setNewPassword] = useState("");

    const [updateStatusPasswordTrue, setUpdateStatusPasswordTrue] = useState('');
    const [updateStatusPasswordFalse, setUpdateStatusPasswordFalse] = useState('');


    const handleUpdatePassword = () => {
        updatePassword(currentUser, newPassword)
          .then(() => {
            console.log("Password updated successfully");
            setUpdateStatusPasswordTrue('     ');

            setTimeout(() => {
                setUpdateStatusPasswordTrue('');
              }, 5000);

            // Perform any additional actions after password update
          })
          .catch((error) => {
            console.error("Error updating password:", error);
            setUpdateStatusPasswordFalse('     ');
            // Handle the error appropriately
            setTimeout(() => {
                setUpdateStatusPasswordFalse('');
              }, 5000);
          });
      };

      const handleSubmitPassword = (e) => {
        e.preventDefault();
        handleUpdatePassword();
      };

        return (

            <div className="flex min-h-full w-full flex-1 flex-col justify-center items-center  lg:px-8 sm:w-full sm:h-full ">
    
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm w-full bg-green-800 pt-8 pb-12 border border-gray-200">
                        {/* <img
                            className="mx-auto h-6 w-auto"
                            src={logo}
                            alt="Logo"
                        /> */}
                        <h1 className="mt-6 text-center text-xl font-bold leading-9 tracking-tight text-white">Profiel beheer</h1>
                        <h2 className="mt-2 text-center text-xs tracking-tight text-white">
                            Werk uw wachtwoord bij <br></br> 
                        </h2>
                    </div>

                <form onSubmit={handleSubmitPassword} 
                className="mt-10 mb-10 sm:mx-auto sm:w-full sm:max-w-sm">
                
                <label className="block text-xs font-medium leading-6 text-gray-900">
                <i class="fa-regular fa-envelope"></i>
                {'\u00A0'} {'\u00A0'}
                    Nieuw wachtwoord
                </label>

                <div className="flex items-center mt-3">
                <input 
                    type="password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    placeholder="Minimaal 6 tekens" 
                    className="block w-full text-xs mt-2 rounded-md border py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"                        
                    />

                    {updateStatusPasswordTrue && (
                    <div className="flex items-center ml-2 text-green-800">
                      <i class="fa-regular fa-circle-check fa-bounce"></i>
                      <p className="text-green-500">{updateStatusPasswordTrue}</p>
                    </div>
                  )}

                  {updateStatusPasswordFalse && (
                    <div className="flex items-center ml-2 text-green-800">
                      <i class="fa-regular fa-circle-xmark fa-bounce"></i>
                      <p className="text-red-500">{updateStatusPasswordFalse}</p>
                    </div>
                  )}

                </div>

                <button 
                    type="submit"
                    className="flex w-80 justify-center m-auto mt-5 rounded-full bg-gray-200 px-3 py-2 text-xs font-semibold leading-6 text-black shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"                      
                    >
                        Verander uw wachtwoord
                </button>

            </form>

            <p className="text-center text-xs text-gray-500">
                            <NavLink to="/home/settings" className="font-semibold leading-6 text-green-800 hover:text-green-700">
                                Ga terug
                            </NavLink>
                        </p>    

                        </div>
    )
}