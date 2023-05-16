import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from "../config/firebase"
// import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
 
export const SignUp = () => {
    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
 
    const onSubmit = async (e) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            navigate("/login")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });
    }

    const routeChange = () => { 
        let path = "/"; 
        navigate(path);
    }
 
  return (
    <main >        
        <section>
            <div>

                        <button
                            onClick={routeChange}
                            className=" mt-10 text-gray bg-gray-200 font-medium rounded-full text-sm px-4 py-3 mx-10 my-10 mt-10 mb-2"
                        >
                            ◄ 
                        </button>


                <div className="flex min-h-full w-full flex-1 flex-col justify-center items-center absolute inset-0 lg:px-8 sm:w-full sm:h-full ">      

                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-6 w-auto"
                        src={logo}
                        alt="Logo"
                    />
                    <h1 className="mt-6 text-center text-3xl font-bold leading-9 tracking-tight text-green-700">Registeren</h1>
                    <h2 className="mt-0 text-center text-l leading-9 tracking-tight text-gray-500">
                        Voer uw gegevens in om een account aan te maken
                    </h2>
                </div>

                    <form className="mt-10 mb-10 sm:mx-auto sm:w-full sm:max-w-sm">                                                                                            
                        <div>
                            <label htmlFor="email-address" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <input
                                type="email"
                                label="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}  
                                required                                    
                                placeholder="Email address"        
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"                        
                            />
                        </div>

                        <div className="">
                            <label htmlFor="password" className="block text-sm font-medium mt-5 leading-6 text-gray-900">
                                Password
                            </label>
                            <input
                                type="password"
                                label="Create password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                required                                 
                                placeholder="Password"         
                                className="block w-full rounded-md mb-10 border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"     
                            />
                        </div>                                             
                        
                        <button
                            type="submit" 
                            onClick={onSubmit}  
                            className="flex w-80 justify-center m-auto rounded-full bg-green-700 px-3 py-5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"                      
                        >  
                            Sign up                                
                        </button>
                                                                     
                    </form>
                   
                    <p className="text-center text-sm text-gray-500">
                            Al een account? {' '}
                            <NavLink to="/login" className="font-semibold leading-6 text-green-800 hover:text-green-700">
                                Log in!
                            </NavLink>
                        </p>    

                </div>

            </div>
        </section>
    </main>
  )
}
 