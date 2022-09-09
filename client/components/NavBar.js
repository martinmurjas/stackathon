import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => (
  <div id="NavBar">
    <h1>Barrel It Up</h1>
    <nav>
      <h3>Home</h3>
      <h3>About</h3>
      <h3>How To Use</h3>
    </nav>
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return state;
};

// const mapDispatch = (dispatch) => {
//   return {
//   };
// };

export default connect(mapState)(NavBar);
