define(require => {

    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');
    const payTable = require('game/components/paytable');
    const PIXI = require('com/pixijs/pixi');

    let transitionParam;
    let transitionContainer = {
        bonus: undefined,
        transition: undefined,
    };

    function init() {
        setUpBackground();
    }

    function setUpBackground() {
        if (displayList.backgroundBaseGame.children.length > 0) {

            let pivotX = orientation.get() === orientation.LANDSCAPE ? -720 : -405;
            let pivotY = orientation.get() === orientation.LANDSCAPE ? -405 : -612;

            msgBus.publish('animation.play', {
                index: 'baseGame',
                anim: orientation.get() === orientation.LANDSCAPE ? 'basegameIdle_anim_land' : 'basegameIdle_anim_port'
            });
            msgBus.publish('animation.play', {
                index: 'bonusGame',
                anim: orientation.get() === orientation.LANDSCAPE ? 'bonusIdle_anim_land' : 'bonusIdle_anim_port'
            });

            displayList.backgroundBaseGame.children[0].pivot.set(pivotX, pivotY);
            displayList.backgroundBonusGame.children[0].pivot.set(pivotX, pivotY);

        }
    }

    function switchContainer(param) {

        if(displayList.backgroundBonusGame.children[0] !== undefined) {
            transitionContainer = {
                bonus: displayList.backgroundBonusGame.children[0].slotContainers[displayList.backgroundBonusGame.children[0].skeleton.findSlotIndex("trees_front_L_bonus")],
                transition: displayList.transitionLayer
            };
        }
        let transitionPosition = {x:50,y:320};
        let finalPosition = {x:-665,y:-80};

        transitionParam = param;

        let transtionResize = function (tparam) {
            switch (tparam) {
                case 'bonus': {
                    displayList.bonusTurnsContainer.position.set(finalPosition.x, finalPosition.y);
                    displayList.bonusTurnsContainer.scale.set(1);
                    transitionContainer.bonus.addChildAt(displayList.bonusTurnsContainer, 0);
                    break;
                }
                case 'transition': {
                    transitionContainer.transition.addChild(displayList.bonusTurnsContainer);
                    displayList.bonusTurnsContainer.position.set(transitionPosition.x, transitionPosition.y);
                    displayList.bonusTurnsContainer.scale.y = 1;
                    break;
                }
            }
        };

        if(orientation.get() === orientation.LANDSCAPE) {
            if(transitionParam !== undefined) {
              transtionResize(param);
            }
        } else {
            displayList.bonusTurnsContainer.position.set(80,870);
            displayList.bonusTurnsContainer.scale.y = 0.9;
            displayList.background.addChild(displayList.bonusTurnsContainer);
        }
    }

    function setUpScoreBoard() {
        if(orientation.get() === orientation.LANDSCAPE) {
            displayList.scoreBoard.pivot.x = 0;
            displayList.scoreBoard.pivot.y = 0;
            displayList.scoreBoard.scale.set(0.7);
            displayList.scoreBoard.visible = true;
            displayList.scoreBoardClose.visible = false;
            displayList.scoreBoardButton.visible = false;
            displayList.scoreBoardBackground.texture = PIXI.Texture.EMPTY;
        } else {
            payTable.close();
            displayList.scoreBoard.pivot.x = 500;
            displayList.scoreBoard.pivot.y = -100;
            displayList.scoreBoard.visible = false;
            displayList.scoreBoardClose.visible = false;
            displayList.scoreBoardButton.visible = true;
        }
        displayList.scoreBoardButton.visible = orientation.get() !== orientation.LANDSCAPE;
    }

    msgBus.subscribe('GameSize.OrientationChange', () => {
        setUpBackground();
        setUpScoreBoard();
        switchContainer(transitionParam);
    });

    return {
        init,
        switchContainer
    };

});