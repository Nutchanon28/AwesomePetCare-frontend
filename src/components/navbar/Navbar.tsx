import React from 'react'
import "../../css/navbar/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <ul className="navbar">
        <li><Link to="/">home</Link></li>
        <li><Link to="/login">login</Link></li>
        <li><Link to="/profile">profile</Link></li>
    </ul>
  )
}

export default Navbar