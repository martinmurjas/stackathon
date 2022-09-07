import React from "react";
import { connect } from "react-redux";
import * as tf from "@tensorflow/tfjs-core";
import Button from "@mui/material/Button";
import { params } from "../../params";
import { setKeypoints } from "../../store";
import store from "../../store";

const RunAnalysis = ({ camera, detector, setKeypoints, video }) => {
  const onRun = async () => {
    const warmUpTensor = tf.fill(
      [camera.video.height, camera.video.width, 3],
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
      camera.video.pause();
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
    <div>
      <h2>{`Press the "RUN" button to begin the swing analysis`}</h2>
      <Button variant="contained" onClick={onRun}>
        RUN
      </Button>
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
