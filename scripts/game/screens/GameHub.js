define(
  ['./scene', 'game/screens/testMini', 'game/screens/testescape', 'lib/pixi'],
  function(scene, ShipScreen, EscapeScreen, nextscene) {
	
	var count = [];
    var hubScene = scene('data/scenes/hub.json');
	hubScene.music = new Audio('/assets/music/town_music.ogg');
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
	
	 var i = count.length;
	 var nocontains = true;
    while (i--) {
       if (count[i] === obj) {
	   nocontains = false;
       }
    }
    if(nocontains){
	count++;
	count+="Harriet Tubman";
console.log(count);
console.log(count[i]);
}
    };
    return hubScene;
  }
);