/** Genereate mask from an array of line */

const Jimp = require("jimp")

const lines = require("./lines.json")

const width = 800;
const height = 600;

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
 * Output a 32bit color representing the position (RGBA)
 * */
const encodePositionAsColor = ([x, y]) => (x << 16) | (y >>> 0)

/** Generate a 1xN png file from pixels */
const makePngFromPixels = (pixels) => {
  console.log(JSON.stringify(pixels))
  console.log(JSON.stringify(pixels.map(pixel => {
    const {r, g, b, a} = Jimp.intToRGBA(pixel)
    return ([r, g, b, ])
  }).flat()))
  
  // const image = new Jimp(pixels.length + 1, 1, function (err, image) {
  //   if (err) throw err

  //   // console.log

  //   // pixels.forEach((color, x) => {
  //   //   image.setPixelColor(color, x, 0)
  //   // })

  //   // image.write("mask.png", (err) => {
  //   //   if (err) throw err
  //   // })
  // })
}

// process lines
makePngFromPixels(
  lines
    .map((line) => distributePixelsAlongLine(line))
    .flat()
    // .sort((pixelA, pixelB) => pixelA.address - pixelB.address)
    .map((pixel) => pixel.position)
    .map((pixel) => encodePositionAsColor(pixel))
)