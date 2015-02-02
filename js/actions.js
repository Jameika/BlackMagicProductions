/**
 * @author Joe Mazeika
 * Class that defines all actions
 */

define([], function(){
	
	actions = {
		"Attack" : function(engine, actor, target){
			printLine(actor.name + " attacks " + target.name, "outText");
			if (engine.toHit(actor, target))
			{
				var damage = engine.Physical_Damage(actor, target);
				printLine(target.name + " takes " + damage + " damage!", "outText");
				target.takeDamage(damage);
			}
			else
			{
				printLine(actor.name + " missed!", "outText");
			}
		},
		
		"Ray" : function(engine, actor, target){
			printLine(actor.name + " casts Ray at " + target.name, "outText");
			var damage = engine.Magical_Damage(actor, target);
			printLine(target.name + " takes " + damage + " damage!", "outText");
			target.takeDamage(damage);
		}
	};
	
	return actions;
});
