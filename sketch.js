// set width / height of the input shader
const width = 300;
const height = 300;

// set the number of pixel (width) of the mask (height is always 1)
const maskWidth = 20;

let inputShader;
let mapperShader;
let inputinputShaderTexture;
let mask;

// preload both shaders
function preload(){
  inputShader = loadShader('onecolor.vert', 'onecolor.frag');
  mapperShader = loadShader('mapper.vert', 'mapper.frag')
}

function setup() {
  // create a mask canvas
  createCanvas(maskWidth, 1, WEBGL);
  
  // create a texture from intput shader
  inputShaderTexture = createGraphics(width, height, WEBGL);
  
  // load the mask
  mask = loadImage("mask.png");

  // set pixeldensity and no stroke
  pixelDensity(1);
  noStroke();
}

function draw() { 
  // pass paramters to input shader
  inputShader.setUniform("u_resolution", [width, height]);
  inputShader.setUniform("u_time", frameCount * 0.01); // we divide millis by 1000 to convert it to seconds
  
  // load our input shader in texture
  inputShaderTexture.shader(inputShader);
  inputShaderTexture.rect(0, 0, width, height);

  // pass mask, input shader texture and input shader width / height to the mapper shader
  inputShader.setUniform("u_resolution", [width, height]);
  mapperShader.setUniform("t_mask", mask);
  mapperShader.setUniform("t_inputTex", inputShaderTexture);
  
  // render mapper shader
  shader(mapperShader);
  rect(0, 0, maskWidth, 1);

  // load pixels from mapper shader and print to console
  loadPixels();
  console.log(pixels)
}

// function windowResized(){
//   resizeCanvas(windowWidth, windowHeight);
// }