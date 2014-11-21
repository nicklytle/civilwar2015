define(
  ['./scene', 'game/screens/testMini', 'game/screens/testescape', 'lib/pixi'],
  function(scene, ShipScreen, EscapeScreen, nextscene) {
	
	var famousarray = ["Test", "Jerk"];
	var count = 0;
    var hubScene = scene('data/scenes/hub.json');
	hubScene.music = new Audio('/assets/music/town_music.ogg');
	hubScene.music.loop = true;
	hubScene.music.play();
    hubScene.startEscapeGame = function() {
      this.changeScreen(EscapeScreen);
    };
    hubScene.startShipGame = function() {
      //alert(ShipScreen);
	  hubScene.music.pause();
	  ShipScreen.music.play();
      this.changeScreen(ShipScreen);
    };
	hubScene.test = function() {
	var obj = "Harriet Tubman";

	 var i = famousarray.length;
	 var nocontains = true;
    for (i=0;i<famousarray.length;i++) {
		console.log(famousarray[i]);
       if (famousarray[i] === obj) {
	   nocontains = false;
       }
    }
    if(nocontains){
	count++;
	famousarray.push("Harriet Tubman");
console.log(count);
//console.log(famousarray[i]);
alert("Famous Person " + count + "/3 Found!: Harriet Tubman - A Conductor on the Underground Railroad who helped many slaves escape to freedom!");
}
    };
	hubScene.test2 = function() {
	
	 var i = famousarray.length;
	 var nocontains = true;
	 obj = "General McClellan";
    while (i--) {
       if (famousarray[i] === obj) {
	   nocontains = false;
       }
    }
    if(nocontains){
	count++;
	famousarray.push("General McClellan");
console.log(count);
console.log(famousarray[i]);
alert("Famous Person " + count + "/3 Found!: General McClellan - Leader of the Union Army for the first half of The Civil War");
}
    };
hubScene.test3 = function() {
	
	 var i = famousarray.length;
	 var nocontains = true;
	 obj = "Abraham Lincoln";
    while (i--) {
       if (famousarray[i] === obj) {
	   nocontains = false;
       }
    }
    if(nocontains){
	count++;
	famousarray.push("Abraham Lincoln");
console.log(count);
console.log(famousarray[i]);
alert("Famous Person " + count + "/3 Found!: Abraham Lincoln - Commander in Chief of the United States during these troubling times");
}
    };
    return hubScene;
  }
);