//import logo from './logo.svg';
import './css/App.css';
import {ListPosts} from "./views/ListPosts";

function App() {
  return (
    <div className="">

      {<ListPosts />}
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
