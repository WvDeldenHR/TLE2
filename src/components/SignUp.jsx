import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from "../config/firebase"
import { updateProfile } from 'firebase/auth';
// import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
import { BackButton } from "./buttons/BackButton";
 
export const SignUp = () => {
    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState('');
 
    const onSubmit = async (e) => {
      e.preventDefault()
     
      // Validate input fields
    if (!email || !password) {
        setError('Voer a.u.b alle invoervelden in.');
        return;
      }
  
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log(user);
        updateDisplayName(user);
        navigate("/signup/picture");
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError('Iets ging fout. Probeer het opnieuw');
      }
    };
  

    const updateDisplayName = (user) => {
        if (displayName) {
          updateProfile(user, { displayName })
            .then(() => {
              console.log('Profile updated successfully');
              // Perform any additional actions after profile update
            })
            .catch((error) => {
              console.error('Error updating profile:', error);
              // Handle the error appropriately
            });
        }
      };
 
  return (
    <main >        
        <section>
            <div>


                <div className="flex my-auto min-h-full w-full flex-1 flex-col justify-center items-center absolute inset-0 lg:px-8 sm:w-full sm:h-full ">      

                 <BackButton/>

                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-6 w-auto"
                        src={logo}
                        alt="Logo"
                    />
                    <h1 className="mt-6 text-center text-xl font-bold leading-9 tracking-tight text-green-700">Registeren</h1>
                    <h2 className="mt-0 text-center text-xs leading-9 tracking-tight text-gray-500">
                        Voer uw gegevens in om een account aan te maken
                    </h2>
                </div>

                    <form className="mt-10 mb-10 sm:mx-auto sm:w-full sm:max-w-sm">     

                        <div>
                            <label htmlFor="name" className="block mb-2 text-xs font-medium leading-6 text-gray-900">
                            <i class="fa-regular fa-user"></i>
                            {'\u00A0'} {'\u00A0'}
                                Naam
                            </label>
                            <input
                                type="name"
                                label="Name"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)} 
                                required                                    
                                placeholder="Uw naam"        
                                className="block w-full text-xs rounded-md border py-1.5 px-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"                        
                            />
                        </div>

                        <div>
                            <label htmlFor="email-address" className="block mb-2 text-xs mt-5 font-medium leading-6 text-gray-900">
                            <i class="fa-regular fa-envelope"></i>
                                {'\u00A0'} {'\u00A0'}
                                Email
                            </label>
                            <input
                                type="email"
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}  
                                required                                    
                                placeholder="voorbeeld@live.nl"        
                                className="block w-full text-xs rounded-md border py-1.5 px-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"                        
                            />
                        </div>

                        <div className="">
                            <label htmlFor="password" className="block mb-2 text-xs font-medium mt-5 leading-6 text-gray-900">
                            <i class="fa-regular fa-lock"></i>
                                {'\u00A0'} {'\u00A0'}
                                Wachtwoord
                            </label>
                            <input
                                type="password"
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                required                                 
                                placeholder="Minimaal 6 tekens"         
                                className="block w-full rounded-md text-xs mb-10 border py-1.5 px-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"     
                            />
                        </div>                                             
                        
                        {error && <p className="mt-5 mb-5 text-xs text-center text-red-900">{error}</p>}

                        <button
                            type="submit" 
                            onClick={onSubmit}  
                            className="flex w-80 justify-center m-auto rounded-full bg-green-700 py-3 text-xs font-semibold leading-6 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"                      
                        >  
                            Registreer                                
                        </button>
                                                                     
                    </form>
                   
                    <p className="text-center text-xs text-gray-500">
                            Al een account? {' '}
                            <NavLink to="/login" className="font-semibold leading-6 text-xs text-green-800 hover:text-green-700">
                                Log in!
                            </NavLink>
                        </p>    

                </div>

            </div>
        </section>
    </main>
  )
}
 