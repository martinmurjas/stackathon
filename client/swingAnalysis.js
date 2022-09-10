export const analyzeSwing = (initialKeypoints, finalKeypoints, side) => {
  const initialPoints = {};
  const finalPoints = {};

  initialKeypoints.map((keypoint) => {
    initialPoints[keypoint.name] = {
      x: keypoint.x,
      y: keypoint.y,
    };
  });

  finalKeypoints.map((keypoint) => {
    finalPoints[keypoint.name] = {
      x: keypoint.x,
      y: keypoint.y,
    };
  });

  const frontLegEndOfSwingAngleScore = analyzeFrontLegEndOfSwing(
    finalPoints,
    side
  );

  const initialLegSpreadAnglesScore =
    analyzeInitialLegSpreadAngles(initialPoints);

  const swingHipRotationScore = analyzeSwingHipRotation(
    initialPoints,
    finalPoints
  );

  const swingShoulderRotationScore = analyzeSwingShoulderRotation(
    initialPoints,
    finalPoints
  );

  const handPlacementScore = analyzeHandPlacement(finalPoints, side);

  const backLegEndOfSwingScore = analyzeBackLegEndOfSwing(finalPoints, side);

  const scores = [
    frontLegEndOfSwingAngleScore,
    initialLegSpreadAnglesScore,
    swingHipRotationScore,
    swingShoulderRotationScore,
    handPlacementScore ? handPlacementScore : undefined,
  ];

  const totalScore =
    scores.reduce((accum, curr) => {
      if (curr !== undefined) {
        return accum + curr;
      } else return accum;
    }, 0) / scores.filter((score) => score !== undefined).length;

  return [totalScore, ...scores];
};

const analyzeFrontLegEndOfSwing = (finalPoints, side) => {
  let ankleToKneeAngle;
  let kneeToHipAngle;
  if (side === "right") {
    ankleToKneeAngle =
      Math.atan(
        (finalPoints.left_ankle.y - finalPoints.left_knee.y) /
          (finalPoints.left_ankle.x - finalPoints.left_knee.x)
      ) *
      (180 / Math.PI);
  } else {
    ankleToKneeAngle =
      Math.atan(
        (finalPoints.right_ankle.y - finalPoints.right_knee.y) /
          (finalPoints.right_ankle.x - finalPoints.right_knee.x)
      ) *
      (180 / Math.PI) *
      -1;
  }

  if (side === "right") {
    kneeToHipAngle =
      Math.atan(
        (finalPoints.left_knee.y - finalPoints.left_hip.y) /
          (finalPoints.left_knee.x - finalPoints.left_hip.x)
      ) *
      (180 / Math.PI);
  } else {
    kneeToHipAngle =
      Math.atan(
        (finalPoints.right_knee.y - finalPoints.right_hip.y) /
          (finalPoints.right_knee.x - finalPoints.right_hip.x)
      ) *
      (180 / Math.PI) *
      -1;
  }

  console.log(ankleToKneeAngle);
  console.log(kneeToHipAngle);

  if (ankleToKneeAngle > kneeToHipAngle) {
    //Front leg should be straight as body weight should be pushed off on this leg.
    //If knees are bent, angle of bend is deducted from score of 100
    //Dividing by 90 as a 90 degree angle bend will be considered worst case scenario
    return 100 - ((ankleToKneeAngle - kneeToHipAngle) / 90) * 100;
  } else {
    return 100;
  }
};

const analyzeInitialLegSpreadAngles = (initialPoints) => {
  let leftLegAngle;
  let rightLegAngle;

  leftLegAngle = Math.abs(
    Math.atan(
      (initialPoints.left_hip.y - initialPoints.left_ankle.y) /
        (initialPoints.left_hip.x - initialPoints.left_ankle.x)
    ) *
      (180 / Math.PI)
  );

  rightLegAngle = Math.abs(
    Math.atan(
      (initialPoints.right_hip.y - initialPoints.right_ankle.y) /
        (initialPoints.right_hip.x - initialPoints.right_ankle.x)
    ) *
      (180 / Math.PI)
  );

  return (
    100 -
    ((Math.abs(leftLegAngle - 60) + Math.abs(rightLegAngle - 60)) / 2) *
      (100 / 30)
  );
};

const analyzeSwingHipRotation = (initialPoints, finalPoints) => {
  const initialHipDiff = initialPoints.left_hip.x - initialPoints.right_hip.x;
  const finalHipDiff = finalPoints.left_hip.x - finalPoints.right_hip.x;

  const finalHipPercentage = (finalHipDiff / initialHipDiff) * 100;

  if (finalHipPercentage > 50) {
    return 100 - (finalHipPercentage - 50) * 2;
  } else {
    return 100;
  }
};

const analyzeSwingShoulderRotation = (initialPoints, finalPoints) => {
  const initialShoulderDiff =
    initialPoints.left_shoulder.x - initialPoints.right_shoulder.x;
  const finalShoulderDiff =
    finalPoints.left_shoulder.x - finalPoints.right_shoulder.x;

  const finalShoulderPercentage =
    (finalShoulderDiff / initialShoulderDiff) * 100;

  if (finalShoulderPercentage > 50) {
    return 100 - (finalShoulderPercentage - 50) * 2;
  } else {
    return 100;
  }
};

const analyzeHandPlacement = (finalPoints, side) => {
  const rightWrist = finalPoints.right_wrist.y;
  const leftWrist = finalPoints.left_wrist.y;

  if (side === "right") {
    return rightWrist > leftWrist ? 100 : 0;
  } else {
    return leftWrist > rightWrist ? 100 : 0;
  }
};

const analyzeBackLegEndOfSwing = (finalPoints, side) => {};
