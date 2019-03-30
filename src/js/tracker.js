class Tracker {
  constructor({ 
    video = null, 
    trackHandler = () => {} 
  } = {}) {
    this._canvas = document.createElement('canvas');
    this._ctx = this._canvas.getContext('2d');
    this.video = video;
    this.trackHandler = trackHandler;
    this.trackingData = null;
  }

  track() {
    this.track();
    requestAnimationFrame(this.track);
  }

  cancelTracking() {

  }
};

export { Tracker };