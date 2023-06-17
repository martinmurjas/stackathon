import React from "react";
import background from "../../public/backgroundWebOptimized.jpg";
import NavBar from "./NavBar";
import "./WelcomePage.css";

const WelcomePage = () => {
  return (
    <div id="backgroundImage" style={{ backgroundImage: `url(${background})` }}>
      <NavBar />
      <div id="welcomeMain">
        <div id="heading">
          <h1>
            Welcome to <span>Barrel It Up!</span>
          </h1>
          <p>
            Here at Barrel It Up we are using tech to help you visualize
            deficiencies in your swing and give you some actionable tips to get
            your swing to the next level
          </p>
          <h3>See how your swing stacks up below!</h3>
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
