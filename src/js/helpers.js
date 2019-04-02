/**
 * Get the squared euclidean distance between two points.
 * @param {Object} v1
 * @param {Number} v1.x
 * @param {Number} v1.y
 * @param {Number} v1.z
 * @param {Object} v2
 * @param {Number} v2.x
 * @param {Number} v2.y
 * @param {Number} v2.z
 */
const distanceSquared = (v1, v2) => {
  return (v1[0] - v2[0]) * (v1[0] - v2[0]) + (v1[1] - v2[1]) * (v1[1] - v2[1]) + (v1[2] - v2[2]) * (v1[2] - v2[2]);
};

// console.log(imageDataToPixelData([12, 5641, 564, 546, 546, 22,55, 32]))
export {
  imageDataToPixelData,
  distanceSquared
}