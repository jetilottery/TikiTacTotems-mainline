define(require => {

    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const prizeData = require('skbJet/componentManchester/standardIW/prizeData');
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const PayTableLine = require('game/components/paytableLine');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    require('com/gsap/TweenLite');
    require('com/gsap/easing/CustomEase');

    const Tween = window.TweenLite;
    let speed = 0.1;

    let lines = [];

    let scoreBoardOpen = false;

    function init() {
        lines = {
            'S01': new PayTableLine(displayList.scoreBoard_starMaskContainer),
            'S02': new PayTableLine(displayList.scoreBoard_moonMaskContainer),
            'S03': new PayTableLine(displayList.scoreBoard_straightFacedContainer),
            'S04': new PayTableLine(displayList.scoreBoard_parrotContainer),
            'S05': new PayTableLine(displayList.scoreBoard_fishContainer),
            'S06': new PayTableLine(displayList.scoreBoard_flowerContainer),
        };

        displayList.scoreBoardButton.visible = false;
        displayList.scoreBoardClose.visible = false;
        if (orientation.get() === orientation.PORTRAIT) {
            displayList.scoreBoardButton.visible = true;
            displayList.scoreBoard.visible = false;

            displayList.scoreBoard.pivot.x = 500;
            displayList.scoreBoard.pivot.y = -100;

            if(gameConfig.showPayTableOnLoad === true) {
                open();
            }

        }

        displayList.scoreBoardButton.on('press', () => {
            open();
            audio.play('click', false);
        });

        displayList.scoreBoardClose.on('press',()=>{
            close();
            audio.play('click', false);
        });



    }

    function populate() {
        displayList.scoreBoard_starMaskValue.text = SKBeInstant.formatCurrency(prizeData.prizeTable.A).formattedAmount;
        displayList.scoreBoard_moonMaskValue.text = SKBeInstant.formatCurrency(prizeData.prizeTable.B).formattedAmount;
        displayList.scoreBoard_straightFacedMaskValue.text = SKBeInstant.formatCurrency(prizeData.prizeTable.C).formattedAmount;
        displayList.scoreBoard_parrotValue.text = SKBeInstant.formatCurrency(prizeData.prizeTable.D).formattedAmount;
        displayList.scoreBoard_fishValue.text = SKBeInstant.formatCurrency(prizeData.prizeTable.E).formattedAmount;
        displayList.scoreBoard_flowerValue.text = SKBeInstant.formatCurrency(prizeData.prizeTable.F).formattedAmount;
    }

    function highlight(data) {
        lines[data].show(data);
    }

    function open() {
        displayList.scoreBoard.visible = true;
        displayList.scoreBoardButton.enabled = false;
        displayList.scoreBoardButton.visible = false;
        displayList.scoreBoardClose.visible = true;
        Tween.fromTo(displayList.scoreBoard.scale, speed, {
                x: 0,
                y: 0,
            },
            {
                x: 1,
                y: 1,
                onComplete: () => {
                    displayList.scoreBoard.visible = true;
                    displayList.scoreBoardButton.enabled = true;
                    scoreBoardOpen = true;
                }
            }
        );
    }

    function close(lock) {
        if(orientation.get() !== orientation.LANDSCAPE) {
            if (scoreBoardOpen === true) {
                return new Promise(resolve => {
                    displayList.scoreBoard.visible = true;
                    displayList.scoreBoardButton.enabled = false;
                    displayList.scoreBoardButton.visible = true;
                    displayList.scoreBoardClose.visible = false;
                    Tween.fromTo(displayList.scoreBoard.scale, speed, {
                            x: 1,
                            y: 1,
                        },
                        {
                            x: 0,
                            y: 0,
                            onComplete: () => {
                                displayList.scoreBoard.visible = false;
                                if(lock === undefined) {
                                    displayList.scoreBoardButton.enabled = true;
                                } else {
                                    displayList.scoreBoardButton.enabled = false;
                                }
                                scoreBoardOpen = false;
                                resolve();
                            }
                        }
                    );
                });
            }
        }
    }

    msgBus.subscribe('PrizeData.PrizeStructure', populate);
    msgBus.subscribe('Game.HighlightWin', highlight);

    return {
        init,
        close
    };

});