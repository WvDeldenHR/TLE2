//import logo from './logo.svg';
import './css/App.css';
import {ListPosts} from "./views/ListPosts";
import {CreatePost} from "./views/CreatePost";
import {BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { EditPost } from './views/EditPost';
import { auth } from "./firebase-config";
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const unsubscribeAuthListener = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is logged in
        setUser(user);
      } else {
        // User is not logged in
        setUser(null);
      }
    });

  }, []);


  return (
    <div className="">
      <BrowserRouter>
      <Routes>
        <Route path='post/create' element={user ? <CreatePost user={user} /> : <Navigate to="/login"/>} ></Route>
        <Route path='post/list' element={<ListPosts/>}></Route>
        <Route path="/post/edit/:postId" element={<EditPost />} />
      </Routes>
      </BrowserRouter>

    </div>
    // <h1 className="text-3xl font-bold underline">
    //   Hello world!
    // </h1>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
