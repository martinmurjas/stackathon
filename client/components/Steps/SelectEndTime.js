import React from "react";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import { setEndTime } from "../../store";
import "./SelectEndTime.css";

const SelectEndTime = ({ setEndTime, camera, setStep, step }) => {
  return (
    <div id="SelectEndTime">
      <h2>Set the end time of the analysis for the video</h2>
      <p>
        {`Use the video seek bar to find the moment the batter hits the ball and press the below "Select Time" button`}
      </p>
      <Button
        variant="contained"
        onClick={() => {
          setEndTime(camera.video.currentTime || 0);
          setStep(step + 1);
        }}
      >
        SELECT TIME
      </Button>
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
