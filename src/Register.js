//REGISTER

import React, { useState } from 'react'
import Axios  from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import logo from './images/logo.png'

export function Register() {

    const [nameReg, setNameReg] = useState('')
    const [emailReg, setEmailReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')

    const navigate = useNavigate()

    Axios.defaults.withCredentials = true

    const register = () => {
      Axios.post('http://localhost:3001/register', {
        name: nameReg, 
        email: emailReg,
        password: passwordReg
      }).then((response) => {
        console.log(response)
        navigate("/login")
      })
    }

    return (
        <div>
            
        <div className='absolute'>
            <Link to="/">
                <button
                className="text-gray bg-gray-200 font-medium rounded-full text-sm px-4 py-3 mx-10 my-10 mt-10 mb-2 cursor-pointer"
            >
            ◄
            </button>
            </Link>
        </div>

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

        <div className="mt-10 mb-10 sm:mx-auto sm:w-full sm:max-w-sm">

          <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Naam
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  onChange = {(e) => {
                    setNameReg(e.target.value)
                  }}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mt-5 leading-6 text-gray-900">
                E-mail
              </label>
              <div className="mt-2">
                <input
                  onChange = {(e) => {
                    setEmailReg(e.target.value)
                  }}
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className='mb-8'>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium mt-5 leading-6 text-gray-900">
                  Wachtwoord
                </label>
              </div>
              <div className="mt-2 mb-10">
                <input
                  onChange = {(e) => {
                    setPasswordReg(e.target.value)
                  }}
                  type="password"
                  required
                  className="block w-full rounded-md mb-10 border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className='mt-10'>
            <button
                        onClick={register}
                        className="flex w-80 mb-5 mt-10 justify-center m-auto rounded-full bg-green-700 px-3 py-5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
                    >
                        REGISTREREN
                    </button>
            </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Al een account?{' '}
            <a href="/login" className="font-semibold leading-6 text-lime-800 hover:text-lime-700">
              Log in!
            </a>
          </p>

        </div>
      </div>
      </div>

    )
}