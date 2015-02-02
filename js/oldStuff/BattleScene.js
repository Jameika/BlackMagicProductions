define(["./BattleEngine", "./UIMain", "./EnemyGenerator"], function(BattleEngine, UIMain, EnemyGenerator){
	var createBattle = function(){
		buildUI();
		console.log($("#mainFrame").html());
		var be = new BattleEngine();
		be.setFunction("phys_damage_funcs", "d1");
		be.setFunction("toHit_funcs", "simple");
		be.textOut = function(text){
			printLine(text, "#outText");
		};
		addButton("#UITest", "Target[0]", function(){
			be.inputIn({
				action: "attack",
				target: be.enemyCharacters[0]
			});
		});
		addButton("#UITest", "Target[1]", function(){
			be.inputIn({
				action: "attack",
				target: be.enemyCharacters[1]
			});
		});
		console.log(be["totalChars"]);
		var enemyGen = new EnemyGenerator(be,be.playerCharacters);
		enemyGen.buildEnemy();
		be.initializeBattle();
	};
	
	function buildUI(){
		clearDiv("#mainFrame");
		addDiv("app", "mainFrame");
		addDiv("UITest", "mainFrame");
		addDiv("outText", "mainFrame");
		$("#mainFrame").html($("#mainFrame").html() + "<br>");
		addDiv("characterDiv", "mainFrame");
	};
	
	return createBattle;
});
