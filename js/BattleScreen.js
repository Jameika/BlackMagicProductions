/**
 * @author Joe Mazeika
 * This is the UI for the combat engine
 */

/*
 * Okay, so this is what this needs to do:
 * Set main Battle UI
 * Reset Engine and load User Settings
 * Generate Enemies and load them
 * Begin the battle loop
 * 	Engine gets first char.
 * 	If enemy, take turn and get next
 * 	If player, call a callback function to set up the UI
 * 	Get input and pitch it back into the Engine
 * 	At battle end, go back up to the Menu
 */

define(["./UIMain", "./sprite"], function(UIMain, Sprite){
	var ctx;
	var currentSprites = {player : [], enemy : []};
	var canvasScale = .35;
	var canvaswidth = 800 * canvasScale;
	var canvasheight = 450 * canvasScale;
	
	var inputState = "block";
	var inputAction = "";
	var inputTarget = "";
	var MainMenuScreen;
	
	function setBattleSprites(BE){
		//Set PC sprites, maybe?
		//Need them to exist first
		//Now the baddies
		curY = 20;
		for (var i = 0; i < BE.playerCharacters.length; i++)
		{
			var newSprite = new Sprite(spriteSheets[1], i, 15, curY);
			curY += newSprite.y_size + 10;
			newSprite.character = BE.playerCharacters[i];
			newSprite.draw(ctx);
			currentSprites['player'].push(newSprite);
		}
		curY = 0;
		for (var i = 0; i < BE.enemyCharacters.length; i++)
		{
			//roll Baddies randomly
			var foeType = Math.floor(Math.random() * 5);
			//var foeType = i;
			var newSprite = new Sprite(spriteSheets[0], foeType, 0, curY);
			newSprite.x = canvaswidth - newSprite.x_size;
			curY += newSprite.y_size;
			newSprite.character = BE.enemyCharacters[i];
			newSprite.draw(ctx);
			currentSprites['enemy'].push(newSprite);
		}
	};
	
	function setActionButtons(character){
		console.log(character);
	};
	
	function drawBattleScene(){
		console.log("Redraw screen!");
		ctx.clearRect(0, 0, canvaswidth,canvasheight);
		ctx.rect(0,0,canvaswidth,canvasheight);
		var my_gradient=ctx.createLinearGradient(0,0,0,canvasheight);
		my_gradient.addColorStop(0,"#aaddff");
		my_gradient.addColorStop(1,"green");
		ctx.fillStyle=my_gradient;
		ctx.fill();
		for (var i = 0; i < currentSprites['player'].length; i++)
		{
			currentSprites['player'][i].drawn = false;
			if (!currentSprites['player'][i].character.isKOed)
			{
				currentSprites['player'][i].draw(ctx);
				currentSprites['player'][i].drawn = true;
			}
				
		}
		for (var i = 0; i < currentSprites['enemy'].length; i++)
		{
			currentSprites['enemy'][i].drawn = false;
			if (!currentSprites['enemy'][i].character.isKOed)
			{
				currentSprites['enemy'][i].draw(ctx);
				currentSprites['enemy'][i].drawn = true;
			}
		}
	}
	
	function loadBattleUI(){
		clearDiv("#mainFrame");
		addDiv("outText", "mainFrame");
		addDiv("inputDiv", "mainFrame");
		addDiv("charStatusDiv", "mainFrame");
		addCanvas("battleScene", "mainFrame", canvaswidth, canvasheight);
		var c=document.getElementById("battleScene");
		ctx = c.getContext("2d");
		ctx.imageSmoothingEnabled = false;
		/* SPRITE BOUNDS FINDING CODE
		   REALLY USEFUL - BUT NOT IN THE DEPLOYED VERSION
		var drawPos = {s_x : 21, s_y : 3, x : 17, y : 27};
		ctx.scale(-1, 1);
		ctx.drawImage(document.getElementById('party'),drawPos.s_x,drawPos.s_y,drawPos.x,drawPos.y,0,0,-1*drawPos.x,drawPos.y);
		*/
	};
	
	function updateUI(){
		printCharStatus();
		drawBattleScene();
	};
	
	function initializeBattle(){
		/*
		 * 1) Add the player characters 
		 * 2) Generate the enemy characters
		 * 3) Kick off the engine
		 * 4) 
		 */
		var enemyPartySize = 2;
		BEngine.reset();
		BEngine.setCallbacks(drawCharUI, updateUI, EoB);
		var curBP = User.currentBattleParameters;
		for (var key in curBP)
		{
			if(curBP.hasOwnProperty(key)) 
			{
				BEngine.setFunction(key, curBP[key]);
	    	}
		}
		var PCs = User.currentParty;
		for(var i in PCs)
		{
			BEngine.addCharacter(PCs[i], true);
		}
		var enemyParty = EnemyGen.genParty(enemyPartySize, PCs);
		for(var i in enemyParty)
		{
			BEngine.addCharacter(enemyParty[i], false);
		}
		clearDiv("#outText");
		if (BEngine.ready())
		{
			console.log("GORILLA FATE IS TURNING");
			setBattleSprites(BEngine);
			drawBattleScene();
			BEngine.initializeQueue();
			printCharStatus();
			BEngine.startEngine();
			console.log("ACTION");
			console.log(BEngine);
		}
		else
		{
			//Error out.
			console.log("OOPS WE SCREWED UP SOMEWHERE");
			console.log(BEngine);
			console.log("Hopefully, you can figure it out, oh Might Dev!");
			MainMenuScreen();
		}
	};
	
	function EoB(playerWin){
		clearDiv("outText");
		if (playerWin)
		{
			printLine("Player wins!","outText");
		}
		else
		{
			printLine("Helmetfish may rule...","outText");
		}
		//WHY IS THIS UNDEFINED???
		clearDiv("inputDiv");
		addButton("inputDiv", "Return to Menu", function(){
			MainMenuScreen();
		});
		
	};
	
	function printCharStatus(){
		clearDiv("charStatusDiv");
		var chars = BEngine.playerCharacters;
		for (var i = 0; i < chars.length; i++)
		{
			addDiv("innerCharDiv", "charStatusDiv");
			var text = chars[i].name + ": " + chars[i].curHP + "/" + chars[i].maxHP;
			printLine(text, "innerCharDiv");
		}
	};
	
	function setClickEvents(){
		$('#battleScene').click(function (e) {
			var divPos = $('#battleScene').position();
    		var clickedX = (e.pageX - divPos.left) * canvasScale;
    		var clickedY = (e.pageY - divPos.top) * canvasScale;
    		console.log("CLICKITY!");
    		console.log(clickedX);
    		console.log(clickedY);
    		for (var i = 0; i < currentSprites.enemy.length; i++)
    		{
    			if (currentSprites.enemy[i].isInBounds(clickedX, clickedY) && currentSprites.enemy[i].drawn)
    			{
    				//Return a thing that says we clicked on the thing
    				if (inputState == "target")
    				{
    					inputState = "block";
    					BEngine.inputAction(inputAction, currentSprites.enemy[i].character);
    				}
    				console.log(currentSprites.enemy[i]);
    				break;
    			}
    		}
    		for (var i = 0; i < currentSprites.player.length; i++)
    		{
    			if (currentSprites.player[i].isInBounds(clickedX, clickedY) && currentSprites.player[i].drawn)
    			{
    				//Return a thing that says we clicked on the thing
    				if (inputState == "target")
    				{
    					inputState = "block";
    					BEngine.inputAction(inputAction, currentSprites.player[i].character);
    				}
    				console.log(currentSprites.player[i]);
    				break;
    			}
    		}
		});
	};
	
	function drawCharUI(character){
		//Get actions, make buttons for them
		inputState = "action";
		clearDiv("inputDiv");
		printLine("Current Turn: " + character.name, "inputDiv");
		addDiv("actionDisDiv", "inputDiv");
		printLine("Choose action:", "actionDisDiv");
		for (var i = 0; i < character.skills.length; i++)
		{
			addButton("inputDiv", character.skills[i], function(){
				if (inputState == "action")
				{
					inputAction = this.value;
					inputState = "target";
					clearDiv("inputDiv");
					addDiv("actionDisDiv", "inputDiv");
					printLine("Click a target above", "actionDisDiv");
				}
			});
		}
		console.log("GET YER RED HOT INPUTS 'ERE");
	};
	
	var BattleScreen = function(previous){
		MainMenuScreen = previous;
		loadBattleUI();
		setClickEvents();
		initializeBattle();
	};
	
	return BattleScreen;
});