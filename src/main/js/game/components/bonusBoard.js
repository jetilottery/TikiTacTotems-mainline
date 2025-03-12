define(require => {
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const resources = require('skbJet/component/resourceLoader/resourceLib');
    const utils = require('skbJet/componentManchester/standardIW/layout/utils');
    const PIXI = require('com/pixijs/pixi');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const resize = require('game/components/resize');
    const app = require('skbJet/componentManchester/standardIW/app');

    require('com/gsap/TweenLite');
    require('com/gsap/easing/CustomEase');
    require('com/gsap/plugins/PixiPlugin');
    require('com/pixijs/pixi-particles');
    // require('com/pixijs/pixi-filters');

    const Tween = window.TweenLite;

    let plaques = [];
    let bonusGameBackground;
    let animation;
    let boardContainer = undefined;
    let bonusGameBackgroundTween = undefined;
    let transitionLayer = undefined;

    function init() {
        plaques = [
            displayList.bonusTurn1Plaque,
            displayList.bonusTurn2Plaque,
            displayList.bonusTurn3Plaque,
        ];
        plaques.forEach(e => {
            e.y = 0;
            e.alpha = 0;
            // e.mask = displayList.bonusBoardMask;
            Tween.to(e,0,{
               pixi:{brightness:10}
            });
        });
        displayList.bonusTurnsText.alpha = 1;
        checkPlural();
        hide();
        bonusGameBackground = displayList.backgroundBonusGame;
        transitionLayer = displayList.transitionLayer;

        boardContainer = bonusGameBackground.children[0].slotContainers[bonusGameBackground.children[0].skeleton.findSlotIndex("trees_front_L_bonus")];

        resize.switchContainer('transition',transitionLayer);
        setupExplosionParticles();
    }


    function show() {
        displayList.bonusTurnsContainer.visible = true;
        displayList.infoText.visible = false;
    }

    function hide() {
        displayList.bonusTurnsContainer.visible = false;
        displayList.infoText.visible = true;
    }

    function reset() {
        resize.switchContainer('transition',transitionLayer);
        checkPlural();
        plaques.forEach(e => {
            e.y = 0;
            e.alpha = 0;
            Tween.to(e,0,{
                pixi:{brightness:10}
            });
        });
        displayList.bonusTurnsText.alpha = 1;

        hide();
    }

    function setupExplosionParticles() {
        animation = new PIXI.extras.AnimatedSprite([PIXI.Texture.EMPTY]);
        const animationFrames = utils.findFrameSequence('bonusAwardSparkleHit');
        animation.textures = animationFrames.map(PIXI.Texture.from);
        animation.gotoAndStop(0);
        animation.visible = false;
        animation.anchor.set(0.5);
        animation.x = 100;
        animation.y = 100;
        // animation.scale.set(0.5);
        animation.animationSpeed = 0.25;
        animation.loop = false;

        // animation.filters = [new PIXI.filters.AdvancedBloomFilter({
        //     threshold:0.1,
        //     bloomScale:1`,
        //     brightness:0.8,
        //     blur:2,
        //     quality:6
        // })];

        // displayList.bonusParticles.addChild(animation);
    }

    function preWarm() {
        app.renderer.plugins.prepare.upload(PIXI.utils.BaseTextureCache['assetPacks/desktop/spine/tikiTacToe_background3.png']);
        app.renderer.plugins.prepare.upload(PIXI.utils.BaseTextureCache['assetPacks/desktop/spine/tikiTacToe_background4.png']);
    }
    
    function explodeAnimation() {
        animation.visible = true;
        animation.gotoAndPlay(0);

        animation.onComplete=()=>{
            animation.visible = false;
        };
    }

    function addOne(index) {
        show();
        checkPlural(index);
        explodeAnimation();
        plaques[index].alpha = 1;
        plaques[index].y = 0;
        Tween.to(plaques[index],1,{
            pixi:{brightness:1}
        });
        audio.playSequential('bonusTurnIncrease');

        if(bonusGameBackgroundTween === undefined) {
            bonusGameBackgroundTween = Tween.to(bonusGameBackground, 6, {
                alpha: 1,
                onComplete:()=>{
                    bonusGameBackgroundTween = undefined;
                }
            });
        }
    }

    function removeOne(index) {
        checkPlural(index,true);
        resize.switchContainer('bonus',boardContainer);
        Tween.to(plaques[index], 0.3, {
            y: 600,
            alpha: 0,
        });

        if(index === 0) {
            Tween.to(displayList.bonusTurnsText,1,{
               alpha:0
            });
        }
    }

    function checkPlural(index,drop) {
        if(drop !== undefined) {
            if (index === 1) {
                displayList.bonusTurnsText.text = resources.i18n.game.Game.bonusTurn;
            } else {
                if(index === 0) {
                    displayList.bonusTurnsText.text = resources.i18n.game.Game.bonusTurn;
                } else {
                    displayList.bonusTurnsText.text = resources.i18n.game.Game.bonusTurns;
                }
            }
        } else {
            if (index > 0) {
                displayList.bonusTurnsText.text = resources.i18n.game.Game.bonusTurns;
            } else {
                displayList.bonusTurnsText.text = resources.i18n.game.Game.bonusTurn;
            }
        }

    }

    return {
        init,
        show,
        hide,
        reset,
        addOne,
        removeOne,
        preWarm
    };
});