import React, { useContext, useEffect } from 'react'
import "./Navbar.css"
import Logo from '../Logo/Logo'
import { Link } from 'react-router-dom'
import applicationContext from '../../Context/application/applicationContext'

const Navbar = () => {
  const { applicationState, updateAppState } = useContext(applicationContext);
  useEffect(()=>{
    const onPageLoad = () => {
      const searchButton = document.querySelector("nav .desktop-nav .search-button");
      const closeButton = document.querySelector(".search-container .search-close");
      const desktopNav = document.querySelector(".desktop-nav");
      const searchContainer = document.querySelector(".search-container");
      const overlay = document.querySelector(".overlay");
      
      
      searchButton.addEventListener("click", ()=>{
        desktopNav.classList.add("hide");
        searchContainer.classList.remove("hide");
        overlay.classList.add("show");
      });
      
      closeButton.addEventListener("click", ()=>{
        searchContainer.classList.add("hide");
        desktopNav.classList.remove("hide");
        overlay.classList.remove("show");
      });
      
      overlay.addEventListener("click", ()=>{
        searchContainer.classList.add("hide");
        desktopNav.classList.remove("hide");
        overlay.classList.remove("show");
      });

      /* Mobile version */
      
      const menuIconContainer = document.querySelector("nav .menu-icon-container");
      menuIconContainer.addEventListener("click", menuToggle);
      
      const searchBar = document.querySelector(".mobile-search-container .search-bar");
      const nav = document.querySelector(".nav-container nav");
      const searchInput = document.querySelector(".mobile-search-container input");
      const cancelButton = document.querySelector(".mobile-search-container .cancel-btn");

      searchInput.addEventListener("click", ()=>{
        searchBar.classList.add("active");
        nav.classList.add("move-up");
        desktopNav.classList.add("move-down");        
      });

      cancelButton.addEventListener("click", ()=>{
        searchBar.classList.remove("active");
        nav.classList.remove("move-up");
        desktopNav.classList.remove("move-down");        
      });

      const navLis = document.querySelectorAll(".desktop-nav .navbar-brand");
      const navContainer = document.querySelector(".nav-container");
      for(let i = 0; i < navLis.length; i++){
        navLis[i].addEventListener("click", ()=>{
          navContainer.classList.remove('active');
        });
      }
    };
    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad);
      return () => window.removeEventListener('load', onPageLoad);
    }
    
  }, [])
  
  function menuToggle(e){
      const navContainer = document.querySelector(".nav-container");
      navContainer.classList.toggle('active')
  }
  

  const changeTheme = (() => {
    if(applicationState.theme === "dark") updateAppState({...applicationState, theme: "light"});
    else updateAppState({...applicationState, theme: "dark"});
  })

  return (
    <>
      <div className = "nav-container" >
          {/* <nav style </div>= {{display: 'none'}}> */}
          <nav>
              <ul className="mobile-nav">
                  <li>
                    <div className="menu-icon-container">
                      <div className="menu-icon">
                        <span className="line-1"></span>
                        <span className="line-2"></span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link className="navbar-brand" to="/"><Logo iconSize = "2rem" fontSize = "1.5rem"></Logo></Link>
                  </li>
                  <li className= "account-button">
                    <lord-icon
                          src="https://cdn.lordicon.com/ljvjsnvh.json"
                          trigger="hover"
                          colors={applicationState.theme === "dark" ? "primary:#00EAF3,secondary:#0070f3" : "primary:#000000,secondary:#0070f3"}
                          state="hover-2"
                          style={{width:"1.8rem", height:"1.8rem", cursor: "pointer"}}>
                      </lord-icon>
                  </li>
              </ul>

              <ul className = "desktop-nav" style = {{color: applicationState.theme === "dark" ? "white" : "black"}}>
                  <li className="desktop-logo"><Link className="navbar-brand" to="/" style={{opacity: 1}}><Logo iconSize = "2.1rem" fontSize = "1.5rem"/></Link></li>
                  <li><Link className="navbar-brand" to="/">Home</Link></li>
                  <li><Link className="navbar-brand" to="/about">About</Link></li>
                  <li><Link className="navbar-brand" to="/about">Help</Link></li>
                  <li><Link className="navbar-brand" to="/about">Feedback</Link></li>

                  <li className = "search-button">
                    <lord-icon
                        src="https://cdn.lordicon.com/zniqnylq.json"
                        trigger="hover"
                        colors={applicationState.theme === "dark" ? "primary:#00EAF3,secondary:#0070f3" : "primary:#000000,secondary:#0070f3"}
                        style={{width:"1.8rem", height:"1.8rem", cursor: "pointer"}}>
                    </lord-icon>
                  </li>
                  <li className = "account-button">
                    <lord-icon
                        src="https://cdn.lordicon.com/ljvjsnvh.json"
                        trigger="hover"
                        colors={applicationState.theme === "dark" ? "primary:#00EAF3,secondary:#0070f3" : "primary:#000000,secondary:#0070f3"}
                        state="hover-2"
                        style={{width:"1.8rem", height:"1.8rem", cursor: "pointer"}}>
                    </lord-icon>
                  </li>

                  <li>
                    <lord-icon
                        class= "theme-btn"
                        src="https://cdn.lordicon.com/dkowjmhq.json"
                        trigger="click"
                        colors={applicationState.theme === "dark" ? "primary:#ffffff,secondary:#ffffff,tertiary:#ffffff" : "primary:#000000,secondary:#000000,tertiary:#000000"}
                        style={{cursor: "pointer"}}
                        onClick={changeTheme} >
                    </lord-icon>
                  </li>
              </ul>
          </nav>

          {/* Search container */}
          <div className="search-container hide">
            <div className="search-icon">
              <lord-icon
                src="https://cdn.lordicon.com/zniqnylq.json"
                colors={applicationState.theme === "dark" ? "primary:#00EAF3,secondary:#0070f3" : "primary:#000000,secondary:#0070f3"}
                style={{width:"1.8rem", height:"1.8rem", top: "0.65rem", opacity: "0.6"}}>
              </lord-icon>
            </div>
            <div className="search-bar">
              <form action="">
                <input type= "text" placeholder="Search NoteWell" style={{"color": (applicationState.theme === "dark" ? "white" : "black")}}/>
              </form>
            </div>
            <div className="search-close">
              <lord-icon
                  src="https://cdn.lordicon.com/zgogqkqu.json"
                  trigger="hover"
                  colors={applicationState.theme === "dark" ? "primary:#00EAF3,secondary:#0070f3" : "primary:#000000,secondary:#0070f3"}
                  style={{width:"1.8rem", height:"1.8rem", cursor: "pointer", transform: "rotateY(0deg) rotate(45deg)" }}>
              </lord-icon>
            </div>
            <div className="quick-links" style={{backgroundColor: (applicationState.theme === "dark" ? "white" : "#313131")}}>
              <h2>Quick Links</h2>
              <ul>
                <li>
                  <Link className="navbar-brand" to="#">Recover delete note</Link>
                </li>
                <li>
                  <Link className="navbar-brand" to="#">Share note publicly</Link>
                </li>
                <li>
                  <Link className="navbar-brand" to="#">Delete account permanently</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mobile-search-container">
            <div className="search-icon">
              <lord-icon
                src="https://cdn.lordicon.com/zniqnylq.json"
                colors={applicationState.theme === "dark" ? "primary:#00EAF3,secondary:#0070f3" : "primary:#000000,secondary:#0070f3"}
                style={{width:"1.8rem", height:"1.8rem", top: "0.46rem", opacity: "0.6"}}>
              </lord-icon>
            </div>
            <div className="search-bar">
              <form action="">
                <input type= "text" placeholder="Search NoteWell"/>
              </form>
            </div>
            <span className="cancel-btn">Cancel</span>
            <div className="quick-links">
              <h2>Quick Links</h2>
              <ul>
                <li>
                  <Link className="navbar-brand" to="#">Recover delete note</Link>
                </li>
                <li>
                  <Link className="navbar-brand" to="#">Share note publicly</Link>
                </li>
                <li>
                  <Link className="navbar-brand" to="#">Delete account permanently</Link>
                </li>
              </ul>
            </div>
          </div>

      </div>
      <div className="overlay"></div>
    </>

  )
}

export default Navbar