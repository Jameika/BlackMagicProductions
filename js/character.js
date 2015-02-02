/**
 * @author Joe Mazeika
 * The class that exists for every character involved in a battle
 */

define([], function() {
	var character = Class.extend({
		init : function(JSON_char)
		{
			for (var v in JSON_char)
			{
				this[v] = JSON_char[v];
			}
			if (this.maxHP)
			{
				this.curHP = this.maxHP;
			}
			if (this.HP)
			{
				this.curHP = this.HP;
				this.maxHP = this.HP;
			}
			this.isKOed = false;
		},
		
		takeDamage : function(damage)
		{
			this.curHP -= damage;
			if (this.curHP <= 0)
			{
				this.isKOed = true;
				this.curHP = 0;
				console.log("KOed");
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
	});
	
	return character;
});