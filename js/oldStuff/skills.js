define([], function(){'use strict';
	//Defines a library of skills that can be incorporated into various characters
	//Only one tier of power for now, but such is life
	//Skills have an actor, a target, and they just run through the full 
	var Skill = Class.extend({
		init : function(engine){
			this.engine = engine;
			skillList = {null : function(actor, target){},
						attack : function(actor, target){
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
						},
						
						heal : function(actor, target){
							var healing = engine.healingPoints(actor, target);
							engine.textOut(actor.name + " heals " + target.name + " for " + healing + " HP!");
							target.healHealth(healing);
						},
						
						magic_attack : function(actor, target){
							var damage = engine.special_damage(thisChar, otherChar);
							//console.log(damage);
							engine.textOut(thisChar.name + " attacks " + otherChar.name);
							engine.textOut(otherChar.name + " takes " + damage + " damage");
							otherChar.takeDamage(damage);
						}
						
						};
		},
		
		realizeSkill : function(skillName){
			return skillList[skillName];
		},
	});
	
	return Skill;
	
});
