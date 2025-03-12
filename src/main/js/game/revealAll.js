define(require => {
  const Timeline = require('com/gsap/TimelineLite');
  const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
  const displayList = require('skbJet/componentManchester/standardIW/displayList');

  const symbolList = require('game/components/symbolList');

  let revealAllTimeline;

  function start() {
    const revealWinning = symbolList.revealAll();

    revealAllTimeline = new Timeline();

    // disable all interaction at the parent container level
    displayList.symbolList.interactiveChildren = false;

    // Start with the winning numbers
    revealAllTimeline.add(
      new Timeline({ tweens: revealWinning, stagger: gameConfig.autoPlayWinningNumberInterval })
    );

    // Then the player numbers, with a delay between the winning and player numbers
    // revealAllTimeline.add(
    //   new Timeline({ tweens: revealPlayer, stagger: gameConfig.autoPlayPlayerNumberInterval }),
    //   revealWinning.length > 0 && revealPlayer.length > 0
    //     ? `+=${gameConfig.autoPlayPlayerNumberDelay}`
    //     : '+=0'
    // );

    // End with the bonus item
    revealAllTimeline.add();

    return revealAllTimeline;
  }

  function stop() {

    // kill the revealAll timeline if active
    if (revealAllTimeline) {
      revealAllTimeline.kill();
      revealAllTimeline = undefined;
    }
  }

  return {
    start,
    stop,
  };
});
