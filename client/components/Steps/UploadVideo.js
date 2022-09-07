import React from "react";
import { connect } from "react-redux";
import { FileUploader } from "react-drag-drop-files";
import "./UploadVideo.css";

const UploadVideo = ({ step, setStep, camera }) => {
  const fileTypes = ["MP4"];

  const onUpload = async (uploadedfile) => {
    URL.revokeObjectURL(camera.video.currentSrc);
    const file = uploadedfile;
    camera.source.src = URL.createObjectURL(file);

    camera.video.load();

    await new Promise((resolve) => {
      camera.video.onloadeddata = () => {
        resolve(camera.video);
      };
    });

    const videoWidth = camera.video.videoWidth;
    const videoHeight = camera.video.videoHeight;
    camera.video.width = videoWidth;
    camera.video.height = videoHeight;
    camera.canvas.width = videoWidth;
    camera.canvas.height = videoHeight;

    camera.video.style.visibility = "visible";

    setStep(step + 1);
  };

  return (
    <div id="UploadVideo">
      <h2>Select a video for analysis below</h2>
      <p>Selected video should be in mp4 format</p>
      <FileUploader
        handleChange={onUpload}
        name="video"
        types={fileTypes}
        id="videoFile"
      />
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
