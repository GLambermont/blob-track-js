/**
 * Create a video element containing a webcam stream.
 * @param {HTMLElement} [videoEl] Video element to use for the stream.
 * @returns Promise containing a video element for the stream.
 */
const createWebcamStream = (videoEl = document.createElement('video')) => { 
  return navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      videoEl.setAttribute('autoplay', true);
      videoEl.srcObject = stream;
      videoEl.onloadedmetadata = () => videoEl.play;

      return videoEl;
    })
    .catch(() => {
      throw new Error('Could not start video stream.');
    });
};

export { createWebcamStream };