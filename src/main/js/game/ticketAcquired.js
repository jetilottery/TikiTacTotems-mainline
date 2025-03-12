define((require) => {
  const scenarioData = require('skbJet/componentManchester/standardIW/scenarioData');
  const gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');
  const audio = require('skbJet/componentManchester/standardIW/audio');
  const gamePlay = require('game/gamePlay');

  async function ticketAcquired() {
    await gamePlay.reset();
    console.log(scenarioData);
    
    if (!audio.isPlaying('music')) {
      audio.play('music', true);
    }

    gameFlow.next('START_REVEAL');
  }

  gameFlow.handle(ticketAcquired, 'TICKET_ACQUIRED');
});
