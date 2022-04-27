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

public class maskGenerator extends PApplet {

PGraphics vectorMask;
PImage pixelMask;
PImage mappedMask;

PGraphics src;
PImage mappedOutput;


final int COLOR_MAX_VALUE = 256 * 256 * 256;
final int MASK_WIDTH = 1920;
final int MASK_HEIGHT = 1200;

/*
	Inside Processing color are store as int 
	[0xFF]  [0xFF] [0xFF]  [0xFF]
	[ALPHA] [RED]  [GREEN] [BLUE]
	as we use color as pixelId and reverse
	we have to pay attention to the ALPHA byte 
	cause we want to display masks at every step 
	and have only positive values for colors/pixelId

	This is just for testing, 
	so I did tweak a bit ( -1 * ) to build pixelMask and mappedMask
*/

public void setup(){
	
	vectorMask = createGraphics(MASK_WIDTH, MASK_HEIGHT);
	pixelMask = createImage(MASK_WIDTH, MASK_HEIGHT, ARGB);
	mappedMask = createImage(MASK_WIDTH, MASK_HEIGHT, ARGB);

	src = createGraphics(MASK_WIDTH, MASK_HEIGHT);
	mappedOutput = createImage(MASK_WIDTH, MASK_HEIGHT, ARGB);

	pixelMask.loadPixels();

	vectorMask.beginDraw();
	vectorMask.translate(vectorMask.width/2, vectorMask.height/2);
	vectorMask.stroke(255);
	int vertCount = 80;
	float alpha = TWO_PI / vertCount;
	int ledCounter = 1;
	for(int i = 0 ; i < vertCount ; i ++){
		vectorMask.pushMatrix();
		vectorMask.rotate(i * alpha);
		vectorMask.translate(20, 0);
		vectorMask.strokeWeight(3);
		vectorMask.line(0, 0, 300, 0);
		// Kind of rasterization 
		for(int x = 0 ; x < 300 ; x ++){
			int sX = round(vectorMask.screenX(x, 0));
			int sY = round(vectorMask.screenY(x, 0));
			int pixelID = sX + sY * vectorMask.width;
			pixelMask.pixels[pixelID] = -1 * (ledCounter++);
		}
		vectorMask.popMatrix();
	}
	vectorMask.endDraw();
	pixelMask.updatePixels();
	// invert coord and color;
	mappedMask.loadPixels();
	for(int i = 0 ; i < pixelMask.pixels.length ; i ++){
		mappedMask.pixels[-1 * pixelMask.pixels[i]] = -1 * i;
	}
	mappedMask.updatePixels();
}

public void draw(){
	drawSRC();
	background(0);
	scale(0.3333f);
	textAlign(CENTER, BOTTOM);
	textSize(60);
	

	image(vectorMask, 0, 0);
	text("vectorMask", width*0.5f, height);

	image(pixelMask, width, 0);
	text("pixelMask", width*1.5f, height);

	image(mappedMask, 2*width, 0);
	text("mappedMask", width*2.5f, height);

	image(src, 0, height);
	text("src", width*0.5f, height * 2);

	for(int i = 0 ; i < mappedMask.pixels.length ; i ++){
		int pixelId = abs(mappedMask.pixels[i]);
		if(pixelId != 0){
			mappedOutput.pixels[i] = src.pixels[pixelId];		
		}
	}
	mappedOutput.updatePixels();

	image(mappedOutput, width, height);
	text("mappedOutput", width*1.5f, height * 2);

}



public void drawSRC(){
	src.beginDraw();
	src.background(50, 33, 70);
	src.noStroke();
	for(int i = 255 ; i >= 0 ; i -= 10){
		src.fill(i);
		src.ellipse(mouseX, mouseY, i, i);	
	}
	src.endDraw();
}
  public void settings() { 	size(1920, 1080); }
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "maskGenerator" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
