define(require => {

    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    const resources = require('skbJet/component/resourceLoader/resourceLib');
    const meterData = require('skbJet/componentManchester/standardIW/meterData');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const PIXI = require('com/pixijs/pixi');

    require('com/gsap/TimelineMax');
    require('com/gsap/easing/EasePack');
    require('com/gsap/easing/CustomEase');
    require('com/gsap/TweenLite');

    const Tween = window.TimelineMax;

    const custTween = window.CustomEase.create("custom", "M0,0 C0.266,0.412 0.316,0.344 0.5,1.1 0.517,1.173 0.666,1.138 0.673,1.038 0.692,0.774 0.974,1.006 1,1");

    let totalWinBar;
    let totalWinValue;
    let totalWinLabel;

    let value = 0;

    let startPosition = [530,700];
    let midPosition = [430,630];

    function init() {
        totalWinBar = displayList.totalWinBar;
        totalWinValue = displayList.totalWinValue;
        totalWinLabel = displayList.totalWinLabel;
        totalWinBar.alpha = 0;

        msgBus.publish('animation.play', { index:'winEffect',anim:'animation'});
    }

    function update(val) {
        value += val;
        totalWinValue.text = SKBeInstant.formatCurrency(value).formattedAmount;
    }

    function updateLabel(val) {
        switch (val) {
            case 'baseGameOnly': {
                totalWinLabel.text = resources.i18n.game.Game.totalWin;
                break;
            }
            case 'bonusWinOnly' : {
                totalWinLabel.text = resources.i18n.game.Game.bonusWin;
                break;
            }
            case 'baseGameIntoBonus' : {
                totalWinLabel.text = resources.i18n.game.Game.baseGameWin;
                break;
            }
            case 'baseGameAndBonusEnd' : {
                totalWinLabel.text = resources.i18n.game.Game.totalWin;
                break;
            }
        }
    }

    function reset() {
        value = 0;
        totalWinValue.text = " ";
        totalWinBar.alpha = 0;

        totalWinBar.children.forEach((e)=>{
            if(e instanceof PIXI.spine.Spine) {
                e.alpha = 1;
            }
        });
    }

    function show(state) {
        displayList.animationLayer.visible = true;

        winTerm(state);
        let animation = undefined;

        totalWinBar.children.forEach((e)=>{
            if(e instanceof PIXI.spine.Spine) {
                animation = e;
            }
        });

        if(meterData.totalWin > 0) {
            let showBarTimeLine = new Tween();
            let ori = orientation.get() === orientation.LANDSCAPE ? 0 : 1;

            totalWinBar.alpha = 0;
            totalWinBar.y = startPosition[ori];

            showBarTimeLine.to(totalWinBar,gameConfig.totalWinBarDelay,{
                ease: custTween,
                y:midPosition[ori],
                alpha:1
            },0);

            showBarTimeLine.to(animation,gameConfig.rayFade,{
                delay: gameConfig.rayDelay,
                alpha:0
            });
        }
    }

    function winTerm(state) {
        let terminator;

        if(state !== "BASEGAME") {
            terminator = meterData.totalWin > 0 ? 'winTerminatorNight' : 'loseTerminatorNight';
        } else {
            terminator = meterData.totalWin > 0 ? 'winTerminator' : 'loseTerminator';
        }

        audio.fadeOut('music', gameConfig.resultMusicFadeOutDuration);

        audio.play(terminator, false);

    }

    return {
        show,
        init,
        update,
        reset,
        updateLabel,
    };

});