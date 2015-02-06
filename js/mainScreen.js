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
		$("#logo").html("<center><h1>[WORKING TITLE]</h1><h2>Attack of the Helmetfish Army</h2></center>");
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