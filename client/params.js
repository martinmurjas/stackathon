import * as posedetection from "@tensorflow-models/pose-detection";

export const params = {
  lineWidth: 2,
  radius: 2,
  model: posedetection.SupportedModels.MoveNet,
  modelType: posedetection.movenet.modelType.SINGLEPOSE_THUNDER,
  modelConfig: {
    scoreThreshold: 0.3,
    maxPoses: 1,
  },
  width: 480,
  height: 320,
};
