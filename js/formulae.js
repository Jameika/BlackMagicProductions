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
			none: function(character){
				return false;
			},
			
			always: function(character){
				return true;
			},
			
			simple: function(character){
				return Math.random() < .15;
			},
		},
		
		critical_damage: {
			static: function(character, damage){
				return 2 * damage;
			},
			
			simple: function(character, damage){
				return Math.floor(2 + (Math.random() - .5) * damage);
			},
		},
		
		//By convention, we use the following variables: [Atk, Def]
		Physical_Damage: {
			static : function(char1, char2) {
				return 3;
			},
			simple : function(char1, char2) {
				return Math.max(char1.attack - char2.defense + 5, 1);
			},
			linear : function(char1, char2) {
				return Math.max(1, 3 * char1.attack - 2 * char2.defense + 5);
			},
			ratio : function(char1, char2) {
				return Math.max(1, Math.floor((char1.attack * char1.attack) / (10 * char2.defense)));
			}
		},
		
		Magical_Damage: {
			static : function(char1, char2) {
				return 3;
			},
			simple : function(char1, char2) {
				return Math.max(char1.special - char2.specialDefense + 5, 1);
			},
			linear : function(char1, char2) {
				return Math.max(1, 3 * char1.special - 2 * char2.specialDefense + 5);
			},
			ratio : function(char1, char2) {
				return Math.max(1, Math.floor((char1.special * char1.special) / (10 * char2.specialDefense)));
			}
		},
		
		toHit: {
			static : function(char1, char2){
				return true;
			},
			simple : function(char1, char2) {
				return (Math.random() < .75);
			},
			linear : function(char1, char2) {
				return (char1.accuracy - char2.accuracy) / 2 + 50 > (Math.random() * 100);
			},
			ratio : function(char1, char2) {
				return (char1.accuracy) / (char1.accuracy + char2.accuracy) > Math.random();
			},
		}
	};
	
	return functions;
});