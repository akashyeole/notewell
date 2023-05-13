import React from 'react'
import { Link } from "react-router-dom";
import "./Navbar.css"
import logo from "../../Images/logo_transparent.png";

const Navbar = () => {
  return (
    <nav class="navbar bg-body-tertiary">
      <div class="container">
        <Link class="navbar-brand d-flex gap-2" to="/">
          <img src = {logo} style = {{height: "3rem"}}/>
          <div>NoteWell</div>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar