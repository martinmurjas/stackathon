import React from "react";
import { connect } from "react-redux";
// import video from "../store/video";
import * as tf from "@tensorflow/tfjs-core";
import "./VideoControls.css";
import { params } from "../params";
import { setKeypoints, setStartTime, setEndTime } from "../store";

import store from "../store";
import canvas from "../store/canvas";

const VideoControls = ({
  camera,
  detector,
  setKeypoints,
  setStartTime,
  setEndTime,
  video,
}) => {
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

    camera.video.style.visibility = "hidden";
    camera.canvas.style.visibility = "visible";

    console.log("onRun worked until hidden");
    camera.video.pause();
    camera.video.currentTime = video.videoStartTime;
    camera.video.play();
    // camera.mediaRecorder.start();

    await new Promise((resolve) => {
      camera.video.onseeked = () => {
        resolve(camera.video);
      };
    });

    await runFrame();
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
    const rafId = requestAnimationFrame(runFrame);
  };

  return (
    <div id="VideoControls">
      <nav></nav>
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

export default connect(mapState, mapDispatch)(VideoControls);

// const onUpload = async (ev) => {
// 	// console.log(ev.target.files[0]);
// 	URL.revokeObjectURL(camera.video.currentSrc);
// 	const file = event.target.files[0];
// 	camera.source.src = URL.createObjectURL(file);

// 	camera.video.load();
// 	camera.video.style.visibility = "visible";
// 	await new Promise((resolve) => {
// 		camera.video.onloadeddata = () => {
// 			resolve(camera.video);
// 		};
// 	});

// 	const videoWidth = camera.video.videoWidth;
// 	const videoHeight = camera.video.videoHeight;
// 	// Must set below two lines, otherwise video element doesn't show.
// 	camera.video.width = videoWidth;
// 	camera.video.height = videoHeight;
// 	camera.canvas.width = videoWidth;
// 	camera.canvas.height = videoHeight;
// 	// camera.video.width = 480;
// 	// camera.video.height = 320;
// 	// camera.canvas.width = 480;
// 	// camera.canvas.height = 320;

// 	//statusElement.innerHTML = 'Video is loaded.';
// };

// <label htmlFor="videoFile">Upload a video file</label>
// <input
// 	type="file"
// 	id="videoFile"
// 	name="video"
// 	accept="video/*"
// 	onInput={(ev) => {
// 		onUpload(ev);
// 	}}
// />
