define(
  ["engine/base", "engine/classes/Game", "game/screens/teststart", "game/constants"],
  function(engine, Game, start, constants) {
    'use strict';
    engine.DEBUG_MODE = true;
    var game = new Game(constants.STAGE_W, constants.STAGE_H, start);
    game.init('#display-container');
});