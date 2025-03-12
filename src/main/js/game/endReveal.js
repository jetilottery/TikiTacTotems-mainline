define(function(require) {
  const gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');
  const dropButton = require('game/components/dropButton');

  async function endReveal() {
    dropButton.hide();
    // IMPLEMENT: Wait until the game is fully revealed before continuing
    // You may need to wait for a prizetable to animate, or for the user to reveal the remaining
    // non-winning items. Before continuing the user must have seen the whole reveal and be shown
    // the final win value. Definitely don't set win meter to meterData.totalWin, that's cheating.
    gameFlow.next('REVEAL_COMPLETE');
  }

  gameFlow.handle(endReveal, 'END_REVEAL');
});
