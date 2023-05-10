import { useEffect } from "react";
import { useState } from "react";
import {collection} from 'firebase/firestore'

function App (){
    const [users, setUSers] = useState([]);
    const collectionRef = collection (db, "posts")

    useEffect(() => {
        const getUsers = async () => {

        }
    
    getUsers()
}, [])

}