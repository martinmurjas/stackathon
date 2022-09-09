import React from "react";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import { setEndTime } from "../../store";
import "./SelectEndTime.css";
import baseball from "../../../public/baseball.png";

const SelectEndTime = ({ setEndTime, camera, setStep, step }) => {
  const onClick = () => {
    setEndTime(camera.video.currentTime || 0);
    setStep(step + 1);
  };

  return (
    <div id="SelectEndTime">
      <h1>
        <span>Step 3</span>: Set Analysis End Time
      </h1>
      <div className="stepMain">
        <div className="instructions">
          <h3>Instructions</h3>
          <p>
            Use the video seek bar to find the moment that the batter hits the
            ball.
          </p>
          <p>{`Once found, click the 'Set End Time' button to move on to the next step`}</p>
        </div>
      </div>
      <div className="buttonImage" onClick={onClick}>
        <img src={baseball} />
        <h3>SET END TIME</h3>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return state;
};

const mapDispatch = (dispatch) => {
  return {
    setEndTime: (time) => {
      console.log("set end time called");
      dispatch(setEndTime(time));
    },
  };
};

export default connect(mapState, mapDispatch)(SelectEndTime);
