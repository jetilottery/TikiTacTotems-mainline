define(require => {

    const animationController = require('game/components/animation/animationController');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');

    function init() {
        animationController.addAnimation({
            index: 'baseGame',
            file: 'tikiTacToe_background',
            loop: true,
            x: 0,
            y: 0,
            pivotX:orientation.get() === orientation.LANDSCAPE ? -720 : -405,
            pivotY:orientation.get() === orientation.LANDSCAPE ? -405 : -612,
            container: displayList.backgroundBaseGame
        });
        animationController.addAnimation({
            index: 'bonusGame',
            file: 'tikiTacToe_background',
            loop: true,
            x: 0,
            y: 0,
            pivotX:orientation.get() === orientation.LANDSCAPE ? -720 : -405,
            pivotY:orientation.get() === orientation.LANDSCAPE ? -405 : -612,
            container: displayList.backgroundBonusGame
        });
        animationController.addAnimation({
            index: 'dustBurst0',
            file: 'dustBurstAnim',
            loop: false,
            x: orientation.get() === orientation.LANDSCAPE ? 510 : 180,
            y: orientation.get() === orientation.LANDSCAPE ? 410 : 620,
            pivotX:0,
            pivotY:0,
            container: displayList.particlesLayer
        });
        animationController.addAnimation({
            index: 'dustBurst1',
            file: 'dustBurstAnim',
            loop: false,
            x: orientation.get() === orientation.LANDSCAPE ? 720 : 410,
            y: orientation.get() === orientation.LANDSCAPE ? 410 : 620,
            pivotX:0,
            pivotY:0,
            container: displayList.particlesLayer
        });
        animationController.addAnimation({
            index: 'dustBurst2',
            file: 'dustBurstAnim',
            loop: false,
            x: orientation.get() === orientation.LANDSCAPE ? 910 : 660,
            y: orientation.get() === orientation.LANDSCAPE ? 410 : 620,
            pivotX:0,
            pivotY:0,
            container: displayList.particlesLayer
        });
        animationController.addAnimation({
            index: 'winEffect',
            file: 'winEffect',
            loop: true,
            x: 0,
            y: -100,
            pivotX:0,
            pivotY:0,
            container: displayList.totalWinBar,
            back:true
        });
    }

    msgBus.subscribe('animation.play', data => {
        animationController.playAnimation(data);
    });

    msgBus.subscribe('animation.add', data => {
        animationController.queueAnimation(data);
    });

    // msgBus.subscribe('animation.queue',data=>{
    //
    // });

    return {
        init
    };

});