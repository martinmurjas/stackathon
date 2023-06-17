import { createStore, combineReducers, applyMiddleware } from "redux";
// import { createLogger } from "redux-logger";
import { logger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import video from "./video";
import canvas from "./canvas";
import detector from "./detector";
import camera from "./camera";
import poseKeypoints from "./poseKeypoints";
import scores from "./scores";

const reducer = combineReducers({
  video,
  canvas,
  detector,
  camera,
  poseKeypoints,
  scores,
});
const middleware = applyMiddleware(thunkMiddleware, logger);
const store = createStore(reducer, middleware);

export default store;
export * from "./video";
export * from "./canvas";
export * from "./detector";
export * from "./camera";
export * from "./poseKeypoints";
export * from "./scores";
