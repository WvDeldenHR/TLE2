import { useState } from 'react';
import { auth } from '../../config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import logo from '../../images/logo.png'
import { BackButton } from "../buttons/BackButton";

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleResetPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // You can provide feedback to the user here
      })
      .catch((error) => {
        console.error("Error updating password:", error);
        // Handle the error and provide feedback to the user
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetClick = () => {
    handleResetPassword(email);
  };

  return (
    <div className="flex my-auto min-h-full w-full flex-1 flex-col justify-center items-center absolute inset-0 lg:px-8 sm:w-full sm:h-full ">

        <BackButton/>

<div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            className="mx-auto h-6 w-auto"
                            src={logo}
                            alt="Logo"
                        />
                        <h1 className="mt-6 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">Wachtwoord vergeten</h1>
                        <h2 className="mt-4 text-center text-xs leading-1 tracking-tight text-gray-500">
                        Voer hieronder het e-mailadres in dat is <br></br> gekoppeld aan uw account. Wij sturen u een <br></br>e-mail met instructies om uw wachtwoord te resetten.
                        </h2>
                    </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                <label htmlFor="email-address" className="block w-72  mb-2 text-xs font-medium leading-6 text-gray-900">
                                <i class="fa-regular fa-envelope"></i>
                                {'\u00A0'} {'\u00A0'}
                                    Email
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email" 
                                    value={email}                                   
                                    required                                                                                
                                    placeholder="voorbeeld@live.nl"
                                    onChange={handleEmailChange}
                                    className="block w-full text-xs rounded-md border py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"                        
                                />
      </div>

      <div className='mt-10'>
                                <button                                    
                                    onClick={handleResetClick}   
                                    className="flex w-80 mb-0 justify-center m-auto rounded-full bg-gray-700 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"                                     
                                >      
                                    Reset mijn wachtwoord                                                                  
                                </button>
                            </div>     
    </div>
  );
};
