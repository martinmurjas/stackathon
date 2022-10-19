import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => (
  <div id="NavBar">
    <h1>Barrel It Up</h1>
    <nav>
      <NavLink to='/#/'>Home</NavLink>
      <NavLink to='/#/about'>About</NavLink>
      <NavLink to='/#/manual'>Manual</NavLink>
    </nav>
  </div>
);

export default NavBar;
