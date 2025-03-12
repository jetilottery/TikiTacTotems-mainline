define(require => {
  const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  const displayList = require('skbJet/componentManchester/standardIW/displayList');
  const meterData = require('skbJet/componentManchester/standardIW/meterData');
  const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
  const PlayerNumber = require('game/components/PlayerNumber');
  const numberState = require('game/state/numbers');
  const audio = require('skbJet/componentManchester/standardIW/audio');

  require('com/gsap/TweenLite');
  const Tween = window.TweenLite;

  let cards;
  let numbers;

  let idleTween;

  function randomIdleDuration() {
    return (
      gameConfig.playerNumberIdleInterval -
      gameConfig.idleIntervalVariation +
      Math.random() * gameConfig.idleIntervalVariation * 2
    );
  }

  function init() {
    idleTween = Tween.to({}, randomIdleDuration(), {
      onComplete: promptIdle,
      paused: true,
    });

    cards = [
      PlayerNumber.fromContainer(displayList.playerNumber1),
      PlayerNumber.fromContainer(displayList.playerNumber2),
      PlayerNumber.fromContainer(displayList.playerNumber3),
      PlayerNumber.fromContainer(displayList.playerNumber4),
      PlayerNumber.fromContainer(displayList.playerNumber5),
      PlayerNumber.fromContainer(displayList.playerNumber6),
      PlayerNumber.fromContainer(displayList.playerNumber7),
      PlayerNumber.fromContainer(displayList.playerNumber8),
      PlayerNumber.fromContainer(displayList.playerNumber9),
      PlayerNumber.fromContainer(displayList.playerNumber10),
      PlayerNumber.fromContainer(displayList.playerNumber11),
      PlayerNumber.fromContainer(displayList.playerNumber12),
      PlayerNumber.fromContainer(displayList.playerNumber13),
      PlayerNumber.fromContainer(displayList.playerNumber14),
      PlayerNumber.fromContainer(displayList.playerNumber15),
    ];
  }

  function promptIdle() {
    // Check if there are any remaining unrevealed cards
    const unrevealed = cards.filter(number => !number.revealed);
    if (unrevealed.length === 0) {
      return;
    }

    // Pick one at random to animate
    unrevealed[Math.floor(unrevealed.length * Math.random())].prompt();

    // Restart the idle timer tween
    idleTween.duration(randomIdleDuration());
    idleTween.play(0);
  }

  function populate(data) {
    numbers = data;
  }

  function enable() {
    // Start the idle timer tween
    idleTween.play(0);

    // Return an array of promises for each card's lifecycle
    return cards.map(async card => {
      // Enable the card and wait for it to be revealed (manually or automatically)
      await card.enable();
      // Restart the idle timer tween
      idleTween.play(0);
      // Play the Player Number reveal audio
      audio.playSequential('playerNumber');
      // Get the next Winning Number
      const nextData = numbers.shift();
      // Populate the card with the next Player Number, ready to be uncovered
      card.populate(nextData);
      // Wait for the uncover animation (if animated)
      await card.uncover();
      msgBus.publish('Game.PlayerNumber', nextData[0]);
      // If the revealed number matches a revealed Winning Number then mark the match
      if (!card.matched && numberState.winning.includes(nextData[0])) {
        card.match();
        audio.playSequential('match');
        meterData.win += card.value;
        await card.presentWin();
      }
    });
  }

  function revealAll() {
    // Stop the idle timer tween
    idleTween.pause(0);
    // Get all the cards yet to be revealed
    const unrevealed = cards.filter(number => !number.revealed);
    // Return an array of tweens that calls reveal on each card in turn
    return unrevealed.map(number => Tween.delayedCall(0, number.reveal, null, number));
  }

  function reset() {
    cards.forEach(number => number.reset());
  }

  function checkMatch(winningNumber) {
    const matchedCard = cards.find(
      card => card.revealed && !card.matched && card.number === winningNumber
    );
    if (matchedCard) {
      matchedCard.match();
      matchedCard.presentWin();
      meterData.win += matchedCard.value;
      audio.playSequential('match');
    }
  }

  msgBus.subscribe('Game.WinningNumber', checkMatch);

  return {
    init,
    populate,
    enable,
    revealAll,
    reset,
  };
});
