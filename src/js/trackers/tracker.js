import { distanceSquared } from '../helpers';

const trackingLoop = (
  ctx,
  video,
  trackHandler
) => {
  const videoWidth = video.videoWidth;
  const videoHeight = video.videoHeight;
  const imageData = ctx.getImageData(0, 0, videoWidth, videoHeight).data;

  let trackingData = {
    color: [0, 0, 0],
    distance: 0,
    x: 0,
    y: 0
  };

  ctx.drawImage(video, 0, 0, videoWidth, videoHeight);

  // Loop over pixels and compare each pixel it's color
  for(let i=0; i<imageData.length; i+=4) {
    const pixelIndex = i / 4;
    const pixelColor = [imageData[i], imageData[i+1], imageData[i+2]];
    const distance = -distanceSquared([pixelColor[0], pixelColor[1], pixelColor[2]], [255, 0, 0]);

    // Check if color is the best color match found
    if (distance > trackingData.distance) trackingData = {
      color: pixelColor,
      distance,
      x: pixelIndex % videoWidth,
      y: Math.floor(pixelIndex / videoWidth)
    }
  }

  // Execute tracking handler
  trackHandler(trackingData);

  requestAnimationFrame(() => trackingLoop(ctx, video, trackHandler));
};

const track = (video, trackHandler) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Set the canvas scaling to the same size as the video
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // Start the loop to track each frame
  trackingLoop(ctx, video, trackHandler)
};

export { track };