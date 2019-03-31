import { imageDataToPixelData, distanceSquared } from '../helpers';

class Tracker {
  constructor({ 
    video = null, 
    trackHandler = () => {} 
  } = {}) {
    this._canvas = document.createElement('canvas');
    this._ctx = this._canvas.getContext('2d');
    this._videoSrc = video;
    this.trackHandler = trackHandler;
    this.trackingData = {
      distance: 0,
      x: 0,
      y: 0,
    };
  }

  set video(video) {
    this._videoSrc = video;
    this._canvas.width = video.width;
    this._canvas.height = video.height;
  }

  track() {
    // Draw the source image to track
    this._ctx.drawImage(this._videoSrc, 0, 0, this._canvas.width, this._canvas.height);
    
    // Get data from frame
    const frameData = this._ctx.getImageData(0, 0, this._canvas.width, this._canvas.height);
    const pixelData = imageDataToPixelData(frameData);

    // Loop over pixels and compare each pixel color
    pixelData.forEach((pixel, pixelIndex) => {
      const distance = distanceSquared([pixel.r, pixel.g, pixel.b], [0, 0, 0]);

      // Update tracking data if better match has been found
      if (distance > this.trackingData.distance) {
        this.trackingData = {
          distance,
          x: Math.floor(pixelIndex / this._videoSrc.width),
          y: pixelIndex % this._videoSrc.width
        }
      }
    });

    // Execute tracking handler
    this.trackHandler(this.trackingData);

    requestAnimationFrame(this.track);
  }

  cancelTracking() {

  }
};

export { Tracker };