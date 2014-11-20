define(
  ['./scene', 'game/screens/testMini', 'game/screens/testescape'],
  function(scene, ShipScreen, EscapeScreen) {
    var hubScene = scene('data/scenes/hub.json');
    hubScene.startEscapeGame = function() {
      this.changeScreen(EscapeScreen);
    };
    hubScene.startShipGame = function() {
      //alert(ShipScreen);
      this.changeScreen(ShipScreen);
    };
    return hubScene;
  }
);