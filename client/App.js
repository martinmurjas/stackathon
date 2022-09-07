import React from "react";

// import NavbarOrig from "./components/NavbarOrig";
import Routes from "./Routes";
import NavBar from "./components/NavBar";
import Canvas from "./components/Canvas";
import VideoControls from "./components/VideoControls";
import Main from "./components/Main";

const App = () => {
  return (
    <div>
      <NavBar />
      <Main />
    </div>
    // <div>
    //   <NavbarOrig />
    //   <Routes />
    // </div>
  );
};

export default App;
