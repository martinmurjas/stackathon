import React from "react";
import { connect } from "react-redux";
import { FileUploader } from "react-drag-drop-files";
import { params } from "../../params";
import "./UploadVideo.css";

const UploadVideo = ({ step, setStep, camera }) => {
  const fileTypes = ["MP4"];

  const onUpload = async (uploadedfile) => {
    console.log(uploadedfile);
    URL.revokeObjectURL(camera.video.currentSrc);
    const file = uploadedfile;
    camera.source.src = URL.createObjectURL(file);

    camera.video.load();

    await new Promise((resolve) => {
      camera.video.onloadeddata = () => {
        resolve(camera.video);
      };
    });

    // const videoWidth = camera.video.videoWidth;
    // const videoHeight = camera.video.videoHeight;

    const aspectRatio = camera.video.videoWidth / camera.video.videoHeight;

    params.aspectRatio = aspectRatio;
    params.width = aspectRatio >= 1 ? 640 : (640 * aspectRatio).toFixed(0);
    params.height = aspectRatio >= 1 ? (640 / aspectRatio).toFixed(0) : 640;

    console.log(params.width / camera.video.videoWidth);

    params.xAdjustment = params.width / camera.video.videoWidth;
    params.yAdjustment = params.height / camera.video.videoHeight;

    console.log(params);

    const videoWidth = params.width;
    const videoHeight = params.height;
    camera.video.width = videoWidth;
    camera.video.height = videoHeight;
    camera.canvas.width = videoWidth;
    camera.canvas.height = videoHeight;

    camera.video.style.visibility = "visible";

    setStep(step + 1);
  };

  return (
    <div id="UploadVideo">
      <h1>
        <span>Step 1</span>: Upload Video For Analysis
      </h1>
      <div className="stepMain">
        <div className="instructions">
          <h3>Instructions</h3>
          <p>
            Drag and drop the video you would like to analyze into the box below
            or click on the box to select the video.
          </p>
          <p>The video must be in mp4 format</p>
        </div>

        <FileUploader
          handleChange={onUpload}
          name="video"
          types={fileTypes}
          id="videoFile"
        />
      </div>
    </div>
  );
};

const mapState = (state) => {
  return state;
};

export default connect(mapState)(UploadVideo);

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
