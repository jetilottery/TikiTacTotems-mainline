define(function (require) {
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    const revealAll = require('game/revealAll');
    const totalWinBar = require('game/components/totalWinBar');
    const gamePlay = require('game/gamePlay');


    async function startReveal() {
        // Listen for autoplay activation which triggers the remaining cards to reveal automatically
        msgBus.subscribe('Game.AutoPlayStart', revealAll.start);

        // Listen for autoplay deactivation which cancels the revealAll timeline
        msgBus.subscribe('Game.AutoPlayStop', revealAll.stop);
        gamePlay.start();
        // Enable all of the winning numbers and player numbers, wait until they are all revealed
        // continue to the next state
        msgBus.subscribe('Game.EndOfGame', function endPlay() {
            msgBus.unsubscribe('Game.EndOfGame', endPlay);
            if(!gameConfig.showResultScreen) {
                totalWinBar.show(gamePlay.getState());
            }
            gameFlow.next('REVEAL_COMPLETE');
        });
    }

    gameFlow.handle(startReveal, 'START_REVEAL');
});
