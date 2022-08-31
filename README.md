# Absolute Crazy Pixel mapper

This is a proof of concept for a small shader based mapping software.

This version is written in javascript using P5JS and its only purpose is to demontstrate the concept.

## How does it works ?

It consist of a shader which maps arbitray positionned pixels from a texture to a straight line.

It takes a source texture (i.e. shader, video, image, etc.) with a define resolution and a mask. The mask is a png with 1 pixel height and X pixels width. X beeing the number of pixel you want to map to in your dmx / artnet output (i.e. number of led in your strips).

Each value in the map correspond to the position of a pixel in the source texture. This position is encoded as 32 bits color (rgba). The 16 heavy bits represent x and the 16 light bits represents y.

Encoding is done with this formula : `([x, y]) => (x << 16) | (y >>> 0)`

Decoding could have been done with bitshifting and masking as :
- `decodedX = encoded >> 16`
- `decodedY = encoded & 65535`

But GLSL ES does not support bitshifting before version 3.0, also colors in GLSL are encoded as float in a vec4 which would require more processing before decoding.

A cheaper solution is to use simpler math : 
- `decoded.x = encoded.r * 65536. + encoded.g * 256.`
- `decoded.y = encoded.b * 65536. + encoded.a * 256.`

Which gives us the positions.

Our mapper shader takes then input texture, the mask and the resolution for the input texture. For each pixel of the mask it will return the color of the pixel in the input texture at the coordinate encoded in the mask.

It records the result in a new texture from which we extract the pixel colors to send to the DMX fixture.

## Next Steps
- Port it outside the browser to actualy send the pixels to a led pixel controller using Artnet or SACn.
- Integrate the mask generator so we can input a json instead of a pre-computed mask
- Create a nicer GUI
- Try it on a Jetson Nano
