import React, { useState } from "react";
import { connect } from "react-redux";
import * as tf from "@tensorflow/tfjs-core";
import Button from "@mui/material/Button";
import { params } from "../../params";
import { setKeypoints } from "../../store";
import store from "../../store";
import baseball from "../../../public/baseball.png";

import "./RunAnalysis.css";

const RunAnalysis = ({
  camera,
  detector,
  setKeypoints,
  video,
  poseKeypoints,
}) => {
  const [status, setStatus] = useState("notStarted");
  const [score, setScore] = useState(0);

  const calculateScore = () => {
    const finalKeypoints = store.getState().poseKeypoints.finalKeypoints;
    console.log(finalKeypoints);

    //Front Leg Final Pose Analysis
    const frontAnkleX = finalKeypoints[15].x;
    const frontAnkleY = finalKeypoints[15].y;
    const frontKneeX = finalKeypoints[13].x;
    const frontKneeY = finalKeypoints[13].y;
    const frontHipX = finalKeypoints[11].x;
    const frontHipY = finalKeypoints[11].y;

    const frontAnkleToKneeAngle =
      Math.atan((frontAnkleY - frontKneeY) / (frontAnkleX - frontKneeX)) *
      (180 / Math.PI);
    console.log(frontAnkleToKneeAngle);

    const frontKneeToHipAngle =
      Math.atan((frontKneeY - frontHipY) / (frontKneeX - frontHipX)) *
      (180 / Math.PI);
    console.log(frontKneeToHipAngle);

    //Back Leg Final Pose Analysis
    const backAnkleX = finalKeypoints[16].x;
    const backAnkleY = finalKeypoints[16].y;
    const backKneeX = finalKeypoints[14].x;
    const backKneeY = finalKeypoints[14].y;
    const backHipX = finalKeypoints[12].x;
    const backHipY = finalKeypoints[12].y;

    const backAnkleToKneeAngle =
      Math.atan((backAnkleY - backKneeY) / (backAnkleX - backKneeX)) *
      (180 / Math.PI);
    console.log(backAnkleToKneeAngle);

    const backKneeToHipAngle =
      Math.atan((backKneeY - backHipY) / (backKneeX - backHipX)) *
      (180 / Math.PI);
    console.log(backKneeToHipAngle);
  };

  const onRun = async () => {
    const warmUpTensor = tf.fill(
      // [camera.video.height, camera.video.width, 3],
      [params.height, params.width, 3],
      0,
      "float32"
    );
    await detector.estimatePoses(warmUpTensor, {
      maxPoses: 1,
      flipHorizontal: false,
    });
    warmUpTensor.dispose();

    camera.canvas.style.visibility = "visible";

    console.log("onRun worked until hidden");
    camera.video.pause();
    camera.video.currentTime = video.videoStartTime;
    camera.video.play();
    // camera.mediaRecorder.start();

    camera.video.style.visibility = "hidden";

    await new Promise((resolve) => {
      camera.video.onseeked = () => {
        resolve(camera.video);
      };
    });

    await runFrame();
  };

  const runFrame = async () => {
    if (camera.video.paused) {
      // camera.mediaRecorder.stop();
      // camera.clearCtx();
      // camera.video.style.visibility = "visible";
      return;
    }
    if (camera.video.currentTime >= video.videoEndTime) {
      // camera.video.pause();
      camera.video.currentTime = video.videoStartTime;
      calculateScore();
      setStatus("completed");
      //await renderResult();
      // return;
    }

    await renderResult();
    // const rafId = requestAnimationFrame(runFrame);
    requestAnimationFrame(runFrame);
  };

  const renderResult = async () => {
    // FPS only counts the time it takes to finish estimatePoses.

    const poses = await detector.estimatePoses(camera.video, {
      maxPoses: params.modelConfig.maxPoses,
      flipHorizontal: false,
    });

    const { keypoints } = poses[0];

    const poseKeypoints = store.getState().poseKeypoints;

    if (!poseKeypoints.initialKeypoints) {
      setKeypoints(keypoints);
    }

    if (
      camera.video.currentTime >= video.videoEndTime &&
      !poseKeypoints.finalKeypoints
    ) {
      setKeypoints(keypoints);
    }

    camera.drawCtx();

    // The null check makes sure the UI is not in the middle of changing to a
    // different model. If during model change, the result is from an old
    // model, which shouldn't be rendered.
    if (poses.length > 0) {
      camera.drawResults(poses);
    }
  };

  return (
    <div id="RunAnalysis">
      <h1>
        <span>Step 4</span>: Run Analysis
      </h1>
      <div className="stepMain">
        <div className="instructions">
          <h3>Instructions</h3>
          <p>{`Click the 'Start' button below to begin the swing analysis`}</p>
        </div>
      </div>
      <div
        className={
          status === "notStarted"
            ? "buttonImage"
            : status === "loading"
            ? "analysisLoading"
            : "analysisCompleted"
        }
        onClick={() => {
          if (status === "notStarted") {
            setStatus("loading");
            onRun();
          } else {
            return;
          }
        }}
      >
        <img src={baseball} />
        <h3>
          {status === "notStarted"
            ? "START"
            : status === "loading"
            ? "LOADING"
            : "SCORE"}
        </h3>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return state;
};

const mapDispatch = (dispatch) => {
  return {
    setKeypoints: (keypoints) => {
      dispatch(setKeypoints(keypoints));
    },
  };
};

export default connect(mapState, mapDispatch)(RunAnalysis);
