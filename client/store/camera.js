// import * as posedetection from "@tensorflow-models/pose-detection";
// import { params } from "../params";
import { Camera } from "../Camera";

//Reducer
export default function (state = {}, action) {
  if (action.type === "SET_CAMERA") {
    return action.camera;
  } else {
    return state;
  }
}

//Thunks
export const createCamera = (video, canvas) => {
  return async (dispatch) => {
    const camera = new Camera(video, canvas);
    dispatch({ type: "SET_CAMERA", camera });
  };
};
