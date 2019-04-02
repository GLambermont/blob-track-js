import { imageDataToPixelData, distanceSquared } from '../helpers';

const trackingLoop = (
  ctx,
  video,
  trackHandler
) => {
  // Get data from frame
  const frameData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  const pixelData = imageDataToPixelData(frameData.data);
  let trackingData = {
    distance: 999999999,
    x: 0,
    y: 0
  };

  ctx.drawImage(video, 0, 0, ctx.canvas.width, ctx.canvas.height);

  // Loop over pixels and compare each pixel color
  pixelData.forEach((pixel, pixelIndex) => {
    const distance = distanceSquared([pixel[0], pixel[1], pixel[2]], [0, 0, 0]);

    // Update tracking data if better match has been found
    // The lower the distance, the better the match
    if (distance < trackingData.distance) {
      trackingData = {
        distance,
        x: pixelIndex % ctx.canvas.width,
        y: Math.floor(pixelIndex / ctx.canvas.height)
      }
    }

    // n = y * w + x
  });

  // Execute tracking handler
  trackHandler(trackingData);

  requestAnimationFrame(() => trackingLoop(ctx, video, trackHandler));
};

const track = (video, trackHandler) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  trackingLoop(ctx, video, trackHandler)
};

export { track };