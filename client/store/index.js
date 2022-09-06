import { createStore, combineReducers, applyMiddleware } from "redux";
// import { createLogger } from "redux-logger";
import { logger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import auth from "./auth";
import video from "./video";
import canvas from "./canvas";
import detector from "./detector";
import camera from "./camera";
import poseKeypoints from "./poseKeypoints";

const reducer = combineReducers({
  auth,
  video,
  canvas,
  detector,
  camera,
  poseKeypoints,
});
const middleware = applyMiddleware(thunkMiddleware, logger);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
export * from "./video";
export * from "./canvas";
export * from "./detector";
export * from "./camera";
export * from "./poseKeypoints";
