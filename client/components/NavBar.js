import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div id="NavBar">
      <h1>Barrel It Up</h1>
      <nav>
        <h3 onClick={() => navigate("/")}>Home</h3>
        <h3 onClick={() => navigate("/about")}>About</h3>
        <h3 onClick={() => navigate("/faq")}>How To Use</h3>
      </nav>
    </div>
  );
};

const mapState = (state) => {
  return state;
};

export default connect(mapState)(NavBar);
