PImage mask;
final int COLOR_MAX_VALUE = 256 * 256 * 256;
final int MASK_WIDTH = 1920;
final int MASK_HEIGHT = 1200;
void setup(){
	size(1920, 1080);
	mask = createImage(MASK_WIDTH, MASK_HEIGHT, RGB);
	mask.loadPixels();
	for(int i = 0 ; i < mask.pixels.length ; i ++){
		mask.pixels[i] = i < COLOR_MAX_VALUE ? i : 0 ;
	}
	mask.updatePixels();
}

void draw(){
	image(mask, 0, 0, width, height);
}
