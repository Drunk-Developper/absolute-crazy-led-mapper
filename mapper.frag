// Adapted by Louise Lessel - 2019
// from
// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com
// https://thebookofshaders.com/02/

// These are necessary definitions that let you graphics card know how to render the shader
#ifdef GL_ES
precision mediump float;
#endif

// get input shader resolution
uniform vec2 u_resolution;

// get texture from input shader
uniform sampler2D t_inputTex;

// get mask
uniform sampler2D t_mask;

// grab texcoords from vert shader
varying vec2 vTexCoord;

// decode color encoded position from mask
vec2 decodePositionFromColor(vec4 encoded, float width, float height) {
    vec2 decoded;
    
    // bitshifting should be faster but would requires converting vec4 into int
    // before decoding, which would be more ops than this simple math solution
    // also bitshifting doens't works before OPENGL ES 3.0
    decoded.x = ( encoded.r * 65536. + encoded.g * 256. ) / width;
    decoded.y = ( encoded.b * 65536. + encoded.a * 256. ) / height;
    
    return decoded;
}
    
void main() {
    // get mask pixel coordinate
    vec2 uv = vTexCoord;
    // get mask color at coordinate
    vec4 maskColor = texture2D(t_mask, uv);
    // get position in input shader encoded as color in mask (require the width and height of input shader)
    vec2 position = decodePositionFromColor(maskColor, u_resolution.x, u_resolution.y);
    // get the color of input shader at mask coordinate
    vec4 color = texture2D(t_inputTex, position);

    // render
    gl_FragColor = vec4(color.rgb, 1.0);
}
