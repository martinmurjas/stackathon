import React, { useRef, useEffect } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-backend-webgl";
import "./Canvas.css";
import { connect } from "react-redux";
import {
  setVideoElement,
  setCanvasElement,
  setCurrentVideoSource,
} from "../store";

const Canvas = (props) => {
  const videoElem = useRef(null);
  const canvasElem = useRef(null);
  const currentVideoSrc = useRef(null);

  useEffect(() => {
    const videoElement = videoElem.current;
    if (videoElement) {
      props.setVideoElement(videoElement);
    }
  }, [videoElem]);

  useEffect(() => {
    const canvasElement = canvasElem.current;
    if (canvasElement) {
      props.setCanvasElement(canvasElement);
    }
  }, [canvasElem]);

  useEffect(() => {
    const currentVideoSource = currentVideoSrc.current;
    if (currentVideoSource) {
      props.setCurrentVideoSource(currentVideoSource);
    }
  }, [currentVideoSrc]);

  return (
    <div id="canvas-wrapper">
      <canvas
        id="output"
        ref={canvasElem}
        style={{ visibility: "hidden" }}
      ></canvas>
      <video
        id="video"
        ref={videoElem}
        controls
        loop
        style={{ visibility: "hidden" }}
      >
        <source id="currentVID" src="" type="video/mp4" ref={currentVideoSrc} />
      </video>
    </div>
  );
};

const mapState = (state) => {
  return state;
};

const mapDispatch = (dispatch) => {
  return {
    setVideoElement: (videoElement) => {
      dispatch(setVideoElement(videoElement));
    },
    setCanvasElement: (canvasElement) => {
      dispatch(setCanvasElement(canvasElement));
    },
    setCurrentVideoSource: (currentVideoSource) => {
      dispatch(setCurrentVideoSource(currentVideoSource));
    },
  };
};

export default connect(mapState, mapDispatch)(Canvas);

//p5 imports
// import Sketch from "react-p5";
// import * as tf from "@tensorflow/tfjs-core";
// import { fill, image } from "@tensorflow/tfjs-core";

//Code use p5 which I don't plan on using so I can use video inputs instead
// const Canvas = () => {
//   let detector;
//   let poses;
//   let video;

//   async function init() {
//     // const detectorConfig = {
//     //   modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
//     // };
//     const detectorConfig = {
//       modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
//     };
//     detector = await poseDetection.createDetector(
//       poseDetection.SupportedModels.MoveNet,
//       detectorConfig
//     );
//   }

//   const videoReady = async () => {
//     console.log("video ready");
//     await getPoses();
//   };

//   const setup = async (p5, canvasParentRef) => {
//     p5.createCanvas(640, 480).parent(canvasParentRef);
//     video = p5.createCapture(p5.VIDEO, videoReady);
//     video.size(640, 480);
//     video.hide();
//     await init();
//   };

//   const getPoses = async () => {
//     poses = await detector.estimatePoses(video.elt);
//     // console.log(poses);
//     setTimeout(getPoses, 1);
//   };

//   const draw = (p5) => {
//     p5.background(255, 130, 20);
//     p5.image(video, 0, 0);
//     if (poses && poses.length > 0) {
//       for (let kp of poses[0].keypoints) {
//         const { x, y, score } = kp;
//         if (score > 0.5) {
//           p5.fill(255, 0, 0);
//           p5.stroke(255);
//           p5.strokeWeight(2);
//           p5.circle(x, y, 12);
//         }
//       }

//       // p5.fill(255, 0, 0);
//       // p5.ellipse(x, y, 20, 20);
//     }

//     // p5.ellipse(100, 100, 100);
//     // p5.ellipse(400, 100, 100);
//   };

//   return <Sketch setup={setup} draw={draw} />;
// };

//export default Canvas;
