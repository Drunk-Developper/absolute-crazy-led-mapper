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

Encoding the position as a color is done by using the color as one 24 bits word : first 12 bits represent the X and last 12 bits represent Y.
encoded = x << 12) | y // left shifting x 12 bits to the left, then adding the y bits to the right using a OR
decodedX = encoded >> 12 // right shifting everything 12 bits
decodedY = encoded & 4095 // applying a 000000000000111111111111 bitmask to drop the first 12 bits

# Usage
