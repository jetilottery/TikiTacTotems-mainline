define(require => {

    const PIXI = require('com/pixijs/pixi');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const totalWinBar = require('game/components/totalWinBar');
    const text = require('skbJet/componentManchester/standardIW/layout/text');
    const config = require('skbJet/componentManchester/standardIW/gameConfig');
    const audio = require('skbJet/componentManchester/standardIW/audio');

    require('com/gsap/TweenLite');
    require('com/gsap/easing/CustomEase');

    const Tween = window.TweenLite;

    class WinLine extends PIXI.Sprite {
        constructor(position, rotation, scale) {
            super();

            this.winGraphic = new PIXI.Sprite(PIXI.Texture.EMPTY);
            this.winGraphicHighlight = new PIXI.Sprite(PIXI.Texture.EMPTY);
            this.winGraphic.anchor.set(0.5);
            this.winGraphicHighlight.anchor.set(0.5);

            this.winGraphicMask = new PIXI.Graphics();
            this.winGraphicMask.beginFill();
            this.winGraphicMask.drawRect(0, 0, 557, 557);
            this.winGraphicMask.endFill();
            this.winGraphicMask.scale.set(0, 1);
            this.winGraphicMask.pivot.set(278.5, 278.5);
            this.value = 0;

            this.winGraphicContainer = new PIXI.Container();
            this.winGraphicContainer.addChild(
                this.winGraphicHighlight,
                this.winGraphic,
                this.winGraphicMask
            );
            this.winGraphic.alpha = 0;
            this.winGraphicContainer.scale.x = scale;
            this.winGraphicContainer.rotation = rotation;

            this.winAmountText = text.create();
            this.winAmountText.anchor.set(0.5);
            this.winAmountText.maxWidth = 340;

            this.winAmountContainer = new PIXI.Container();

            this.winAmountContainer.addChild(
                this.winAmountText
            );

            this.addChild(
                this.winGraphicContainer,
                this.winAmountContainer
            );
            this.x = position.x;
            this.y = position.y;

            this.tween = [];
            this.mask = this.winGraphicMask;

            this.number = undefined;

            displayList.playerNumbers.addChild(this);
        }

        assign(data, amount) {
            // this.winGraphic.texture = PIXI.Texture.from("LinesPortHorizVert_" + data);
            // this.winGraphicHighlight.texture = PIXI.Texture.from("LinesPortHorizVert_" + data + "_Highlight");
            // this.winAmountText.text = SKBeInstant.formatCurrency(amount).formattedAmount;
            // this.winAmountText.style = SKBeInstant.formatCurrency(amount).formattedAmount;
            totalWinBar.update(amount);
            this.value = amount;

            // this.winAmountContainer.visible = false;
            this.number = data;
            // text.update(this.winAmountText, textStyles['winLine'+data]);
            // this.winAmountText.style.dropShadow = true;
            // this.winAmountText.style.dropShadowBlur = 100;
            // this.winAmountText.style.dropShadowColor = textStyles['winLine'+data].dropShadowColor;
        }

        reset() {
            this.visible = false;
            this.alpha = 1;
            this.value = 0;
            this.winGraphicMask.scale.set(0, 1);
            this.winAmountContainer.visible = false;
            this.number = undefined;
            this.winGraphic.texture = PIXI.Texture.EMPTY;
            this.winGraphicHighlight.texture = PIXI.Texture.EMPTY;
            this.winAmountText.text = "";
            this.winGraphic.alpha = 0;
        }

        show(i) {
            return new Promise(resolve => {
                this.visible = true;
                this.tween[0] = Tween.to(this.winGraphicMask.scale, 0.2, {
                    x: 1,
                    onComplete: () => {
                        this.winAmountContainer.visible = true;
                        msgBus.publish('Game.HighlightWin',this.number);
                        audio.play('lineMatch0'+(i+1));
                        this.tween[1] = Tween.to(this.winGraphic, 0, {
                            alpha: 1,
                            onComplete: () => {
                                this.tween[2] = Tween.to(this.winGraphicMask.scale, 0.2, {
                                    x:0,
                                    delay: config.winLineDelay,
                                    onComplete: resolve
                                });
                            }
                        });
                    }
                });
            });
        }

        async fade() {
            await new Promise(resolve => {
                Tween.to(this, 0.5, {
                    alpha: 0,
                    onComplete: resolve
                });
            });
        }
    }

    return WinLine;
});