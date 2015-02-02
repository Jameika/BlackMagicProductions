require(["./character", "./formulae", "./BattleScene", "./mainScreen", "./UIMain"], function(Character, Formulae, BattleScene, MainScreen, UIMain) {
	//sample_funcs['foo']();
	
	$( "#app" ).css( "border", "3px solid red" );
	//addButton("#UITest", function(){alert("Hello World!");});
	
	equ = CQ("Ek = 1/2 * m * v**2");
	equ2 = CQ("c = a**2 + b**2");
	m = equ.solve("m");
	v = equ.solve("v");
	var temp = function(a,b,c)
	{
		console.log(a);
		console.log(b);
		console.log(c);
	};
	temp("hello", "world");
	//console.log(equ.toString());
	//console.log(m.toString());
	//console.log(v.toString());
	a = equ2.sub({"a": 2, "b": 3});
	console.log(a.toString());
	var chara = new Character("Jamal");
	//BattleScene();
	MainScreen();
	//printLine("Hello World!", "#outText");
	//printLine("Greetings, HUMAN.", "#outText");
	//var be = new BattleEngine();
	//be.initializeBattle();
	//be.turn();
	//be.runBattle();
	//console.log(be);
});