//Stores all the different combat formulae in an easy to access fashion
//In addition, gives a short (displayable) description of each
//All functions in a group all need to take the same input
define([], function() {'use strict';

	var unimplementedFunctions = {
		
		init: {
			simple : function(charList) {
				
			},
			random : function(charList) {
				return charList[Math.floor(Math.random()*charList.length)];
			}
		},
		
		ai: {
			simple : function() {
				return this.phys_attack;
			}
		},
		
	};
	
	var functions = {
		
		variance: {
			static : function(expected){
				return 1;
			},
			
			simple : function(expected){
				if (!expected)
				{
					return Math.random() * .3 + .8;
				}
				else
				{
					return .95;
				}
			},
			
			normal: function(expected)
			{
				if (!expected)
				{
					var normVar = (Math.random() * 2 - 1) + (Math.random() * 2 - 1) + (Math.random() * 2 - 1);
					return (.2 * normVar) + 1;
				}
				else
				{
					return 1;
				}
			}
		},
		
		critical_chance: {
			none: function(character, expected){
				if (expected) return 0;
				return false;
			},
			
			always: function(character, expected){
				if (expected) return 1;
				return true;
			},
			
			simple: function(character, expected){
				if (expected) return .15;
				return Math.random() < .15;
			},
			
			frequent: function(character, expected){
				if (expected) return .35;
				return Math.random() < .35;
			},

		},
		
		critical_damage: {
			static: function(character, damage, expected){
				return 2 * damage;
			},
			
			simple: function(character, damage, expected){
				if (expected) return (damage * 2);
				return Math.floor((Math.random() + 1.5) * damage);
			},
		},
		
		//By convention, we use the following variables: [Atk, Def]
		Physical_Damage: {
			simple : function(char1, char2) {
				return Math.max(char1.attack - char2.defense + 5, 1);
			},
			linear : function(char1, char2) {
				return Math.max(1, 3 * char1.attack - 2 * char2.defense + 5);
			},
			HighPower : function(char1, char2){
				return Math.max(1, 5 * char1.attack - 3 * char2.defense + 5);
			},
			ratio : function(char1, char2) {
				return Math.max(1, Math.floor((char1.attack * char1.attack) / (10 * char2.defense)));
			},
			HighPowerRatio : function(char1, char2) {
				return Math.max(1, Math.floor((char1.attack * char1.attack) / (6 * char2.defense)));
			}
		},
		
		Magical_Damage: {

			simple : function(char1, char2) {
				return Math.max((char1.special - char2.specialDefense), 1);
			},
			linear : function(char1, char2) {
				return Math.max(1, 3 * char1.special - 2 * char2.specialDefense + 5);
			},
			HighPower : function(char1, char2){
				return Math.max(1, 5 * char1.special - 3 * char2.specialDefense + 5);
			},
			ratio : function(char1, char2) {
				return Math.max(1, Math.floor((char1.special * char1.special) / (10 * char2.specialDefense)));
			},
			HighPowerRatio : function(char1, char2) {
				return Math.max(1, Math.floor((char1.special * char1.special) / (6 * char2.specialDefense)));
			}
		},
		
		toHit: {
			static : function(char1, char2, test){
				if (test) return 1;
				return true;
			},
			simple : function(char1, char2, test) {
				if (test) return .75;
				return (Math.random() < .75);
			},
			linear : function(char1, char2, test) {
				if (test) return ((char1.accuracy - char2.accuracy) / 2 + 50)/100;
				return (char1.accuracy - char2.accuracy) / 2 + 50 > (Math.random() * 100);
			},
			ratio : function(char1, char2, test) {
				if (test) return (char1.accuracy) / (char1.accuracy + char2.accuracy);
				return (char1.accuracy) / (char1.accuracy + char2.accuracy) > Math.random();
			},
		}
	};
	
	return functions;
});