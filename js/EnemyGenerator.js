define([], function(){'use strict';
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
			newBaddy.speed = 85;
			newBaddy.agility = 63;
			var engine = this.engine;
			for (var i = 0; i < characters.length; i++)
			{
				var c = characters[i];
				while (engine.Physical_Damage(newBaddy,v) * (1.0 / v.maxHP) < .01)
				{
					newBaddy.attack++;
				}
			}
			var damagePercents = characters.map(function(v, i){return engine.Physical_Damage(newBaddy,v) * (1.0 / v.maxHP);});
			var hitsNeeded = characters.map(function(v,i){return v.maxHP * (1.0 / engine.Physical_Damage(newBaddy,v));});
			//console.log(newBaddy);
			//console.log(damagePercents);
			//console.log(hitsNeeded);
			var totalHits = hitsNeeded.reduce(function(previous, cur){return previous + Math.ceil(cur);}, 0);
			//Too easy to get attack stats that just plink off a characters armor (dealing exactly 1 damage on linear formulae) - need to tune this by a LOT
			//Ignore this for now
			//console.log(totalHits);
			//We naively assume that the player gets half that many hits in per character
			var playerHits = Math.floor(totalHits / 2);
			var damDealt = characters.map(function(v, i){ return engine.Physical_Damage(v,newBaddy) * playerHits;});
			//console.log(damDealt);
			newBaddy.HP = damDealt.reduce(function(previous, cur){return previous + cur;});
			//console.log(newBaddy.HP);
			newBaddy.name = "Priapus";
			return newBaddy;
		},
	});
	
	return Enemy;
	
});