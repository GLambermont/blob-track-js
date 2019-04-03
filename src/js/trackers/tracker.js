import { distanceSquared } from '../helpers';
class Tracker {
  constructor(video) {
    this._canvas = document.createElement('canvas');
    this._ctx = this._canvas.getContext('2d');
    this._trackerUpdateRequestID = null;
    this._video = video;
    this.data = {
      distance: 999999999,
      x: 0,
      y: 0
    };
  }

  set video(video) {
    this._video = video;
    this._canvas.width = video.videoWidth;
    this._canvas.height = video.videoHeight;
  }

  get video() {
    return this._video;
  }

  _trackingHandler(imageData, videoWidth) {
    let trackingData = {
      distance: 999999999,
      x: 0,
      y: 0
    }

    for(let i=0; i<imageData.length; i+=4) {
      const pixelIndex = i / 4;
      const pixelColor = [imageData[i], imageData[i+1], imageData[i+2]];
      const distance = distanceSquared([pixelColor[0], pixelColor[1], pixelColor[2]], [0, 0, 255]);

      // Check if color is the best color match found
      if (distance < trackingData.distance) {
        trackingData = this.data = {
          distance,
          x: pixelIndex % videoWidth,
          y: Math.floor(pixelIndex / videoWidth)
        }
      }
    }
  }

  track(trackingHandler) {
    const ctx = this._ctx;
    const video = this._video;
    const videoWidth = this._video.videoWidth;
    const videoHeight = this._video.videoHeight;

    // Draw the tracking video on a the canvas
    ctx.drawImage(video, 0, 0, videoWidth, videoHeight);

    // Get data from the tracking video
    const imageData = ctx.getImageData(0, 0, videoWidth, videoHeight).data;

    // Update the tracking data based on new frame image data
    this._trackingHandler(imageData, videoWidth);

    this._trackerUpdateRequestID = requestAnimationFrame(() => this.track(trackingHandler));
  }

  stopTracking() {
    cancelAnimationFrame(this._trackerUpdateRequestID);
  }
}

export { Tracker };
