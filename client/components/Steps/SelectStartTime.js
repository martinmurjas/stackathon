import React from "react";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import { setStartTime } from "../../store";
import "./SelectStartTime.css";

const SelectStartTime = ({ setStartTime, camera, setStep, step }) => {
  const onClick = () => {
    setStep(step + 1);
    setStartTime(camera.video.currentTime || 0);
  };

  return (
    <div id="SelectStartTime">
      <h2>Set the start time of the analysis for the video</h2>
      <p>
        {`Use the video seek bar to find the time when the batter begins the swing
        and press the below "Select Time" button`}
      </p>
      <Button variant="contained" onClick={onClick}>
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
    setStartTime: (time) => {
      dispatch(setStartTime(time));
    },
  };
};

export default connect(mapState, mapDispatch)(SelectStartTime);
