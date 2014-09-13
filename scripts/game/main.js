define(
  ["engine/base", "engine/classes/Game", "game/screens/teststart", "game/constants"],
  function(engine, Game, start, constants) {
    engine.DEBUG_MODE = true;
    window.g = new Game(constants.STAGE_W, constants.STAGE_H, start);
    g.init('#display-container');
});