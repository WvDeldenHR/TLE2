import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import './css/App.css';

// Components
// import { Navbar } from "./components/navs/Navbar";
// Views
import { Home } from "./views/Home";
import { Discover } from './views/Discover';
import { CreatePost } from './views/CreatePost';
// import { Overview } from './views/Overview';
// import { Settings } from './views/Settings';


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="home" element={ <Home />} />
          <Route path="discover" element={ <Discover />} />
          <Route path="create-post" element={ <CreatePost />} />
          {/* <Route path="overview" element={ <Overview />} />
          <Route path="settings" element={ <Settings />} /> */}
      </Routes>

      {/* <Navbar /> */}
    </BrowserRouter>
  );
}

export default App;