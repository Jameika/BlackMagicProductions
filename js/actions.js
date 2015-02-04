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
			}
			else
			{
				var damage = Math.floor(engine.Physical_Damage(actor, actor) * engine.variance());
				if (damage > 0)
				{
					actor.takeDamage(damage);
				}
				else
				{
					actor.takeDamage(-1 * damage);
				}
			}
		}
	};
	
	return actions;
});
