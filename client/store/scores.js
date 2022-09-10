//Initial State
const initialState = {
  totalScore: 0,
  frontLegEndOfSwingAngleScore: 0,
  initialLegSpreadAnglesScore: 0,
  swingHipRotationScore: 0,
  swingShoulderRotationScore: 0,
  handPlacementScore: 0,
  status: null,
};

//Reducer
// const scores = (state = initialState, action) => {
//   if (action.type === "SET_SCORES") {
//     state = { ...state, test: action.works };
//   }
//   return state;
// };
export default function (state = initialState, action) {
  if (action.type === "SET_SCORES") {
    state = {
      ...state,
      totalScore: action.totalScore,
      frontLegEndOfSwingAngleScore: action.frontLegEndOfSwingAngleScore,
      initialLegSpreadAnglesScore: action.initialLegSpreadAnglesScore,
      swingHipRotationScore: action.swingHipRotationScore,
      swingShoulderRotationScore: action.swingShoulderRotationScore,
      handPlacementScore: action.handPlacementScore,
      status: "completed",
    };
  }
  return state;
}

//Thunks
export const setScores = (
  totalScore,
  frontLegEndOfSwingAngleScore,
  initialLegSpreadAnglesScore,
  swingHipRotationScore,
  swingShoulderRotationScore,
  handPlacementScore
) => {
  return (dispatch) => {
    console.log(handPlacementScore);
    dispatch({
      type: "SET_SCORES",
      totalScore: totalScore,
      frontLegEndOfSwingAngleScore: frontLegEndOfSwingAngleScore,
      initialLegSpreadAnglesScore: initialLegSpreadAnglesScore,
      swingHipRotationScore: swingHipRotationScore,
      swingShoulderRotationScore: swingShoulderRotationScore,
      handPlacementScore: handPlacementScore,
    });
  };
};
