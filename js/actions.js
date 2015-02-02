/**
 * @author Joe Mazeika
 * Class that defines all actions
 */

define([], function(){
	
	actions = {
		"Attack" : function(engine, actor, target){
			if (engine.toHit(actor, target))
			{
				var damage = Math.floor(engine.Physical_Damage(actor, target) * engine.variance()) + 1;
				if (engine.critical_chance(actor))
				{
					var damage = engine.critical_damage(actor, damage);
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
		
		"Ray" : function(engine, actor, target){
			printLine();
			var damage = Math.floor(engine.Magical_Damage(actor, target) * engine.variance()) + 1;
			printLine(actor.name + " casts Ray at " + target.name + "<br>" + target.name + " takes " + damage + " damage!", "outText");
			target.takeDamage(damage);
		}
	};
	
	return actions;
});
