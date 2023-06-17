# Barrel It Up

Barrel It Up is a web application that utilizes pose estimation technology to provide feedback on the mechanics of a baseball or softball swing. Users can upload a video of themselves taking a swing, and the application uses TensorFlow's MoveNet models to determine the position of 17 keypoints (joints or body parts) in the video. Based on this analysis, the application provides feedback on various aspects of the swing, such as posture, balance, and hip rotation. This can help users identify areas for improvement and make adjustments to their technique.

## Features

- Allows users to upload a video of their baseball or softball swing
- Analyzes the swing using pose estimation
- Measures the key body points through the swing to measure mechanics
- Provides feedback based on fundamentals vs analyszed mechanics, such as posture and balance

## Technologies Used

- TensorFlow
- Pose Estimation (MoveNet) models
- Canvas

## Installation

1. Clone the repository: `git clone https://github.com/martinmurjas/barrel-it-up.git`
2. Install the required dependencies: `npm install`
3. Start the application: `npm run start`

## Usage

1. Upload a video of yourself taking a baseball or softball swing
2. Scroll through the video until the point of the beginning of the swing (as the leading foot touches the ground following the leg kick). Select this as the starting point
3. Similarly, find the point in the video where the bat makes contact with the ball and select this as the ending point
4. Choose which side of the plate you are taking the swing from (right or left)
5. Click start to begin the analysis

![BarrelItUpSample](https://user-images.githubusercontent.com/29100253/236710153-a9b18e0b-0701-4cf2-956d-d3f5fd99ee48.gif)
