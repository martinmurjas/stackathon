import React from "react";
import { connect } from "react-redux";
import { setStartTime } from "../../store";
import baseball from "../../../public/baseball.png";
import Canvas from "./../Canvas";

import "./SelectStartTime.css";

const SelectStartTime = ({ setStartTime, camera, setStep, step }) => {
  const onClick = () => {
    setStep(step + 1);
    setStartTime(camera.video.currentTime || 0);
  };

  return (
    <div id="SelectStartTime">
      <h1>
        <span>Step 2</span>: Set Analysis Start Time
      </h1>
      <div className="stepMain">
        <div className="instructions">
          <h3>Instructions</h3>
          <p>
            Use the video seek bar to find the moment that the batter begins the
            swing. This should be at the end of the stride when the batters
            front foot is planted into the ground.
          </p>
          <p>{`Once found, click the 'Set Start Time' button to move on to the next step`}</p>
        </div>
      </div>
      <div className="buttonImage" onClick={onClick}>
        <img src={baseball} />
        <h3>SET START TIME</h3>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return state;
};

const mapDispatch = (dispatch) => {
  return {
    setStartTime: (time) => {
      dispatch(setStartTime(time));
    },
  };
};

export default connect(mapState, mapDispatch)(SelectStartTime);

// <div>
//   <h2>Set the start time of the analysis for the video</h2>
//   <p>
//     {`Use the video seek bar to find the time when the batter begins the swing
//   and press the below "Select Time" button`}
//   </p>
//   <Button variant="contained" onClick={onClick}>
//     SELECT TIME
//   </Button>
// </div>
