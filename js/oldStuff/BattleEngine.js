// v0.1 - Everything is fixed, just trying to get a default version up and running

define(["./character", "./formulae", "./skills"], function(Character, Formulae, Skills) {

	var QueueSize = 5;
	
	var SkillLibrary = Skills();
	//Need to get PCs and then generate enemies
	//For now, hard code the PCs because TIME OH GOD TIME.
	
	//var c = {name: 'Player', maxHP: 30, attack: 10, defense: 10};
	//var c2 = {name: 'Player 2', maxHP: 30, attack: 10, defense: 10};
	
	/*var fixedChar1*/ var c = {name: 'Micah', maxHP: 293, maxMP: 102, attack: 48, defense: 68, special: 92, specialDefense: 107, speed: 87, agility: 51};
	/*var fixedChar2*/ var c2 = {name: 'Mazin', maxHP: 432, maxMP: 75, attack: 77, defense: 92, special: 63, specialDefense: 39, speed: 82, agility: 75};
	
	var d = {name: 'Foe', maxHP: 30, attack: 10, defense: 10};
	var d2 = {name: 'Foe 2', maxHP: 30, attack: 10, defense: 10};
	
		BattleEngine = Class.extend({
		init : function(){
			this.playerCharacters = [];
			this.enemyCharacters = [];
			this.allCharacters = [];
			this.characterQueue = [];
			this.charCounts = [0,0];
			this.activeCharacters = [0,0];
			this.totalChars = 0;
			this.functionSet = {};
			this.addCharacter(c, true);
			this.addCharacter(d, false);
			this.addCharacter(c2, true);
			this.addCharacter(d2, false);
			this.readyForInput = false;
			this.battleRunning = false;
		},
		
		textOut : function(txt){
			console.log(txt);
		},
		
		setFunction : function(type, option){
			var newFunc = Formulae[type][option];
			switch(type){
				case "phys_damage_funcs":
					this.phys_damage = newFunc;
					break;
				case "toHit_funcs":
					this.toHit = newFunc;
				default:
					break;
			}
		},
		
		addCharacter : function(character, isPlayer){
			ch = new Character(character.name, this);
			ch.setStats(character);
			if (isPlayer)
			{
				ch.party = 0;
				this.playerCharacters.push(ch);
				this.charCounts[0]++;
			}
			else
			{
				ch.party = 1;
				this.enemyCharacters.push(ch);
				this.charCounts[1]++;
			}
			this.allCharacters.push(ch);
			this.totalChars++;
		},
		
		initializeBattle : function(){
			if (this.charCounts[0] > 0 && this.charCounts[1] > 0)
			{
				//Get READY TO ROLL
				this.initializeQueue();
				this.activeCharacters = this.charCounts;
				this.curChar = this.getNextCharacter();
			}
			this.readyForInput = true;
			this.battleRunning = true;
		},
		
		endOfBattle : function()
		{
			this.textOut("Battle's over!");
		},
		
		updateUI : function()
		{
			
		},
		
		getNextCharacter : function()
		{
			return this.allCharacters[this.characterQueue.shift()];
		},
		
		inputIn : function(input)
		{
			if (this.readyForInput && this.battleRunning)
			{
				this.readyForInput = false;
				this.takeTurn(input);
				this.readyForInput = true;
			}
		},
		
		pickAction : function(character)
		{
			return "attack";
			//return character.pickAction();
		},
		
		pickTarget : function(character, action)
		{
			if (character.party == 0)
			{
				i = 0;
				while (this.enemyCharacters[i].isKOed){ i++; }
				return this.enemyCharacters[i];
			}
			else if(character.party == 1)
			{
				i = 0;
				while (this.playerCharacters[i].isKOed){ i++; }
				return this.playerCharacters[i];
			}
		},
		
		takeEnemyTurn : function()
		{
			var action = this.pickAction(this.curChar);
			var target = this.pickTarget(this.curChar);
			this.performAction(this.curChar, action, target);
			this.battleRunning = this.checkEndOfBattle();
			if (!this.battleRunning)
			{
				this.endOfBattle();
			}
			this.addToQueue();
		},
		
		checkValidTarget : function(target)
		{
			if (target.isKOed)
			{
				return false;
			}
			return true;
		},
		
		takeTurn : function(input)
		{
			//Ignore input for now
			if (this.checkValidTarget(input.target))
			{
				this.performAction(this.curChar,input.action,input.target);
				this.battleRunning = this.checkEndOfBattle();
				if (!this.battleRunning)
				{
					this.endOfBattle();
				}
				else
				{
					this.addToQueue();
					this.curChar = this.getNextCharacter();
					while(this.battleRunning && this.curChar.party == 1)
					{
						this.takeEnemyTurn();
						this.curChar = this.getNextCharacter();
					}
					this.updateUI();
				}
			}
			else
			{
				this.textOut("Bad target!");
			}
		},
		
		performAction : function(character, action, target)
		{
			character.performAction(action, target);
			this.textOut(target.name + " has " + target.curHP + " HP left!");
		},
		
		checkEndOfBattle : function()
		{
			this.activeCharacters = [0,0];
			for (var i = 0; i < this.playerCharacters.length; i++)
			{
				if (!this.playerCharacters[i].isKOed)
				{
					this.activeCharacters[0]++;
				}
			}
			for (var i = 0; i < this.enemyCharacters.length; i++)
			{
				if (!this.enemyCharacters[i].isKOed)
				{
					this.activeCharacters[1]++;
				}
			}
			if (this.activeCharacters[0] == 0 || this.activeCharacters[1] == 0)
			{
				return false;
			}
			else
			{
				return true;
			}
		},
		
		//CUSTOMIZABLE FUNCTIONS GO HERE//
		
		toHit : function(attacker, defender){
			return true;
		},
		
		phys_damage : function(attacker, defender){
			return 3;
		},
		
		initializeQueue : function(){
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
			this.characterQueue.push(this.queueState);
			this.queueState++;
			if (this.queueState == this.totalChars)
			{
				this.queueState = 0;
			}
		},
		
	});
	
	return BattleEngine;
});