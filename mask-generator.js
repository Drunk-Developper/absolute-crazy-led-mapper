/** Genereate mask from an array of line */

const lines = [
  // {
  //   start: [x, y],
  //   end: [x, y],
  //   type: "line",
  //   pixelsCount: p,
  // },
  {
    start: [10, 10],
    end: [50, 50],
    type: "line",
    pixelCount: 10,
    pixelAddressStartsAt: 1,
  },
  {
    start: [80, 150],
    end: [55, 55],
    type: "line",
    pixelCount: 10,
    pixelAddressStartsAt: 11,
  },
]

/**
 * Compute the position of each pixel along the line
 * Take a line as input
 * Output an array of pixel object with address and position
 */
const distributePixelsAlongLine = ({ start, end, pixelCount, pixelAddressStartsAt }) => {
  const incrementX = (end[0] - start[0]) / (pixelCount - 1)
  const incrementY = (end[1] - start[1]) / (pixelCount - 1)
  return Array(pixelCount)
    .fill(0)
    .map((_, index) => ({
      address: pixelAddressStartsAt + index,
      position: [Math.floor(start[0] + index * incrementX), Math.floor(start[1] + index * incrementY)],
    }))
}

/**
 * Encode Position as color
 * Takes a position array [x, y] as input
 * Output a 24bit color representing the position
 * */
const encodePositionAsColor = ([x, y]) => (x << 12) | (y >>> 0)

// process lines
const mask = lines
  .map((line) => distributePixelsAlongLine(line))
  .flat()
  .sort((pixelA, pixelB) => pixelA.address - pixelB.address)
  .map((pixel) => pixel.position)
  .map((pixel) => encodePositionAsColor(pixel))

console.log(mask)
