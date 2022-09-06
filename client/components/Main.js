import React, { useEffect } from "react";
import { connect } from "react-redux";
// import * as posedetection from "@tensorflow-models/pose-detection";
// import { params } from "../params";
import { createDetector, createCamera } from "../store";

import Canvas from "./Canvas";
import VideoControls from "./VideoControls";

const Main = ({ video, canvas, createDetector, createCamera }) => {
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
    <div>
      <VideoControls />
      <Canvas />
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
