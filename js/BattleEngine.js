/**
 * @author Joe Mazeika
 * The battle engine - the core of the gameplay
 */

define(["./character", "./formulae", "./actions"], function(Character, Formulae, Actions) {
	
	var QueueSize = 5;
	
	BattleEngine = Class.extend({
		init : function(){
			console.log("Battle Engine online");
			this.allCharacters = [];
			this.playerCharacters = [];
			this.enemyCharacters = [];
			this.activeCharacters = [];
			this.characterQueue = [];
			this.partyList = [];
			this.totalChars = 0;
		},
		setCallbacks : function(charUI, endOfTurn, eob)
		{
			this.charUICallback = charUI;
			this.EoBCallback = eob;
			this.endOfTurnCallback = endOfTurn;
		},
		reset : function(){
			this.allCharacters = [];
			this.playerCharacters = [];
			this.enemyCharacters = [];
			this.totalChars = 0;
		},
		
		ready: function(){
			return (this.playerCharacters.length > 0 && this.enemyCharacters.length > 0);
		},
		
		startEngine : function(){
			this.takeTurns();
		},
		
		setFunction : function(fName, newFunc){
			this[fName] = Formulae[fName][newFunc];
		},
		
		addCharacter : function(chara, isPC){
			var character = new Character(chara);
			if (isPC)
			{
				character.party = 0;
				this.playerCharacters.push(character);
				this.partyList.push[0];
			}
			else
			{
				character.party = 1;
				this.enemyCharacters.push(character);
				this.partyList.push[1];
			}
			this.allCharacters.push(character);
			this.activeCharacters.push(true);
			this.totalChars++;
		},
		
		takeTurns : function(){
			this.currentChar = this.getNextCharacter();
			while (this.currentChar.party == 1)
			{
				//Handle Enemy Input
				var action = this.pickEnemyAction(this.currentChar);
				var target = this.pickTarget(this.currentChar);
				Actions[action](this, this.currentChar, target);
				this.endOfTurnCallback();
				this.checkEndOfBattle();
				this.currentChar = this.getNextCharacter();
				this.addToQueue();
			}
			// Pass off to player Input
			this.charUICallback(this.currentChar);
		},
		
		pickEnemyAction : function(enemy){
			return "Attack";
		},
		
		pickTarget : function(enemy){
			//Need a way to update valid targets... but let's worry about that *later*
			var idx = Math.floor(Math.random() * this.playerCharacters.length);
			return this.playerCharacters[idx];
		},
		
		checkEndOfBattle : function()
		{
			//Check if all the players or enemies are KOed
			//Also, handle EoT updating here, I guess
			var activeCount = [0,0];
			for (var i = 0; i < this.allCharacters.length; i++)
			{
				if (!this.allCharacters[i].isKOed)
					activeCount[this.allCharacters[i].party]++;
				this.activeCharacters[i] = !this.allCharacters[i].isKOed;
			}
			//Now, check EoB
			if (activeCount[0] == 0)
			{
				this.EoBCallback(false);
				return true;
			}
			else if (activeCount[1] == 0)
			{
				this.EoBCallback(true);
				return true;
			}
			return false;
		},
		
		inputAction : function(action, target)
		{
			//Need a list of Actions, I guess
			Actions[action](this, this.currentChar, target);
			this.endOfTurnCallback();
			if (!this.checkEndOfBattle())
			{
				this.takeTurns();
			}
			
		},
		
		getNextCharacter : function()
		{
			var curChar = this.allCharacters[this.characterQueue.shift()];
			this.addToQueue();
			while (curChar.isKOed)
			{
				curChar = this.allCharacters[this.characterQueue.shift()];
				this.addToQueue();
			}
			return curChar;
		},
		
		initializeQueue : function(){
			//the Queue is an array of indices in this.allCharacters
			this.queueState = 0;
			while (this.characterQueue.length < QueueSize)
			{
				this.characterQueue.push(this.queueState);
				this.queueState++;
				if (this.queueState == this.totalChars)
				{
					this.queueState = 0;
				}
			}
		},
		
		addToQueue : function(){
			//This only works, at the moment, for 1v1 battles
			//Because characters who are eliminated still get added
			//IDGAF for now
			var done = false;
			while (!done)
			{
				if (this.activeCharacters[this.queueState])
				{
					this.characterQueue.push(this.queueState);
					done = true;
				}
				this.queueState++;
				if (this.queueState == this.totalChars)
				{
					this.queueState = 0;
				}
			}
			
		},
	});
	
	return BattleEngine;
});