import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from "../config/firebase"
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../images/logo.png'
import { BackButton } from "./buttons/BackButton";

const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'Gebruiker niet gevonden.';
      case 'auth/wrong-password':
        return 'Onjuist wachtwoord.';
      case 'auth/invalid-email':
        return 'Ongeldig e-mailadres.';
      // Add more error codes and their corresponding messages as needed
      default:
        return 'Er is een fout opgetreden. Probeer het later opnieuw.';
    }
  };
 
export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
       
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/home")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = getErrorMessage(errorCode);
            setError(errorMessage);
        });
       
    }
 
    return(
        <>
            <main className='h-full'>        
                <section>

                    <div className="flex my-auto min-h-full w-full flex-1 flex-col justify-center items-center absolute inset-0 lg:px-8 sm:w-full sm:h-full ">   

                    <BackButton />

                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            className="mx-auto h-6 w-auto"
                            src={logo}
                            alt="Logo"
                        />
                        <h1 className="mt-6 text-center text-xl font-bold leading-9 tracking-tight text-green-700">Welkom terug!</h1>
                        <h2 className="mt-0 text-center text-xs leading-9 tracking-tight text-gray-500">
                            Voer uw inloggegevens in om verder te gaan
                        </h2>
                    </div>
                     
                                                       
                        <form className="mt-10 mb-10 sm:mx-auto sm:w-full sm:max-w-sm">                                              
                            <div>
                                <label htmlFor="email-address" className="block mb-2 text-xs font-medium leading-6 text-gray-900">
                                <i class="fa-regular fa-envelope"></i>
                                {'\u00A0'} {'\u00A0'}
                                    Email
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"                                    
                                    required                                                                                
                                    placeholder="voorbeeld@live.nl"
                                    onChange={(e)=>setEmail(e.target.value)}
                                    className="block w-full text-xs rounded-md border py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"                        
                                />
                            </div>

                            <div>
                            <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block mb-2 text-xs font-medium mt-5 leading-6 text-gray-900">
                            <i class="fa-solid fa-lock-keyhole"></i>
                                {'\u00A0'} {'\u00A0'}
                                Wachtwoord
                            </label>
                            <div className="text-xs">
                            <a href="/forgot-password" className="font-semibold text-gray-500 hover:text-red-700">
                                Wachtwoord vergeten?
                            </a>
                            </div>
                            </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"                                    
                                    required                                                                                
                                    placeholder=""
                                    onChange={(e)=>setPassword(e.target.value)}
                                    className="block w-full text-xs rounded-md border py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"                        
                                />
                            </div>

                            <p className="mt-5 -mb-5 text-xs text-center text-red-900">{error}</p>
                                                
                            <div className='mt-10'>
                                <button                                    
                                    onClick={onLogin}   
                                    className="flex w-80 mb-0 justify-center m-auto rounded-full bg-gray-700 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"                                     
                                >      
                                    Login                                                                  
                                </button>
                            </div>                               
                        </form>
                       
                        <p className="text-center text-xs text-gray-500">
                            Nog geen account? {' '}
                            <NavLink to="/signup" className="font-semibold leading-6 text-green-800 hover:text-green-700">
                                Registreer!
                            </NavLink>
                        </p>
                                                   
                    </div>
                </section>
            </main>
        </>
    )
}
 