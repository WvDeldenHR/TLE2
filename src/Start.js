import React from 'react'
import { Link } from 'react-router-dom'
import start from './images/start.png'
import './css/index.css'

export function Start() {
    return ( 
        <div>

            <div className="sm:mx-auto sm:w-full sm:max-w-sm relative">
                <img
                    className="mx-auto h-100 w-full"
                    src={start}
                    alt="Start"
                />
            </div>

            <div className="flex -mt-10 mx-10 mb-5">
                <p className="text-4xl font-bold -mt-10">Samen <br></br> Naar Een <br></br> Betere Buurt</p>
            </div>

            <p className="mx-10 mb-10 text-sm text-gray-500">Everything works better, together...</p>

            <div className='mt-10'>
                <Link to="/register">
                    <button
                        type="submit"
                        className="flex w-80 mb-5 mt-10 justify-center m-auto rounded-full bg-green-700 px-3 py-5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
                    >
                        REGISTREREN
                    </button>
                </Link>
            </div>

            <div className=''>
                <Link to="/login">
                    <button
                        type="submit"
                        className="flex w-80 mb-10 justify-center m-auto rounded-full bg-gray-700 px-3 py-5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                    >
                        INLOGGEN
                    </button>
                </Link>
            </div>
            
        
        </div>
    ) 
}