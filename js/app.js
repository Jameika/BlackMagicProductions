var User = {};
var BEngine = {};
var EnemyGen = {};
var img = {};
var spriteSheets = [];

var FoeImgSlices = [{ s_x : 0, s_y : 13, x : 52, y : 56}, 
				{ s_x : 59, s_y : 2, x : 51, y : 80}, 
				{s_x : 125, s_y : 10, x : 55, y : 55}, 
				{s_x : 180, s_y : 10, x : 50, y : 60}, 
				{s_x : 235, s_y : 30, x : 85, y : 40}];
var PlayerImgSlices = [{s_x : 1, s_y : 3, x : 17, y : 27},
					   {s_x : 21, s_y : 3, x : 17, y : 27}];
require(["./UIMain", "./mainScreen", "./BattleEngine", "./EnemyGenerator", "./spriteLibrary"], function(UIMain, MainScreen, BattleEngine, EnemyGenerator, SpriteLibrary) {
	
	//initialize any Global features
	
	BEngine = new BattleEngine();
	EnemyGen = new EnemyGenerator(BEngine);
	spriteSheets.push(new SpriteLibrary('helmetFish',FoeImgSlices,true));
	spriteSheets.push(new SpriteLibrary('party',PlayerImgSlices,true));
	//Move to opening Scene
	MainScreen();
	
});