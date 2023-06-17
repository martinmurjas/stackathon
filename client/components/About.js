import React from "react";

import NavBar from "./NavBar";
import background from "../../public/backgroundWebOptimized.jpg";

const About = () => {
  return (
    <div id="backgroundImage" style={{ backgroundImage: `url(${background})` }}>
      <NavBar />
    </div>
  );
};

export default About;
