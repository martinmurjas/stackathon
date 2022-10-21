import React from "react";
import background from "../../public/backgroundWebOptimized.jpg";
import NavBar from "./NavBar";
import "./css/WelcomePage.css";
import {GoArrowDown} from 'react-icons/go'
import { ComparisonImages } from "./ComparisonImages";

const WelcomePage = () => {
  return (
    // <div id="WelcomePage" style={{ backgroundImage: `url(${background})` }}>
    <div id="WelcomePage" >
      <NavBar />
      <div id="welcomeMain">
        <div id="heading">
          <h1>Volleyball Analysis!</h1>
          <p>Upload your videos/photos to find out how to improve!</p>
          <ComparisonImages/>
          <GoArrowDown size={'7rem'}/>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;

// <h2>Our Process:</h2>
// <p>
// 	Using video along with skeletal pose estimation we are able to
// 	analyze your swing mechanics to determine opportunities for
// 	improvement. Correcting your form during a swing is the best way to
// 	help you take advantage of your strongest muscles and increase your
// 	impact on the ball. We analyze serveral key points of the swing to
// 	determine weight distribution, balance, and body rotation to
// 	highlight adjustments that will help you barrel it up and launch it
// 	out of the park.
// </p>
