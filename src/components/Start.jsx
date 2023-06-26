import React from 'react'
import { Link } from 'react-router-dom'
// Images
// import start from '../images/start.png'
import '../index.css'

export function Start() {
    return ( 
        <>
            {/* <div className="sm:mx-auto sm:w-full sm:max-w-sm relative">
                <img className="mx-auto h-full w-full" src={ start } alt="Start" />
            </div> */}

            {/* <div className="">
                <img className="w-full" src={ start } alt=""/>
            </div> */}

            {/* <div className="flex justify-center items-center mx-10 mb-5">
                <p className="text-4xl font-bold -mt-10">Samen <br></br> Naar Een <br></br> Betere Buurt</p>
            </div>
            <div className="flex justify-center items-center">
                <p className="mx-10 mb-10 text-sm text-gray-500">Everything works better, together...</p>
            </div>

            <div className='-mt-12'>
                <Link to="/signup">
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
            </div> */}
            
                <div className="banner | flex flex-col justify-end pb-12 h-screen">
                    <div className="flex flex-col mb-8 px-8">
                        <h1 className="pb-2 text-4xl text-dark capitalize font-bold">Samen <br></br>naar een <br></br>betere buurt</h1>
                        <h2 className="text-sm text-gray-500 font-normal">Everything works better, together...</h2>
                    </div>

                    <div className="flex flex-col gap-5 px-8">
                        <Link to="/signup">
                            <button className="rounded-full px-3 py-5 w-full text-sm text-white uppercase font-semibold bg-green-700 shadow-sm" type="submit">Registreren</button>
                        </Link>
                        <Link to="/login">
                            <button className="rounded-full px-3 py-5 w-full text-sm text-white uppercase font-semibold bg-gray-700 shadow-sm" type="submit">Inloggen</button>
                        </Link>
                    </div>
                </div>
        </>
    ) 
}