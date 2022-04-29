# Mapping software

# Process

## Prepare mapping

1. Define the size of your source (shader that will be mapped) in px.
2. Create a pre-mask -> draw on a same size canvas the position of your stips, each line is a strip and place each leds at a defined position along the line. Encode the position of the led on the stip as the color of the pixel in the image, every other pixels are black.
3. Process the pre-mask to create the actual mask by reordering all the usefull pixels (the ones that have a color) from the pre-mask based on their color, place them in order on the mask starting from coord (0,0) and encode their previous position (the one on the pre-mask) as their color. (actually flip the two informations : position on strip <-> coord of the pixel).

## Runtime (looping in orage)

4. Render a frame of the shader to map
5. In another glsl get the frame to map and the mask, for each active pixel of the mask, get the coordonate encoded in the color and get the corresponding pixel color from the frame, write it at same (mask) position to the output
6. Get an array on output which has same shape as the mask but with actual colors from frame
7. Turn that array as a series of artnet commands and send them down the network

# Notes

The shaders will run into [Orage](https://github.com/oogre/orage) as [ISF](https://isf.video/) gsls fragments.

Encoding the position as a color is done by using the color as one 32 bits word : first 16 bits represent the X and last 16 bits represent Y.

`encoded = x << 16) | y` // left shifting x 12 bits to the left, then adding the y bits to the right using a OR
`decodedX = encoded >> 16` // right shifting everything 16 bits
`decodedY = encoded & 65535` // applying a `00000000000000001111111111111111` bitmask to drop the first 16 bits

# Usage

1. In any drawing tools (photoshop, canvas, figma, gimp, ...), create a canvas of the pixel size of your shader
2. Draw the position of the fixture
3. With an inspector tool get the starting point and endind point of each of your fixture and note them down
4. Manually create a json files containing your fixture such as :

```json
[
  {
    start: [x, y],
    end: [x, y],
    type: "line",
    pixelsCount: integer,
    pixelAddressStartsAt: integer
  },
]
```

note:

- type:"line" represent a straight line, it is the only type currently available
- `pixelsCount` is the quantity of pixel to put on that line, they're going to be equally distributed along the line, first pixel will be on start and last on end
- `pixelAddressStartsAt` is the address of the first pixel of that fixture and it will be incremented for each pixel of the line. This will be used to determine the artnet address when sending on network. Beware that :
  - You shouldn't have any overlap between your fixture (we don't test this, so it will provoke some weird behaviour)
  - You (currently) cannot have gaps beween the end of a strip and the first address of the next

This script will output a 1xN png in the same folder.

5. with dependencies installed (`npm i`) run generate-mask.sh (`node generate-mask.js`).
6. you get the mask as a PNG file
