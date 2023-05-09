//HOMEPAGINA

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios  from 'axios'
import { Link } from 'react-router-dom'

export function UpdateUser() {

    const [userCurrentName, setUserCurrentName] = useState("")
    const [userCurrentEmail, setUserCurrentEmail] = useState("")

    const [loginStatus, setLoginStatus] = useState("")

    const navigate = useNavigate()

    Axios.defaults.withCredentials = true

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
          if (response.data.loggedIn === true) {
          setUserCurrentName(response.data.user[0].name)
          setUserCurrentEmail(response.data.user[0].email)
        }
        })
      }, [])

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        Axios.put("http://localhost:3001/update-user", {
          name: name,
          email: email,
          password: password
        }).then(response => {
          console.log(response.data);
          Axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.loggedIn === true) {
              setUserCurrentName(response.data.user[0].name);
            }
          });

          if (response.data.message) {
            setLoginStatus(response.data.message)
          } else {
            setLoginStatus(response.data.succes)
          }
        }).catch(error => {
          console.log(error);
        });
      }



    return (
        <div>

        <div className="flex min-h-full w-full flex-1 flex-col justify-center items-center absolute inset-0 lg:px-8 sm:w-full sm:h-full ">

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="mt-6 text-center text-3xl font-bold leading-9 tracking-tight text-green-700">Bewerk uw profiel</h1>
            <h2 className="mt-0 text-center text-l leading-9 tracking-tight text-gray-500">
                Hier kunt u uw persoonlijke gegevens veranderen.
            </h2>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 mb-10 sm:mx-auto sm:w-full">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 mt-5">Naam</label>

                    <div className="mt-2">
                    <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    placeholder={userCurrentName}

                    onChange={(e) => setName(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>

                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 mt-5">Email</label>
                    
                    <div className="mt-2">
                    <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    placeholder={userCurrentEmail}

                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>

                </div>
                <div className='mb-8'>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 mt-5">Wachtwoord</label>
                    
                    <div className="mt-2">
                    <input
                    type="password"
                    name="password"
                    id="password"
                   
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>

                </div>
                <button type="submit"
                className="flex w-80 justify-center m-auto rounded-full bg-gray-700 px-3 py-5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >Update Profile</button>
            </form>

            <div className='text-red-800'>
          <h3>{loginStatus}</h3>
        </div>

            <p className="text-center text-sm text-gray-500">
            <a href="/home" className="font-semibold leading-6 text-gray-800 hover:text-gray-700">
              Ga terug
            </a>
          </p>
            
        </div>

        </div>
    )
}
