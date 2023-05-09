//HOMEPAGINA

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios  from 'axios'
import { Link } from 'react-router-dom'

export function Home() {

    const [userName, setUserName] = useState("")

    const navigate = useNavigate()

    const updateprofile = () => {
        navigate("/update-user")
    }

    Axios.defaults.withCredentials = true

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
          if (response.data.loggedIn === true) {
            setUserName(response.data.user[0].name);
          }
        });
      }, []);

    const handleLogout = () => {
        Axios.get('http://localhost:3001/logout')
          .then((response) => {
            console.log(response.data);
            // Redirect the user to the login page
            navigate("/")
          })
          .catch((error) => {
            console.error(error);
          });
    }

    return (
        <div>
        <h1> Hola Como estas?</h1>
        <p>Dit is de home page</p>

            <div className='mt-10'>
            <button
                onClick = {updateprofile}
                className="flex w-80 mb-10 justify-center m-auto rounded-full bg-gray-700 px-3 py-5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                Update Profile
             </button>
            </div>

            <div className='mt-10'>
            <button
                onClick = {handleLogout}
                className="flex w-80 mb-10 justify-center m-auto rounded-full bg-gray-700 px-3 py-5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                Log out
             </button>
            </div>

        </div>

        
    )
}