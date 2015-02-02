/**
 * @author Joe Mazeika
 * This is the Main Menu
 * For now, there's only two things that can be done here
 * First - the player can choose the battle engine parameters
 * Second - the player can start the battle
 * Eventually, this will also give Character customization options
 * Among other things, but for now, we bake in characters
 */
define(["./UIMain", "./BattleScreen", "./formulae"], function(UIMain, BattleScreen, formulae){
	
	function loadMenuUI(){
		clearDiv(topDiv);
		//Add dropdown menus to give current battle options
		addForm("optionForm", topDiv);
		addDiv("menuDiv0", "optionForm");
		addDiv("menuDiv1", "optionForm");
		addDiv("menuDiv2", "optionForm");
		addDiv("menuDiv3", "optionForm");
		var i = 0;
		for (var v in User.currentBattleParameters)
		{
			//We have the info we need to make the menu at this point
			var targetDiv = "menuDiv" + i;
			var newText = "<h3>" + v + "</h3>";
			for (var item in formulae[v])
			{
				var t = '<input type="radio" name="' + v + '" value="' + item + '"';
				if (User.currentBattleParameters[v] == item)
				{
					t += 'checked';
				}
				t += '>' + item + '<br>';
				newText += t;
			}
			appendHTML(newText, targetDiv);
			console.log(newText);
			console.log(User.currentBattleParameters[v]);
			console.log(formulae[v]);
			i++;
			if (i == 4) i = 0;
		}
		addDiv('menuButtonDiv', "menuDiv3");
		var buttonHTML = '<button type="submit">Begin Battle</button></form>';
		appendHTML(buttonHTML, 'menuButtonDiv');
		
		var processForm = function(e) {
			if (e.preventDefault) e.preventDefault();
			
			console.log("HELLO WORLD!");
			console.log(e);
			console.log($("#optionForm"));
			var $input=$('#optionForm :input');
			var usernameInput = $input.filter('[name="sex"]');
			console.log(usernameInput);
			for (var i = 0; i < usernameInput.length; i++)
			{
				console.log(i);
				console.log(usernameInput[i].value);
				console.log(usernameInput[i].checked);
			}
			console.log(usernameInput);
			
			//BattleScreen(MainMenu);
			return false;
		};

		var form = document.getElementById('optionForm');
		if (form.attachEvent) {
		    form.attachEvent("submit", processForm);
		} else {
		    form.addEventListener("submit", processForm);
		}
		
		addButton(topDiv, "Begin Battle", function(){
			console.log("BUTTON OUT");
			
			BattleScreen(MainMenu);
		});
	};
	
	var MainMenu = function(){
		loadMenuUI();
		
	};
	
	return MainMenu;
});