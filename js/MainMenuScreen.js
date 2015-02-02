/**
 * @author Joe Mazeika
 * This is the Main Menu
 * For now, there's only two things that can be done here
 * First - the player can choose the battle engine parameters
 * Second - the player can start the battle
 * Eventually, this will also give Character customization options
 * Among other things, but for now, we bake in characters
 */
define(["./UIMain", "./BattleScreen"], function(UIMain, BattleScreen){
	
	function loadMenuUI(){
		clearDiv(topDiv);
		//Add dropdown menus to give current battle options
		addButton(topDiv, "Begin Battle", function(){
			BattleScreen(MainMenu);
		});
	};
	
	var MainMenu = function(){
		loadMenuUI();
		
	};
	
	return MainMenu;
});