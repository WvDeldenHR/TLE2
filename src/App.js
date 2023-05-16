import React from 'react';
import './css/App.css';
import {Navbar} from "./Navbar.js";
import {BrowserRouter} from "react-router-dom"
function App() {
  return (
    <BrowserRouter>
    <div className="">
      <body className="vp">
  
      </body>
      <footer className="fixed bottom-0">
        {<Navbar />}
      </footer>
    </div>
    </BrowserRouter>
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
