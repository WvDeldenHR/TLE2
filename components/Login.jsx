import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from "../config/firebase"
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../images/logo.png'
 
export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       
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
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
       
    }
 
    return(
        <>
            <main >        
                <section>

                 <div className='mt-10'>
                    <a href="/">
                        <button
                            className="text-gray bg-gray-200 font-medium rounded-full text-sm px-4 py-3 mx-10 my-10 mt-10 mb-2"
                        >
                            ◄
                        </button>
                    </a>
                </div>

                    <div className="flex min-h-full w-full flex-1 flex-col justify-center items-center absolute inset-0 lg:px-8 sm:w-full sm:h-full ">   

                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            className="mx-auto h-6 w-auto"
                            src={logo}
                            alt="Logo"
                        />
                        <h1 className="mt-6 text-center text-3xl font-bold leading-9 tracking-tight text-green-700">Welkom terug!</h1>
                        <h2 className="mt-0 text-center text-l leading-9 tracking-tight text-gray-500">
                            Voer uw inloggegevens in om verder te gaan
                        </h2>
                    </div>
                     
                                                       
                        <form className="mt-10 mb-10 sm:mx-auto sm:w-full sm:max-w-sm">                                              
                            <div>
                                <label htmlFor="email-address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"                                    
                                    required                                                                                
                                    placeholder="Email address"
                                    onChange={(e)=>setEmail(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"                        
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className=" mt-5 block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"                                    
                                    required                                                                                
                                    placeholder="Password"
                                    onChange={(e)=>setPassword(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"                        
                                />
                            </div>
                                                
                            <div className='mt-10'>
                                <button                                    
                                    onClick={onLogin}   
                                    className="flex w-80 mb-0 justify-center m-auto rounded-full bg-gray-700 px-3 py-5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"                                     
                                >      
                                    Login                                                                  
                                </button>
                            </div>                               
                        </form>
                       
                        <p className="text-center text-sm text-gray-500">
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
 