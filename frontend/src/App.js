import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import { useContext, useEffect } from 'react';
import ApplicationState from './Context/application/ApplicationState';

// const appContext = useContext(applicationContext);
//   let link = document.querySelector("link")
//   link.href = `./logo_static_${appContext.state.theme}.png`;

function App() {
  
  useEffect(()=>{
    const onPageLoad = () => {
      let otes = document.getElementsByClassName("l-small");
      for(let i = 0; i < otes.length; i++){
        otes[i].classList.add("logo-anime");
      }
    };
    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad);
      return () => window.removeEventListener('load', onPageLoad);
    }
    
  },[]);
  

  return (
    <>
      <ApplicationState>
        <Router>
          {/* <Navbar /> */}
          <Navbar />
          <Routes>
            <Route path="/" element = {<Home/>}/>
            <Route path="/about" element = {<About/>}/>
          </Routes>
        </Router>
      </ApplicationState>
    </>
  );
}

export default App;
