var topDiv = "#mainFrame";

function addButton(divID, label, callBack){
	if (divID[0] != "#")
	{
		divID = "#" + divID;
	}
	var div = $(divID);
	var r = $('<input/>').attr({type: "button", id: "field", value: label, class: "btnclass"});
	r.click(callBack);
	div.append(r);
};

function addMenu(divID, labelList)
{
	
}

function addImage(location, divID)
{
	if (divID[0] != "#")
	{
		divID = "#" + divID;
	}
	var divText = $(divID).html();
	$(divID).html(divText + "<img src =\"" + location + "\">");
}

function printLine(newText, divID)
{
	if (divID[0] != "#")
	{
		divID = "#" + divID;
	}
	var divText = $(divID).html();
	$(divID).html(divText + "<p>" + newText + "</p>");
	/*if (divText != ''){
		$(divID).html(divText + "<br>" + newText);
	}
	else{
		$(divID).html(newText);
	}*/
	$(divID).scrollTop($(divID)[0].scrollHeight);;	
}

function addDiv(newID, target)
{
	if (target[0] != "#")
	{
		target = "#" + target;
	}
	$(target).html($(target).html() + "<div id=\"" + newID + "\"></div>");
}

function addCanvas(newID, target, width, height)
{
	if (target[0] != "#")
	{
		target = "#" + target;
	}
	console.log("Draw canvas!");
	$(target).html($(target).html() + "<canvas id=\"" + newID + "\" width=\"" + width + "\" height=\"" + height + "\"></canvas>");
}

function clearDiv(divID)
{
	if (divID[0] != "#")
	{
		divID = "#" + divID;
	}
	$(divID).html("");
}

/*
 * Need to make a DIV for the text output
 * Either that or start up a graphics system
 * ... this should get interesting very quickly
 * Maybe look into the thing that COMRADE SQUINK used?
 * 
 */