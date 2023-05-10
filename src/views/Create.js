import { useState, useEffect } from "react";
import './../css/App.css';
import { db } from "./../firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";

export function Create() {
    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState(0);

    const postsCollectionRef = collection(db, "posts");

    const createPost = async () => {
        await addDoc(postsCollectionRef, { name: newName, age: Number(newAge) });
        console.log("uploaded")
    };

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(postsCollectionRef);
        };

        getUsers();
    }, []);

    return (

        <div className="w-full max-w-xs">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Username"onChange={(event) => {
          setNewName(event.target.value);
        }}/>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="name" type="number" onChange={(event) => {
          setNewAge(event.target.value);
        }}/>
                </div>

                {/* <div class="mb-6">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-black" for="user_avatar">Upload file</label>
                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file"/>
                </div> */}

                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline items-center" type="button" onClick={createPost}>
                        Publish
                    </button>
                </div>
            </form>
        </div>
    );
}