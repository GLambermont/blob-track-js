const imageDataToPixelData = data => {  
  const pixelData = [];

  for(let i = 0; i < data.length; i += 4) { 
    pixelData[i / 4] = {
      r: data[i],
      g: data[i + 1],
      b: data[i + 2],
      a: data[i + 3]
    }
  }

  return pixelData;
};

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

export {
  imageDataToPixelData,
  distanceSquared
}