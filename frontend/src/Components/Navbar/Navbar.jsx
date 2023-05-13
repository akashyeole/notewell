import React from 'react'
import { Link } from "react-router-dom";
import "./Navbar.css"
import Logo from '../Logo/Logo';

const Navbar = () => {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <Logo iconSize = "3rem" fontSize = "2rem"/>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar