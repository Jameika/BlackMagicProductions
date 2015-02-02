/**
 * @author Joe Mazeika
 * This is a class that stores all of the user data.
 * It gets created when the user logs in; and is populated with information from the server
 * I don't have a server, so all the data's gonna get hard coded in for now
 */

define([], function(UIMain){
	
	var userData = Class.extend({
		init : function(){
			//Initialize to default values
			//Can update later in code; and can override with 'loaded' data.
			console.log("User loaded");
			this.username = "Player";
			this.currentParty = [
			{name: 'Micah', maxHP: 293, maxMP: 102, attack: 48, defense: 68, special: 92, specialDefense: 107, speed: 87, agility: 51, skills: ['Attack', 'Ray']},
			{name: 'Mazin', maxHP: 432, maxMP: 75, attack: 77, defense: 92, special: 63, specialDefense: 39, speed: 82, agility: 75, skills: ['Attack']}
			];
			this.currentBattleParameters = {
				Physical_Damage : 'simple',
				Magical_Damage : 'simple',
				toHit : 'simple',
				variance : 'simple',
				critical_chance : 'none',
				critical_damage : 'static',
			};
		},
	});
	
	return userData;
});