import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
// import * as posedetection from "@tensorflow-models/pose-detection";
// import { params } from "../params";
import { createDetector, createCamera } from "../store";
import UploadVideo from "./Steps/UploadVideo";
import SelectStartTime from "./Steps/SelectStartTime";
import SelectEndTime from "./Steps/SelectEndTime";
import RunAnalysis from "./Steps/RunAnalysis";
import grassBackground from "../../public/grassBackground.jpg";

import Canvas from "./Canvas";

import "./Main.css";

const Main = ({ video, canvas, createDetector, createCamera }) => {
  const [step, setStep] = useState(1);

  console.log(step);

  useEffect(() => {
    createDetector();
  }, []);

  useEffect(() => {
    if (
      video.videoElement &&
      canvas.canvasElement &&
      video.currentVideoSource
    ) {
      createCamera(video, canvas);
    }
  }, [video.videoElement, canvas]);

  return (
    <div id="Main" style={{ backgroundImage: `url(${grassBackground})` }}>
      <div>
        {step === 1 ? <UploadVideo step={step} setStep={setStep} /> : null}
        {step === 2 ? <SelectStartTime step={step} setStep={setStep} /> : null}
        {step === 3 ? <SelectEndTime step={step} setStep={setStep} /> : null}
        {step === 4 ? <RunAnalysis step={step} setStep={setStep} /> : null}
        <Canvas />
      </div>
    </div>
  );
};

const mapState = (state) => {
  return state;
};

const mapDispatch = (dispatch) => {
  return {
    createDetector: () => {
      dispatch(createDetector());
    },
    createCamera: (video, canvas) => {
      dispatch(createCamera(video, canvas));
    },
  };
};

export default connect(mapState, mapDispatch)(Main);
