//Stores all the different combat formulae in an easy to access fashion
//In addition, gives a short (displayable) description of each
//All functions in a group all need to take the same input
define([], function() {'use strict';

	var functions = {
		sample_funcs: {
		    blah: function() { alert("blah"); },
		    foo: function() { console.log("foo"); }
		},
		
		init: {
			simple : function(charList) {
				return charList[Math.floor(Math.random()*charList.length)];
			}
		},
		
		damage_spread: {
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
			static: function(character){
				return false;
			},
			
			simple: function(character){
				return Math.random() < .15;
			},
		},
		
		critical_damage: {
			static: function(character){
				return 2;
			},
			
			simple: function(character){
				return 2 + (Math.random() - .5);
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
			d1 : function(char1, char2) {
				return Math.max(1, 3 * char1.attack - 2 * char2.defense + 5);
			},
			d2 : function(char1, char2) {
				return Math.max(1, Math.floor((char1.attack * char1.attack) / (10 * char2.defense)));
			}
		},
		
		ai: {
			simple : function() {
				return this.phys_attack;
			}
		},
		
		toHit: {
			static : function(char1, char2){
				return true;
			},
			simple : function(char1, char2) {
				return (Math.random() < .75);
			},
			a1 : function(char1, char2) {
				return (char1.accuracy - char2.accuracy) / 2 + 50 > (Math.random() * 100);
			},
			a2 : function(char1, char2) {
				return (char1.accuracy) / (char1.accuracy + char2.accuracy) > Math.random();
			},
		}
	};
	
	return functions;
});