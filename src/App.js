import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import './css/App.css';

// Components
import { Navbar } from "./components/navs/Navbar.jsx";
// Views
import { Home } from "./views/Home.jsx";
import { Discover } from './views/Discover.jsx';
// import { Post } from './views/Post.jsx';
// import { Overview } from './views/Overview.jsx';
// import { Settings } from './views/Settings.jsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="home" element={ <Home />} />
          <Route path="discover" element={ <Discover />} />
          {/* <Route path="post" element={ <Post />} />
          <Route path="overview" element={ <Overview />} />
          <Route path="settings" element={ <Settings />} /> */}
      </Routes>

      <Navbar />
    </BrowserRouter>
  );
}

export default App;