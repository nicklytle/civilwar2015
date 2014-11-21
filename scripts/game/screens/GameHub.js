define(
  ['./scene', 'game/screens/testMini', 'game/screens/testescape'],
  function(scene, ShipScreen, EscapeScreen) {
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
    return hubScene;
  }
);