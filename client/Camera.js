import { params } from "./params";
import * as posedetection from "@tensorflow-models/pose-detection";
import camera from "./store/camera";

export class Camera {
  constructor(Video, Canvas, startVideoTime, endVideoTime) {
    this.video = Video.videoElement;
    this.canvas = Canvas.canvasElement;
    this.source = Video.currentVideoSource;
    this.ctx = this.canvas.getContext("2d");
    const stream = this.canvas.captureStream();
    const options = { mimeType: "video/webm; codecs=vp9" };
    this.mediaRecorder = new MediaRecorder(stream, options);
    this.mediaRecorder.ondataavailable = this.handleDataAvailable;
    this.startVideoTime = startVideoTime;
    this.endVideoTime = endVideoTime;
  }

  drawCtx() {
    this.ctx.drawImage(
      this.video,
      0,
      0,
      // this.video.videoWidth,
      // this.video.videoHeight
      params.width,
      params.height
    );
  }

  clearCtx() {
    // this.ctx.clearRect(0, 0, this.video.videoWidth, this.video.videoHeight);
    this.ctx.clearRect(0, 0, params.width, params.height);
  }

  /**
   * Draw the keypoints and skeleton on the video.
   * @param poses A list of poses to render.
   */
  drawResults(poses) {
    for (const pose of poses) {
      this.drawResult(pose);
    }
  }

  /**
   * Draw the keypoints and skeleton on the video.
   * @param pose A pose with keypoints to render.
   */
  drawResult(pose) {
    if (pose.keypoints != null) {
      this.drawKeypoints(pose.keypoints);
      this.drawSkeleton(pose.keypoints);
    }
  }

  /**
   * Draw the keypoints on the video.
   * @param keypoints A list of keypoints.
   */
  drawKeypoints(keypoints) {
    const keypointInd = posedetection.util.getKeypointIndexBySide(params.model);
    this.ctx.fillStyle = "White";
    this.ctx.strokeStyle = "White";
    this.ctx.lineWidth = params.lineWidth;

    for (const i of keypointInd.middle) {
      this.drawKeypoint(keypoints[i]);
    }

    this.ctx.fillStyle = "Green";
    for (const i of keypointInd.left) {
      this.drawKeypoint(keypoints[i]);
    }

    this.ctx.fillStyle = "Orange";
    for (const i of keypointInd.right) {
      this.drawKeypoint(keypoints[i]);
    }
  }

  drawKeypoint(keypoint) {
    // If score is null, just show the keypoint.
    const score = keypoint.score != null ? keypoint.score : 1;
    const scoreThreshold = params.modelConfig.scoreThreshold || 0;

    if (score >= scoreThreshold) {
      const circle = new Path2D();
      circle.arc(
        params.xAdjustment * keypoint.x,
        params.yAdjustment * keypoint.y,
        params.radius,
        0,
        2 * Math.PI
      );
      this.ctx.fill(circle);
      this.ctx.stroke(circle);
    }
  }

  /**
   * Draw the skeleton of a body on the video.
   * @param keypoints A list of keypoints.
   */
  drawSkeleton(keypoints) {
    this.ctx.fillStyle = "White";
    this.ctx.strokeStyle = "White";
    this.ctx.lineWidth = params.lineWidth;

    posedetection.util.getAdjacentPairs(params.model).forEach(([i, j]) => {
      const kp1 = keypoints[i];
      const kp2 = keypoints[j];

      // If score is null, just show the keypoint.
      const score1 = kp1.score != null ? kp1.score : 1;
      const score2 = kp2.score != null ? kp2.score : 1;
      const scoreThreshold = params.modelConfig.scoreThreshold || 0;

      if (score1 >= scoreThreshold && score2 >= scoreThreshold) {
        this.ctx.beginPath();
        this.ctx.moveTo(params.xAdjustment * kp1.x, params.yAdjustment * kp1.y);
        this.ctx.lineTo(params.xAdjustment * kp2.x, params.yAdjustment * kp2.y);
        this.ctx.stroke();
      }
    });
  }

  start() {
    this.mediaRecorder.start();
  }

  stop() {
    this.mediaRecorder.stop();
  }

  handleDataAvailable(event) {
    if (event.data.size > 0) {
      const recordedChunks = [event.data];

      // Download.
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "pose.webm";
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }
}
