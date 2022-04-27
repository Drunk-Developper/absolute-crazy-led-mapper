import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class binaryColor extends PApplet {

PImage mask;
final int COLOR_MAX_VALUE = 256 * 256 * 256;
final int MASK_WIDTH = 1920;
final int MASK_HEIGHT = 1200;
public void setup(){
	
	mask = createImage(MASK_WIDTH, MASK_HEIGHT, RGB);
	mask.loadPixels();
	for(int i = 0 ; i < mask.pixels.length ; i ++){
		mask.pixels[i] = i < COLOR_MAX_VALUE ? i : 0 ;
	}
	mask.updatePixels();
}

public void draw(){
	image(mask, 0, 0, width, height);
}
  public void settings() { 	size(1920, 1080); }
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "binaryColor" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
