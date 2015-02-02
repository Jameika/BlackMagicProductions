/**
 * @author Joe Mazeika
 */
define(["./BattleScene", "./UIMain"], function(BattleScene, UIMain){
	var TurnOn = function(){
		//BattleScene();
		clearDiv(topDiv);
		addDiv("logo", topDiv);
		$(topDiv).html($(topDiv).html() + "<br>");
		addDiv("login", topDiv);
		addButton("#login", "Enter", function(){
			BattleScene();
			});
	};
	
	return TurnOn;
});