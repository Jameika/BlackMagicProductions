/**
 * @author Joe Mazeika
 * This holds the logic for turning sprite sheets into sprites
 * Don't worry about it
 */

define([], function(){
	
	var spriteLibrary = Class.extend({
		init : function(img, posJSON, invert){
			this.img = img;
			this.pos = posJSON;
			this.frameCount = posJSON.length;
			this.invert = invert;
		},
		
		drawImage : function(id, ctx, x, y)
		{
			if (id >= 0 && id < this.frameCount)
			{
				var drawPos = this.pos[id];
				if (this.invert)
				{
					ctx.scale(-1, 1);
					ctx.drawImage(document.getElementById(this.img),drawPos.s_x,drawPos.s_y,drawPos.x,drawPos.y,-1*x,y,-1*drawPos.x,drawPos.y);
					ctx.scale(-1, 1);
				}
				else
				{
					ctx.drawImage(document.getElementById(this.img),drawPos.s_x,drawPos.s_y,drawPos.x,drawPos.y,x,y,drawPos.x,drawPos.y);
				}
			}
		}
	});
	
	return spriteLibrary;
});
