import React from "react";

import NavBar from "./NavBar";
import background from "../../public/backgroundWebOptimized.jpg";

const FAQ = () => {
  return (
    <div id="backgroundImage" style={{ backgroundImage: `url(${background})` }}>
      <NavBar />
    </div>
  );
};

export default FAQ;
