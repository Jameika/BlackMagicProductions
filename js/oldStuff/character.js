//Starting with layer 1 of system
//3 stats (HP, attack, defense), one ability (attack)
//This is the in-combat class; the data structure used for storing characters is likely to be different
define(["./UIMain"], function(UIMain) {'use strict';

	var Character = Class.extend({
		init : function(name, engine){
			this.name = name;
			this.type = 'character';
			this.engine = engine;
			//var thisCHEAT = this;
			/*this.actions = {attack : function(thisChar, otherChar){
				if (engine.toHit(thisChar, otherChar))
				{
					var damage = engine.phys_damage(thisChar, otherChar);
					//console.log(damage);
					engine.textOut(thisChar.name + " attacks " + otherChar.name);
					engine.textOut(otherChar.name + " takes " + damage + " damage");
					otherChar.takeDamage(damage);
				}
				else
				{
					engine.textOut(thisChar.name + " missed!");
				}
			}};*/
			this.actions = ['attack'];
			this.party = -1;
			this.isKOed = false;
		},
		
		setStats : function(stats){
			for (var v in stats)
			{
				this[v] = stats[v];
			}
			console.log(this);
		},
		
		setFunctions : function(action, func)
		{
			this.actions[action] = func;
		},
		
		takeDamage : function(damage)
		{
			this.curHP -= damage;
			if (this.curHP <= 0)
			{
				this.isKOed = true;
				this.curHP = 0;
			}
		},
		
		healHealth : function(damage)
		{
			this.curHP += damage;
			if (this.curHP > this.maxHP)
			{
				this.curHP = this.maxHP;
			}
		},
		
		addActions : function(actionList){
			this.actions.merge(actionList);
		},
		
		pickAction : function(){
			//Assigned on instantiation
			//
		},
		
		performAction : function(action, target)
		{
			this.actions[action](this,target);
		},
	});
	return Character;
});