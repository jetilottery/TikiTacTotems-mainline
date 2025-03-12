define(require => {
  const PIXI = require('com/pixijs/pixi');
  const displayList = require('skbJet/componentManchester/standardIW/displayList');
  const utils = require('skbJet/componentManchester/standardIW/layout/utils');
  const audio = require('skbJet/componentManchester/standardIW/audio');
  const resources = require('skbJet/component/pixiResourceLoader/pixiResourceLoader');
  const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
  const autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');
  const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
  const Pressable = require('skbJet/componentManchester/standardIW/components/pressable');
  const meterData = require('skbJet/componentManchester/standardIW/meterData');

  require('com/gsap/TweenLite');
  const Tween = window.TweenLite;

  const cover = new Pressable();
  cover.enabled = false;
  cover.on('press', () => {
    if (!autoPlay.enabled) {
      reveal();
    }
  });

  let prize = 0;
  let revealed = false;
  let resolve;
  let idleTween;
  let idleAnim;

  function randomIdleDuration() {
    return (
      gameConfig.bonusItemIdleInterval -
      gameConfig.idleIntervalVariation +
      Math.random() * gameConfig.idleIntervalVariation * 2
    );
  }

  function reveal() {
    if (resolve) {
      resolve();
    }
  }

  function init() {
    idleTween = Tween.to({}, randomIdleDuration(), {
      onComplete: promptIdle,
      paused: true,
    });

    // Initialize idle animation if frames have been provided
    const idleFrames = utils.findFrameSequence('bonusCoverIdle');
    if (idleFrames.length > 0) {
      idleAnim = new PIXI.extras.AnimatedSprite(idleFrames.map(PIXI.Texture.from));

      idleAnim.onComplete = () => {
        idleAnim.visible = false;
        displayList.bonusCover.visible = true;
      };
      idleAnim.loop = false;
      idleAnim.animationSpeed = 0.5;
      idleAnim.anchor.set(0.5);
      idleAnim.visible = false;
      cover.addChild(idleAnim);
    }

    cover.addChild(displayList.bonusCover, displayList.bonusLabel);
    displayList.bonusCard.addChild(cover);
    displayList.bonusWin.visible = false;
    displayList.bonusNoWin.visible = false;
  }

  function promptIdle() {
    // Cancel if the bonus item was already revealed
    if (revealed || !idleAnim) {
      return;
    }

    // Switch to the idle anim and play it
    displayList.bonusCover.visible = false;
    idleAnim.visible = true;
    idleAnim.gotoAndPlay(0);

    // Restart the idle timer tween
    idleTween.duration(randomIdleDuration());
    idleTween.play(0);
  }

  function populate(data) {
    prize = data;
    revealed = false;
    const formattedPrize = SKBeInstant.formatCurrency(data).formattedAmount;
    displayList.bonusWinText.text = resources.i18n.Game.bonusWin.replace('{0}', formattedPrize);
  }

  async function enable() {
    // Start the idle timer tween
    idleTween.play(0);

    // Enable interaction with the cover and wait until it is pressed
    cover.enabled = true;
    await new Promise(r => {
      resolve = r;
    });

    // Disable to prevent double presses
    resolve = undefined;
    cover.enabled = false;

    revealed = true;
    resolve = undefined;
    cover.enabled = false;

    // Wait for the uncover animation (if animated)
    // await card.uncover();

    // Hide the cover, show the value
    cover.visible = false;

    // If a bonus prize was awarded
    if (prize > 0) {
      // Play the Bonus reveal audio
      audio.play('bonusWin');
      // Update the win meter with the win
      meterData.win += prize;
      // Show the bonus prize with a bounce
      displayList.bonusWin.visible = true;
      Tween.fromTo(
        displayList.bonusWin.scale,
        0.75,
        {
          x: 0.666,
          y: 0.666,
        },
        {
          x: 1,
          y: 1,
          ease: window.Elastic.easeOut.config(
            gameConfig.matchAnimAmplitude,
            gameConfig.matchAnimPeriod
          ),
        }
      );
    } else {
      // Otherwise no bonus prize, show the nowin message and play the nowin audio
      displayList.bonusNoWin.visible = true;
      audio.play('bonusNoWin');
    }
  }

  function reset() {
    resolve = undefined;
    cover.enabled = false;
    cover.visible = true;
    displayList.bonusWin.visible = false;
    displayList.bonusNoWin.visible = false;
  }

  function autoReveal() {
    // Stop the idle timer tween
    idleTween.pause(0);
    // If already revealed return an empty Tween
    if (revealed) {
      return new Tween({});
    }  
    // otherwise return a Tween that calls reveal after the configured delay
    return Tween.delayedCall(gameConfig.autoPlayPlayerNumberDelay, reveal);
  }

  return {
    init,
    populate,
    enable,
    autoReveal,
    reset,
  };
});
