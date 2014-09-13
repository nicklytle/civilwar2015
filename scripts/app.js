requirejs.config({
  urlArgs: "bust=" +  (new Date()).getTime(), // remove this for production
  baseUrl: "/scripts/lib",
  paths: {
    global: "/scripts/global",
    engine: "/scripts/engine",
    game: "/scripts/game",
  },
  shim: {
    'pixi': {
      exports: 'PIXI',
    },
  },
});

requirejs(['game/main']);