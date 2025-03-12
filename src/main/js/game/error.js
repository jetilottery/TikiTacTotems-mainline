define(function(require) {
  const gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');
  const winlines = require('game/components/winLines');
  const scenarioData = require('skbJet/componentManchester/standardIW/scenarioData');

  function error() {
    // stop reveal all if active
    winlines.reset();
    scenarioData.scenario.wildCard = false;
  }

  gameFlow.handle(error, 'ERROR');
});
