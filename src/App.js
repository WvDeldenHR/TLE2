//import logo from './logo.svg';
import './css/App.css';
import {ListPosts} from "./views/ListPosts";
import {CreatePost} from "./views/CreatePost";
import {BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

function App() {
  return (
    <div className="">
      <BrowserRouter>
      <Routes>
        <Route path='post/create' element={<CreatePost/>} ></Route>
        <Route path='post/list' element={<ListPosts/>}></Route>
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
