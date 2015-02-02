/**
 * @author Joe Mazeika
 * This is the title/login screen
 * Handles the important security stuff
 * But now of that is in this build, so we can safely just not care for now
 */

define(["./UserData"], function(UserData){
	
	function hashCredentials(username, password)
	{
		//OBVIOUSLY NOT ACTUAL CRYPTO
		return [username,password];
	};
	
	function loadUserData(username)
	{
		//Loads the stored user data
		//For now, just load the defaults
		User = new UserData();
	};
	
	var authFuncs = {
		authenticate: function(username, password){
			//Tests to see if the passed user/pword pair is valid
			//Overly broken
			loadUserData(username);
			return true;
		},
		
	};
	
	return authFuncs;
});