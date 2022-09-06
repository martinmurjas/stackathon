//Initial State
const initialState = {
  initialKeypoints: null,
  finalKeypoints: null,
};

//Reducer
const poseKeypoints = (state = initialState, action) => {
  if (action.type === "SET_INITIAL_POSE_KEYPOINTS") {
    state = { ...state, initialKeypoints: action.keypoints };
  } else if (action.type === "SET_FINAL_POSE_KEYPOINTS") {
    state = { ...state, finalKeypoints: action.keypoints };
  }
  return state;
};

//Thunks
export const setKeypoints = (keypoints) => {
  return (dispatch, getState) => {
    const initialKeypoints = getState().poseKeypoints.initialKeypoints;
    // console.log(initialKeypoints);
    if (initialKeypoints) {
      dispatch({ type: "SET_FINAL_POSE_KEYPOINTS", keypoints });
    } else {
      dispatch({ type: "SET_INITIAL_POSE_KEYPOINTS", keypoints });
    }
  };
};

export default poseKeypoints;
