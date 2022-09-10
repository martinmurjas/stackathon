import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import * as tf from "@tensorflow/tfjs-core";
import Button from "@mui/material/Button";
import { params } from "../../params";
import { setKeypoints, setScores } from "../../store";
import store from "../../store";
import baseball from "../../../public/baseball.png";
import bat from "../../../public/baseball_bat.png";
import { analyzeSwing } from "../../swingAnalysis";

import "./RunAnalysis.css";
// import { analyzeSwing } from "../../swingAnalysis";

const RunAnalysis = ({
  camera,
  detector,
  setKeypoints,
  video,
  poseKeypoints,
  setScores,
  scores,
}) => {
  const [status, setStatus] = useState("notStarted");
  const [side, setSide] = useState("");
  // const [score, setScore] = useState(0);

  const calculateScore = () => {
    const initialKeypoints = store.getState().poseKeypoints.initialKeypoints;
    const finalKeypoints = store.getState().poseKeypoints.finalKeypoints;

    const scores = analyzeSwing(initialKeypoints, finalKeypoints, side);
    console.log(scores);
    setScores(...scores);
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
    if (store.getState().scores.status) {
      return;
    }
    // if (camera.video.paused) {
    //   // camera.mediaRecorder.stop();
    //   // camera.clearCtx();
    //   // camera.video.style.visibility = "visible";
    //   return;
    // }
    if (camera.video.currentTime >= video.videoEndTime) {
      camera.video.pause();
      // camera.video.currentTime = video.videoStartTime;
      if (store.getState().poseKeypoints.finalKeypoints) {
        calculateScore();
        setStatus("completed");
      } else {
        await renderResult();
        requestAnimationFrame(runFrame);
      }

      //await renderResult();
      // return;
    }

    await renderResult();
    // const rafId = requestAnimationFrame(runFrame);
    requestAnimationFrame(runFrame);

    // runFrame();
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
      {side ? (
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
              : scores.totalScore.toFixed(2)}
          </h3>
        </div>
      ) : (
        <div className="sideSelection">
          <div
            onClick={() => {
              setSide("left");
            }}
          >
            <img src={bat} />
            <h3 className="left">Left</h3>
          </div>
          <div
            onClick={() => {
              setSide("right");
            }}
          >
            <img src={bat} className="right" />
            <h3>Right</h3>
          </div>
        </div>
      )}
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
    setScores: (
      totalScore,
      frontLegEndOfSwingAngleScore,
      initialLegSpreadAnglesScore,
      swingHipRotationScore,
      swingShoulderRotationScore,
      handPlacementScore
    ) => {
      dispatch(
        setScores(
          totalScore,
          frontLegEndOfSwingAngleScore,
          initialLegSpreadAnglesScore,
          swingHipRotationScore,
          swingShoulderRotationScore,
          handPlacementScore
        )
      );
    },
  };
};

export default connect(mapState, mapDispatch)(RunAnalysis);
