import { useState } from "react"
import { auth } from "../config/firebase"
import { createUserWithEmailAndPassword, signOut } from "firebase/auth"

export const Auth = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch(err) {
            console.error(err)
        }
    }

    const logout = async () => {
        try {
            await signOut(auth)
        } catch(err) {
            console.error(err)
        }
    }

    return <div> 
        <input 
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
        />
        <input 
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            />

        <button onClick={signIn}> Registreer </button>

        <button onClick={logout}> Log uit </button>
    </div>
}