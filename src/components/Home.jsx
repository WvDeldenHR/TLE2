import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase"
import { useNavigate } from 'react-router-dom';
 
export const HomeTest = () => {

    const navigate = useNavigate();
 
    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened. 
            console.error(error)
        });
    }
   
    return(
        <>
            <nav>
                <p>
                    Welcome Home
                </p>
 
                <div>
        			<button onClick={handleLogout}>
                        Logout
                    </button>
        		</div>
            </nav>
        </>
    )
}

 