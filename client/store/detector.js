import * as posedetection from "@tensorflow-models/pose-detection";
import { params } from "../params";

//Reducer
export default function (state = {}, action) {
  if (action.type === "SET_DETECTOR") {
    return action.detector;
  } else {
    return state;
  }
}

//Thunks
export const createDetector = () => {
  return async (dispatch) => {
    const detector = await posedetection.createDetector(params.model, {
      modelType: params.modelType,
    });
    dispatch({ type: "SET_DETECTOR", detector });
  };
};
