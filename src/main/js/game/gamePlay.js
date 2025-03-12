define(function (require) {

    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const scenarioData = require('skbJet/componentManchester/standardIW/scenarioData');
    const bonusBoard = require('game/components/bonusBoard');
    const bonusParticle = require('game/components/bonusParticles');
    const totalWinBar = require('game/components/totalWinBar');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    const winLines = require('game/components/winLines');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const dropButton = require('game/components/dropButton');
    const symbolList = require('game/components/symbolList');
    const payTable = require('game/components/paytable');

    require('com/gsap/TweenMax');
    require('com/gsap/easing/CustomEase');

    const Tween = window.TweenMax;


    let bonusBackground;

    let bonusGameIndex = 0;
    let boardIndex = 3;

    let state = undefined;
    let gameTable = undefined;
    let gameWinTable = undefined;

    function init() {
        bonusBackground = displayList.backgroundBonusGame;
        bonusBackground.alpha = 0;

        bonusGameIndex = 0;
        bonusParticle.init();
        totalWinBar.init();
        bonusBoard.init();

        displayList.animationLayer.visible = false;
    }

    async function start() {
        state = 'BASEGAME';
        bonusGameIndex = 0;
        boardIndex = 3;
        await payTable.close();

        baseGame();
    }

    async function reset() {
        return new Promise(async resolve => {
            bonusBoard.reset();
            totalWinBar.reset();
            bonusParticle.reset();
            resolve();
        });
    }

    function checkNextGameState() {
        if (scenarioData.scenario.wildCard) {
            bonusGame();
        } else {
            displayList.scoreBoardButton.enabled = true;
            msgBus.publish('Game.EndOfGame');
        }
    }

    async function baseGame() {
        if (state === 'BONUSGAME') {
            await symbolList.reset();
            state = "BASEGAME";
        }
        bonusBoard.hide();
        gameTable = 'baseGame';
        gameWinTable = 'baseGameWins';
        dropButton.show();
        symbolList.enable();
        winLines.reset();
        symbolList.populate(scenarioData.scenario[gameTable], gameWinTable);
        bonusBoard.preWarm();
    }

    async function bonusGame() {
        if (state === 'BASEGAME') {
            audio.play('transition',0,true);
            bonusParticle.bonusSymbol.bonusPopulate(gameConfig.bonusParticleSpeed*3);
            audio.play('musicNight',-1);
            for (let i = 0; i < 3; i++) {
                await bonusParticle.emit(i);
                bonusBoard.addOne(i);
            }
            state = "BONUSGAME";
        }
        bonusBoard.show();

        if (bonusGameIndex < 3) {
            gameTable = 'bonusGame_' + (bonusGameIndex + 1);
            gameWinTable = 'bonusGameWins_' + (bonusGameIndex + 1);
            winLines.reset();
            symbolList.populate(scenarioData.scenario[gameTable], gameWinTable);
            symbolList.enable();
            bonusGameIndex++;
            boardIndex--;
            Tween.to({}, 0, {
                delay: gameConfig.nextBonusDrop,
                onComplete: async () => {
                    await symbolList.reset(1);
                    bonusBoard.removeOne(boardIndex);
                }
            });
        } else {
            displayList.scoreBoardButton.enabled = true;
            msgBus.publish('Game.EndOfGame');
        }
    }

    function transition() {
        Tween.to(bonusBackground, 1, {
            alpha: 0
        });

        if(displayList.infoText.visible === false) {
            displayList.infoText.alpha = 0;
            displayList.infoText.visible = true;
            Tween.to(displayList.infoText,1,{
                alpha: 0.7
            });
        }
    }

    function getState() {
        return state;
    }


    msgBus.subscribe('Game.CheckNextGameState', checkNextGameState);

    return {
        init,
        reset,
        start,
        getState,
        transition
    };
})
;