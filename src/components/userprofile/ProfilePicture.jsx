import { useEffect, useState } from "react"
import { auth, upload } from '../../config/firebase';
import { useNavigate } from "react-router-dom";
import { BackButton } from "../buttons/BackButton";
import "../../index.css"

export function ProfilePicture() {

    const navigate = useNavigate();

    const currentUser = auth.currentUser

    const [photo, setPhoto] = useState(null)
    const [loading, setLoading] = useState(false)
    const [photoURL, setPhotoURL] = useState("https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg")
    const [uploadedPhotoURL, setUploadedPhotoURL] = useState("");


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
        setUploadedPhotoURL(url);
        const cacheBuster = Date.now(); // Generate a unique value (timestamp)
        const updatedURL = `${url}?cache=${cacheBuster}`; // Append the cache buster to the photo URL
        setPhotoURL(updatedURL);
    }

    function handleNextPage() {
        //Home
        navigate("/signup/location");
      }
    

    return (
        <div>

            <BackButton />

            <div className="flex min-h-full text-xs w-full flex-1 flex-col mt-10 items-center absolute inset-0 lg:px-8 sm:w-full sm:h-full ">
                <div className="mt-20 mb-10 sm:mx-auto sm:w-full sm:max-w-sm">


                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img 
                        alt="Avatar" 
                        className="w-36 h-36 shadow-md rounded-full mx-auto"
                        src={`${photoURL}?timestamp=${Date.now()}`}
                    />

                    <h1 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-green-700">Profiel Foto</h1>
                    <h2 className="mt-6 mb-10 text-center text-m leading-1 tracking-tight text-gray-800">
                        Voeg een geweldige profielfoto toe en laat <br></br> aan iedereen zien wie je bent!
                    </h2>
                </div>


                    <div>
                    <input
                        type="file"
                        onChange={handleChange}
                        id="file-input"
                        style={{ display: 'none' }}
                    />

                    <label htmlFor="file-input" className="block items-center text-center justify-center rounded-full py-3 px-10 mx-auto mb-20 mt-10 bg-green-700 text-white">
                        Kies een foto uit uw galerij
                    </label>
                    
                    <h2 className="mt-20 mb-10 text-center text-xs leading-1 tracking-tight text-gray-500">
                        Wilt u (nog) geen profiel foto instellen? <br></br> Geen probleem! Dat kan later ook nog.
                    </h2>
                    
                        <button
                        onClick={handleNextPage}
                        className="block items-center justify-center rounded-full py-2 px-5 bg-gray-200 text-black mx-auto">
                            Volgende
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}