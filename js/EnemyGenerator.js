define(["./actions", "./character"], function(Actions, Character){'use strict';
	//Given a party of player characters, generate a party of 'challenging enemies'
	var Enemy = Class.extend({
		init : function(engine){
			this.engine = engine;
			console.log("The gates of Hell have risen");
		},
		
		getTemplate : function(){
			return {name: "",
					HP: 0,
					MP: 0,
					attack: 0,
					defense: 0,
					special: 0,
					specialDefense: 0,
					speed: 0,
					agility: 0, 
					skills: ['Attack']};
		},
		
		genParty : function(partySize, characters){
			var outArray = [];
			for (var i = 0; i < partySize; i++)
			{
				outArray.push(this.buildEnemy(characters,{partySize : partySize}));
			}
			return outArray;
		},
		
		getExpectedDamage : function(character1, character2, isAverage){
			//character1 is presumed offense, character2 is defense
			//We assume that everyone has stats in place appropriately
			//if 'isAverage', return the average damage of all skills
			//Otherwise, return the maximum damage
			var c1 = new Character(character1);
			var c2 = new Character(character2);
			var aList = character1.skills;
			var outDamage = [];
			for (var i in aList)
			{
				var damage = Actions[aList[i]](this.engine, c1, c2, true);
				if (damage != undefined)
					outDamage.push(Actions[aList[i]](this.engine, c1, c2, true));
			}
			//Do clever math things to the array to get the requested values.
			if (isAverage) return outDamage.reduce(function(a, b) { return a + b; }) / outDamage.length;
			else return Math.max.apply(Math, outDamage);
		},
		
		buildEnemy : function(characters,tuneables){
			//For now, ignore tuneables
			//But, given an engine (with all it's functions) and a set of characters
			//Build an interesting set of enemies to throw back at the opponent
			/*Steps:
			1) First, determine enemy party size
			2) Using that, assume that each 'round', every character is going to get 1 hit off (don't worry about order for now)
			3) So, we want that - on average - both parties will deal about the same % of damage to each other in a given round
			4) ... We actually want the player damage to be a liiiiittle higher (and we're ignoring the player ability to heal)
			5) So, from there, we can fix down stats for the first monster
			6) But how? Just... picking stats and fixing them seems like a good first step, I think
			7) WELL OKAY LOOKS LIKE I FOUND A SOLUTION :D
			*/
			console.log("ERECTIN' A NEW BADDY");
			var newBaddy = this.getTemplate();
			//For v1.0, just fix attack at some value.
			//Let's not worry about to hit chance either
			newBaddy.attack = Math.floor(Math.random() * 50) + 60;
			newBaddy.defense = Math.floor(Math.random() * 50) + 25;
			newBaddy.special = Math.floor(Math.random() * 50) + 60;
			newBaddy.specialDefense = Math.floor(Math.random() * 50) + 25;
			newBaddy.speed = 85;
			newBaddy.agility = 63;
			var playerDamage = [];
			for (var i = 0; i < characters.length; i++)
			{
				playerDamage.push(this.getExpectedDamage(characters[i], newBaddy, true));
			}
			console.log("Expected damage!");
			console.log(playerDamage);		
			var averageTurnsToDefeat = Math.floor(Math.random() * 3) + 3;
			newBaddy.HP = Math.floor(playerDamage.reduce(function(a,b) { return a+b;}) * averageTurnsToDefeat * (.3 * Math.random() + .8));
			console.log("HP: " + newBaddy.HP);
			nameArray = ["Boann", "Nephthys", "Dakuwaqa", "Vellamo", "Cymopoleia", "Cymopoleia", "Nerites", "Phorcys", "Ukupanipo", "Pariacaca", "Arnapkapfaaluk", "Bangpūtys"];
			newBaddy.name = nameArray[Math.floor(Math.random() * nameArray.length)];
			return newBaddy;
		},
	});
	
	return Enemy;
	
});