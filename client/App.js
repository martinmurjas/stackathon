import React from "react";

// import NavbarOrig from "./components/NavbarOrig";
import Routes from "./Routes";
import Canvas from "./components/Canvas";
import Main from "./components/Main";
import WelcomePage from "./components/WelcomePage";
import background from "../public/backgroundWebOptimized.jpg";
import "./App.css";

const App = () => {
  console.log(background);
  return (
    <div>
      <WelcomePage />
      <Main />
    </div>
    // <div>
    //   <NavbarOrig />
    //   <Routes />
    // </div>
  );
};

export default App;
