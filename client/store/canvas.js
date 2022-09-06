//Initial State
const initialState = {
  canvasElement: null,
};

//Reducer
const canvas = (state = initialState, action) => {
  if (action.type === "SET_CANVAS_ELEMENT") {
    state = { ...state, canvasElement: action.canvasElement };
  }
  return state;
};

//Thunks

export const setCanvasElement = (canvasElement) => {
  return (dispatch) => {
    dispatch({ type: "SET_CANVAS_ELEMENT", canvasElement });
  };
};

export default canvas;
