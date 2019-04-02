/**
 * Create a video element containing a webcam stream.
 * @param {HTMLElement} [videoEl] Video element to use for the stream.
 * @returns Promise containing a video element for the stream.
 */
const createWebcamStream = (videoEl = document.createElement('video')) => new Promise((resolve, reject) => {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      // Set the video element attributes
      videoEl.setAttribute('autoplay', true);
      videoEl.srcObject = stream;

      // Wait for video to load before resolving and starting the video
      videoEl.onloadedmetadata = () => {
        videoEl.play;
        resolve(videoEl);
      };
    })
    .catch(() => reject(new Error('Could not start video stream.')));
});

export { createWebcamStream };