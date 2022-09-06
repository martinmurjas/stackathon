//Initial State
const initialState = {
  uploadedFile: null,
  videoElement: null,
  currentVideoSource: null,
  videoStartTime: 0,
  videoEndTime: 0,
};

//Reducer
const video = (state = initialState, action) => {
  if (action.type === "SET_UPLOADED_FILE") {
    state = { ...state, uploadedFile: action.file };
  } else if (action.type === "SET_VIDEO_ELEMENT") {
    state = { ...state, videoElement: action.videoElement };
  } else if (action.type === "SET_CURRENT_VIDEO_SOURCE") {
    state = { ...state, currentVideoSource: action.currentVideoSource };
  } else if (action.type === "SET_START_TIME") {
    state = { ...state, videoStartTime: action.time };
  } else if (action.type === "SET_END_TIME") {
    state = { ...state, videoEndTime: action.time };
  }
  return state;
};

//Thunks
export const setUploadedFile = (file) => {
  return (dispatch) => {
    dispatch({ type: "SET_UPLOADED_FILE", file });
  };
};

export const setVideoElement = (videoElement) => {
  return (dispatch) => {
    dispatch({ type: "SET_VIDEO_ELEMENT", videoElement });
  };
};

export const setCurrentVideoSource = (currentVideoSource) => {
  return (dispatch) => {
    dispatch({ type: "SET_CURRENT_VIDEO_SOURCE", currentVideoSource });
  };
};

export const setStartTime = (time) => {
  return (dispatch) => {
    dispatch({ type: "SET_START_TIME", time });
  };
};

export const setEndTime = (time) => {
  return (dispatch) => {
    dispatch({ type: "SET_END_TIME", time });
  };
};

export default video;
