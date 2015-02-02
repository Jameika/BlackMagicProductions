//Defines a holder for the backend character data
//Contains code for realizing into character.js (via a JSON object, because I'm CLEVER)

define([], function() {'use strict';

	var character = Class.extend({
		init : function(name){
			this.name = name;
			this.HP = 0;
			this.MP = 0;
			this.attack = 0;
			this.defense = 0;
			this.special = 0;
			this.specialDefense = 0;
			this.speed = 0;
			this.agility = 0;
			this.totalPoints = 0;
		},
		
		setStat : function(stat, val){
			var vOld = this[stat];
			this[stat] = val;
			this.totalPoints += (val - vOld);
		},
		
		checkValid : function(){
			return this.totalPoints <= 24; 
		},
		
		realizeChar : function(){
			otherStruct = {name : this.name};
			otherStruct.HP = this.HPFormula();
			otherStruct.MP = this.MPFormula();
			otherStruct.attack = this.baseFormula(this.attack);
			otherStruct.defense = this.baseFormula(this.defense);
			otherStruct.special = this.baseFormula(this.special);
			otherStruct.specialDefense = this.baseFormula(this.specialDefense);
			otherStruct.speed = this.baseFormula(this.speed);
			otherStruct.agility = this.baseFormula(this.agility);
			return otherStruct;
		},
		
		HPFormula : function(){
			return 150 + (25 * this.HP * (this.HP -1))/2;
		},
		
		MPFormula : function(){
			return 50 + (10 * this.MP * (this.MP - 1))/2;
		},
		
		baseFormula : function(stat){
			return 10 + (5 * stat (stat - 1))/2;
		},
		
	});
	
	return character;
});
