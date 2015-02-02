/**
 * @author Joe Mazeika
 * Individual sprites! With things like "state" and "position"
 * Kinda magical
 */

define([], function(){
	
	var Sprite = Class.extend({
		init : function(sLib, startImg, x, y){
			this.sLib = sLib;
			this.x = x;
			this.y = y;
			this.character = {};
			this.setImg(startImg);
		},
		
		draw : function(context){
			this.sLib.drawImage(this.curImg, context, this.x, this.y);
		},
		
		setImg : function(newImg){
			this.curImg = newImg;
			this.x_size = this.sLib.pos[this.curImg].x;
			this.y_size = this.sLib.pos[this.curImg].y;
		},
		
		isInBounds : function(x, y){
			return (x > this.x && y > this.y && x < this.x_size + this.x && y < this.y_size + this.y);
		}
	});
	
	return Sprite;
});
