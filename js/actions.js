/**
 * @author Joe Mazeika
 * Class that defines all actions
 */

define([], function(){
	
	actions = {
		"Attack" : function(engine, actor, target, testing){
			console.log("CHARGE!");
			if (testing)
			{
				var damage = Math.floor(engine.toHit(actor, target,true) * engine.Physical_Damage(actor, target) * engine.variance(true)) + 1;
				var critChance = engine.critical_chance(actor, true);
				var critDamage = engine.critical_damage(actor, damage, true);
				return damage * (1 - critChance) + critDamage * (critChance);
			}
			if (engine.toHit(actor, target))
			{
				var damage = Math.floor(engine.Physical_Damage(actor, target) * engine.variance()) + 1;
				if (engine.critical_chance(actor))
				{
					damage = engine.critical_damage(actor, damage);
					printLine("CRITICAL HIT!<br>" + actor.name + " attacks " + target.name + "<br>" + target.name + " takes " + damage + " damage!", "outText");
					target.takeDamage(damage);
				}
				else
				{
					printLine(actor.name + " attacks " + target.name + "<br>" + target.name + " takes " + damage + " damage!", "outText");
					target.takeDamage(damage);
				}
			}
			else
			{
				printLine(actor.name + " attacks " + target.name + "<br>" + actor.name + " missed!", "outText");
			}
		},
		
		"Ray" : function(engine, actor, target, testing){
			if(testing) return Math.floor(engine.Magical_Damage(actor, target) * engine.variance(true)) + 1;
			var damage = Math.floor(engine.Magical_Damage(actor, target) * engine.variance()) + 1;
			printLine(actor.name + " casts Ray at " + target.name + "<br>" + target.name + " takes " + damage + " damage!", "outText");
			target.takeDamage(damage);
		},
		
		"Supplex" : function(engine, actor, target, testing){
			if (testing) return Math.floor(engine.toHit(actor, target,true) * engine.toHit(actor, target,true) * engine.Physical_Damage(actor, target)) * Math.floor(engine.Physical_Damage(actor, target) * engine.variance(true)) + 1;
			if (engine.toHit(actor, target) && engine.toHit(actor, target))
			{
				var damage = Math.floor(engine.Physical_Damage(actor, target)) * Math.floor(engine.Physical_Damage(actor, target) * engine.variance()) + 1;
				target.takeDamage(damage);
				printLine(actor.name + " supplexes " + target.name + "<br>" + target.name + " takes " + damage + " damage!", "outText");
			}
			else
			{
				
				var damage = Math.floor((actor.attack) * engine.variance());
				if (damage < 0)
				{
					damage = -1 * damage;
				}
				actor.takeDamage(damage);
				printLine(actor.name + "'s supplex missed!<br>" + actor.name + " takes " + damage + " damage!", "outText");
			}
		},
		
		"Cure" : function(engine, actor, target, testing){
			if (testing) return undefined;
			var healing = Math.floor(engine.Magical_Damage(actor, {specialDefense : 40}) * engine.variance()) + 1;
			target.healHealth(healing);
			printLine(actor.name + " casts Cure on " + target.name + "<br>" + target.name + " heals " + healing + " health!", "outText");
		},
	};
	
	return actions;
});
