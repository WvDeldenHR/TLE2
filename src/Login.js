//LOGIN

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import logo from './images/logo.png'

export function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [loginStatus, setLoginStatus] = useState("")

    const navigate = useNavigate()

    Axios.defaults.withCredentials = true

    const login = () => {
      Axios.post('http://localhost:3001/login', {
        email: email,
        password: password
      }).then((response) => {
        if (response.data.message) {
          setLoginStatus(response.data.message)
        } else {
          navigate("/home")
        }

      })
    }

    useEffect(() => {
      Axios.get("http://localhost:3001/login").then((response) => {
        if (response.data.loggedIn === true) {
          navigate("/home")
      }
      })
    }, [])

    return (
        <div>

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

        <div className="mt-10 mb-10 sm:mx-auto sm:w-full sm:max-w-sm">

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                E-mail
              </label>
              <div className="mt-2">
                <input
                  onChange= {(e) => {
                    setEmail(e.target.value)
                  }}
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className='mb-8'>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm mt-5 font-medium leading-6 text-gray-900">
                  Wachtwoord
                </label>
                <div className="text-sm mt-5">
                  <a href="#" className="font-semibold text-gray-400  hover:text-indigo-500">
                    Wachtwoord vergeten?
                  </a>
                </div>
              </div>
              <div className="mt-2 mb-10">
                <input
                  onChange= {(e) => {
                    setPassword(e.target.value)
                  }}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md mb-10 border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className='mt-3 text-red-800'>
          <h3>{loginStatus}</h3>
        </div>

            <div className='mt-10'>
            <button
                onClick = {login}
                className="flex w-80 mb-10 justify-center m-auto rounded-full bg-gray-700 px-3 py-5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                INLOGGEN
             </button>
            </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Nog geen account?{' '}
            <a href="/register" className="font-semibold leading-6 text-green-800 hover:text-green-700">
              Maak een account aan!
            </a>
          </p>

        </div>
      </div>
      </div>
    )
}