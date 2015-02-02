/**
 * @author Joe Mazeika
 * This is the title/login screen
 * Login features will be added in future builds
 */
define(["./MainMenuScreen", "./Authentication", "./UIMain"], function(MainMenuScreen, Authentication, UIMain){
	var TurnOn = function(){
		//Set the view
		clearDiv(topDiv);
		addDiv("logo", topDiv);
		$(topDiv).html($(topDiv).html() + "<br>");
		addDiv("login", topDiv);
		addButton("#login", "Enter", function(){
			if (authenticatePlayer())//Dummy function for now
			{
				MainMenuScreen();
			}
		});
	};
	
	function authenticatePlayer()
	{
		username = "Temp User"; //Get from input field
		password = "password"; //Again, from input field
		return Authentication.authenticate(username, password);
	}
	
	return TurnOn;
});