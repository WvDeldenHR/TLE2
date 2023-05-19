import { useState } from "react";
import { db, storage } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export function CreatePost() {
    const [title, setTitle] = useState("");
    const [des, setDes] = useState("");
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const postsCollectionRef = collection(db, "posts");

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !des) {
            setErrorMessage("Please fill in all required fields.");
            return;
        }

        if (files.length === 0) {
            setErrorMessage("Please select at least one file.");
            return;
        }

        setErrorMessage("");
        setUploading(true);

        // Upload each file
        const fileURLs = await Promise.all(
            files.map((file) => {
                return new Promise((resolve, reject) => {
                    const storageRef = ref(storage, Date.now() + "_" + file.name);
                    const uploadTask = uploadBytesResumable(storageRef, file);

                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            // You can track upload progress here if needed
                        },
                        (error) => {
                            console.log(error);
                            reject(error);
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref)
                                .then((downloadURL) => {
                                    resolve(downloadURL);
                                    console.log(downloadURL)
                                })
                                .catch((error) => {
                                    console.log(error);
                                    reject(error);
                                });
                        }
                    );
                });
            })
        );



        // Save the post data to Firebase
        await addDoc(postsCollectionRef, {
            name: title,
            description: des,
            imageURLs: fileURLs,
        });

        setUploading(false);
        console.log("Uploaded");
        // Clear the form
        setTitle("");
        setDes("");
        setFiles([]);
    };

    return (
        <div className="h-full w-full max-w-xs">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                {/* Title field */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Title
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Username"
                        value={title}
                        onChange={(event) => {
                            setTitle(event.target.value);
                        }}
                    />
                </div>

                {/* Description field */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Description
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        value={des}
                        onChange={(event) => {
                            setDes(event.target.value);
                        }}
                    />
                </div>

                {/* File selection */}
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Upload files</label>
                    <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        type="file"
                        accept="image/png, image/gif, image/jpeg"
                        multiple
                        onChange={handleFileChange}
                    />
                </div>

                {/* Error message */}
                {errorMessage && (
                    <p className="text-red-500 mb-4">{errorMessage}</p>
                )}

                {/* Submit button */}
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline items-center"
                        type="submit"
                        disabled={uploading}
                    >
                        {uploading ? "Uploading..." : "Publish"}
                    </button>
                </div>
            </form>
        </div>
    );
}
