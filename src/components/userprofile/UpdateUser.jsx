import React, { useState, useEffect } from 'react';
import { auth, upload } from '../../config/firebase';
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { updateEmail, updateProfile } from "firebase/auth";

export const UpdateUser = () => {

    const navigate = useNavigate();

    const currentUser = auth.currentUser

    const [newEmail, setNewEmail] = useState("");
    const [displayName, setDisplayName] = useState('');

    const [updateStatusNameTrue, setUpdateStatusNameTrue] = useState('');
    const [updateStatusNameFalse, setUpdateStatusNameFalse] = useState('');

    const [updateStatusEmailTrue, setUpdateStatusEmailTrue] = useState('');
    const [updateStatusEmailFalse, setUpdateStatusEmailFalse] = useState('');


    const [photo, setPhoto] = useState(null)
    const [loading, setLoading] = useState(false)
    const [photoURL, setPhotoURL] = useState("")

    const handleUpdateEmail = () => {
        updateEmail(currentUser, newEmail)
          .then(() => {
            console.log("Email updated successfully");
            setUpdateStatusEmailTrue('     ');

              setTimeout(() => {
                setUpdateStatusEmailTrue('');
              }, 5000);
            
            // Perform any additional actions after email update
          })
          .catch((error) => {
            console.error("Error updating email:", error);
            setUpdateStatusEmailFalse('     ');

              setTimeout(() => {
                setUpdateStatusEmailFalse('');
              }, 10000);
            // Handle the error appropriately
          });
      };

      const updateDisplayName = () => {
        updateProfile(currentUser, { displayName })
          .then(() => {
            const user = auth.currentUser;
            if (user !== null) {
              setDisplayName(user.displayName || '');
              console.log('Profile updated successfully');
              setUpdateStatusNameTrue('     ');

              setTimeout(() => {
                setUpdateStatusNameTrue('');
              }, 5000);
            }
          })
          .catch((error) => {
            console.error('Error updating profile:', error);

            setUpdateStatusNameFalse('     ');

              setTimeout(() => {
                setUpdateStatusNameFalse('');
              }, 10000);
          });
      };

      const handleSubmitEmail = (e) => {
        e.preventDefault();
        handleUpdateEmail();
      };
  

      const handleSubmitDisplayName = (e) => {
        e.preventDefault();
        updateDisplayName();
      };

      useEffect(() => {
        if (currentUser && currentUser.photoURL) {
            setPhotoURL(currentUser.photoURL)
        }
    }, [currentUser])

    useEffect(() => {
        if (photo) {
            upload(photo, currentUser, setLoading, updatePhotoURL)
        }
    }, [photo, currentUser])

    function handleChange(e) {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0])
        }
    }

    function updatePhotoURL(url) {
      const cacheBuster = Date.now(); // Generate a unique value (timestamp)
      const updatedURL = `${url}?cache=${cacheBuster}`; // Append the cache buster to the photo URL
      setPhotoURL(updatedURL);
    }

    function navTo() {
      navigate("/home/settings/update/password")
    }

      // Render your component with the form
      return (

        <div className="flex min-h-full w-full flex-1 flex-col justify-center items-center  lg:px-8 sm:w-full sm:h-full ">

                <div className="sm:mx-auto sm:w-full sm:max-w-sm w-full bg-green-800 pt-8 pb-14 border border-gray-200">
                    {/* <img
                        className="mx-auto h-6 w-auto"
                        src={logo}
                        alt="Logo"
                    /> */}
                    <h1 className="mt-6 text-center text-xl font-bold leading-9 tracking-tight text-white">Profielbeheer</h1>
                    <h2 className="mt-2 text-center text-xs tracking-tight text-white">
                        Werk uw profielfoto en/of gegevens bij <br></br> 
                    </h2>
                </div>

                <div>
                <label htmlFor="file-input" className="-mt-10 absolute m-auto left-0 right-0 items-center text-center justify-center grid place-items-center">
                  <img
                    src={`${photoURL}?timestamp=${Date.now()}`}
                    alt="Profile"
                    className="w-32 h-32 rounded-full shadow-xl object-cover cursor-pointer"
                  />
                  <input
                    type="file"
                    onChange={handleChange}
                    id="file-input"
                    style={{ display: 'none' }}
                  />
                </label>
                {/* <p className='absolute right-44 top-64 shadow-xl text-gray-500'>
                  <i class="fa-solid fa-camera fa-2xl"></i></p> */}
                </div>

            <form onSubmit={handleSubmitDisplayName}
                className="mt-32 sm:mx-auto sm:w-full sm:max-w-sm " >

                <label htmlFor="name" className="block text-xs font-medium leading-6 text-gray-900">
                <i className="fa-regular fa-user"></i>
                {'\u00A0'} {'\u00A0'}
                    Naam
                </label>

                <div className="flex items-center mt-3">
                  <input
                    type="name"
                    label="Name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                    placeholder={currentUser.displayName}
                    className="block w-full text-xs rounded-md border py-1.5 px-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />

                  {updateStatusNameTrue && (
                    <div className="flex items-center ml-2 text-green-800">
                      <i class="fa-regular fa-circle-check fa-bounce"></i>
                      <p className="text-green-500">{updateStatusNameTrue}</p>
                    </div>
                  )}

                  {updateStatusNameFalse && (
                    <div className="flex items-center ml-2 text-green-800">
                      <i class="fa-regular fa-circle-xmark fa-bounce"></i>
                      <p className="text-green-500">{updateStatusNameFalse}</p>
                    </div>
                  )}

              </div>

                <button 
                    type="submit"
                    className="flex w-80 justify-center m-auto mt-5 rounded-full bg-gray-200 px-3 py-2 text-xs font-semibold leading-6 text-black shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"                      
                    >
                        Verander Naam
                </button>
            </form>

            <form onSubmit={handleSubmitEmail} 
                className="mt-10 mb-10 sm:mx-auto sm:w-full sm:max-w-sm">
                
                <label className="block text-xs font-medium leading-6 text-gray-900">
                <i class="fa-regular fa-envelope"></i>
                {'\u00A0'} {'\u00A0'}
                    Email
                </label>

                <div className="flex items-center mt-3">
                <input 
                    type="email" 
                    value={newEmail} 
                    onChange={(e) => setNewEmail(e.target.value)} 
                    placeholder={currentUser.email} 
                    className="block w-full text-xs mt-2 rounded-md border py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"                        
                    />

                    {updateStatusEmailTrue && (
                    <div className="flex items-center ml-2 text-green-800">
                      <i class="fa-regular fa-circle-check fa-bounce"></i>
                      <p className="text-green-500">{updateStatusEmailTrue}</p>
                    </div>
                  )}

                  {updateStatusEmailFalse && (
                    <div className="flex items-center ml-2 text-green-800">
                      <i class="fa-regular fa-circle-xmark fa-bounce"></i>
                      <p className="text-green-500">{updateStatusEmailFalse}</p>
                    </div>
                  )}

                </div>

                <button 
                    type="submit"
                    className="flex w-80 justify-center m-auto mt-5 rounded-full bg-gray-200 px-3 py-2 text-xs font-semibold leading-6 text-black shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"                      
                    >
                        Verander Email
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