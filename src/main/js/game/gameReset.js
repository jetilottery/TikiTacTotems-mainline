define(function(require) {
  const gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');
  const numberState = require('game/state/numbers');
  const winUpTo = require('game/components/winUpTo');
  const audio = require('skbJet/componentManchester/standardIW/audio');
  const totalWinBar = require('game/components/totalWinBar');
  const gamePlay = require('game/gamePlay');

  function gameReset() {
    numberState.reset();
    winUpTo.reset();
    totalWinBar.reset();
    gamePlay.transition();
    // Fade out the win/lose terminator in case it is still playing
    if (audio.isPlaying('winTerminator')) {
      audio.fadeOut('winTerminator', 1);
    }
    if (audio.isPlaying('loseTerminator')) {
      audio.fadeOut('loseTerminator', 1);
    }

    gameFlow.next('BUY_SCREEN');
  }

  gameFlow.handle(gameReset, 'GAME_RESET');
});
