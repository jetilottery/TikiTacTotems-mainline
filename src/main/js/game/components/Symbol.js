define(require => {
    const PIXI = require('com/pixijs/pixi');
    const utils = require('skbJet/componentManchester/standardIW/layout/utils');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const text = require('skbJet/componentManchester/standardIW/layout/text');
    const textStyles = require('skbJet/componentManchester/standardIW/textStyles');
    const prizeData = require('skbJet/componentManchester/standardIW/prizeData');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');

    require('com/gsap/TimelineMax');
    require('com/gsap/TweenMax');
    require('com/gsap/easing/CustomEase');
    require('com/gsap/plugins/PixiPlugin');
    // require('com/pixijs/pixi-filters');

    const Tween = window.TweenMax;
    const TimeLine = window.TimelineMax;

    const Bounce = window.CustomEase.create("custom", "M0,0 C0.2,0 0.469,0.709 0.512,0.832 0.571,0.999 0.59,0.982 0.6,1 0.689,0.916 0.77,0.944 0.797,0.958 0.825,0.972 0.852,0.986 0.872,1 0.888,0.996 0.912,0.986 0.934,0.986 0.955,0.986 1,1 1,1");

    const symbol = {
        'A': 'S01',
        'B': 'S02',
        'C': 'S03',
        'D': 'S04',
        'E': 'S05',
        'F': 'S06',
        'W': 'B01'
    };

    class Symbol extends PIXI.Sprite {
        constructor(startPosition, endPosition) {
            super();
            this.startPosition = startPosition;
            this.endPosition = endPosition;
            // Create all the empty sprites
            this.noWin = new PIXI.Sprite(PIXI.Texture.EMPTY);
            this.win = new PIXI.Sprite(PIXI.Texture.EMPTY);
            this.bonusWin = new PIXI.extras.AnimatedSprite([PIXI.Texture.EMPTY]);
            this.winBox = new PIXI.extras.AnimatedSprite(utils.findFrameSequence('winningSquare').map(PIXI.Texture.from));

            this.dropTween = undefined;
            this.symbolLetter = undefined;

            // Center everything
            this.win.anchor.set(0.5);
            this.noWin.anchor.set(0.5);
            this.winBox.anchor.set(0.5);
            this.winningSymbol = false;
            this.winAmmountValue = text.create();
            this.winAmmountValue.anchor.set(0.5);
            this.winAmmountValue.visible = false;
            this.winAmmountValue.text = " ";
            this.winAmmountValue.maxWidth = 350;

            const bonusWinFrames = utils.findFrameSequence('B01_Sparkles');
            this.bonusWin.textures = bonusWinFrames.map(PIXI.Texture.from);
            this.bonusWin.gotoAndStop(0);
            this.bonusWin.visible = false;
            this.bonusWin.anchor.set(0.5);
            this.bonusWin.animationSpeed = 0.25;
            this.bonusWin.loop = false;

            this.winBox.visible = false;
            this.winBox.animationSpeed = 0.25;
            this.winBox.gotoAndPlay(0);
            this.bonusSparklePlay = true;
            // this.bonusWin.filters = [new PIXI.filters.AdvancedBloomFilter({
            //     threshold: 0.1,
            //     bloomScale: 1,
            //     brightness: 0.8,
            //     blur: 2,
            //     quality: 6
            // })];

            this.butterfly = false;

            this.resultContainer = new PIXI.Container();
            this.resultContainer.addChild(this.noWin, this.win, this.bonusWin, this.winBox, this.winAmmountValue);
            this.resultContainer.visible = false;
            this.resultContainer.name = 'resultContainer';

            this.parentIndexPosition = undefined;

            this.addChild(this.resultContainer);

            this.x = this.startPosition;
            this.y = -1000;

            // State
            this.revealed = false;
        }

        enable() {
            return new Promise(resolve => {
                this.noWin.visible = true;
                this.resultContainer.visible = true;
                resolve();
            });
        }

        bonusWinSparkle(param) {
            if(param === true) {
                this.bonusWin.visible = true;
                this.bonusWin.gotoAndPlay(0);
                this.bonusSparklePlay = false;

                this.bonusWin.onComplete = () => {
                    this.bonusWin.alpha = 0;
                    this.bonusWin.visible = false;
                    this.bonusWin.stop();
                };
            }
        }

        highlightPulse() {
            let highlightPulseTween = new TimeLine();

            this.win.alpha = 1;

            highlightPulseTween.to(this.win, 1, {
                alpha: 0
            }, 0);
        }

        preShow(delay) {


            this.winBox.visible = true;
            this.winBox.gotoAndStop(9);

            // Tween.to(this.resultContainer.scale, 0.05, {
            //     x: 1.1,
            //     y: 1.1,
            //     onComplete: () => {
            //         Tween.to(this.resultContainer.scale, 0.05, {
            //             x: 1,
            //             y: 1,
            //             delay: (delay),
            //         });
            //     }
            // });

            Tween.to(this.win, 0.05, {
                alpha: 1,
                onComplete: () => {
                    Tween.to(this.win, 0.05, {
                        alpha: 0,
                        delay: (delay),
                        onComplete:()=>{
                            this.winBox.visible = false;
                        }
                    });
                }
            });

        }

        highlight(delay) {
            return new Promise(resolve => {
                //

                let highlightTimeLine = new TimeLine({
                    onComplete: () => {
                        this.win.alpha = 0;
                        this.winBox.visible = false;
                        resolve();
                    }
                });

                this.winBox.visible = true;
                this.winBox.gotoAndPlay(9);
                // highlightTimeLine.to(this.resultContainer.scale, 0.2, {
                //     x: 1.1,
                //     y: 1.1,
                // }, 0).to(this.resultContainer.scale, 0.2, {
                //     x: 1,
                //     y: 1,
                //     delay: (delay / 2),
                // });
                highlightTimeLine.to(this.win, 0.2, {
                    alpha: 1
                }, 0).to(this.win, 0.2, {
                    alpha: 0,
                    delay: (delay / 2)
                });
            });
        }

        bonusPopulate(delay) {
            return new Promise(resolve => {
                let bonusPopulate = new TimeLine({
                    onComplete: resolve
                });

                this.win.alpha = 0;

                bonusPopulate.to(this.win, 0.2, {
                    alpha: 1
                }, 0);

                bonusPopulate.to(this.win, 0.2, {
                    delay: delay,
                    alpha: 0
                });
            });
        }

        populate(number) {
            this.number = number;
            this.noWin.texture = PIXI.Texture.fromFrame(symbol[number]);
            this.win.texture = PIXI.Texture.from(symbol[number] + '_Win');
            this.win.alpha = 0;
            this.symbolLetter = number;
        }

        disable() {
            this.enabled = false;
            this.reveal = undefined;
        }

        reset() {
            return new Promise(resolve => {
                this.noWin.visible = true;
                this.noWin.texture = PIXI.Texture.EMPTY;
                this.win.texture = PIXI.Texture.EMPTY;
                this.win.alpha = 0;
                this.bonusWin.gotoAndStop(0);
                this.bonusWin.visible = false;
                this.bonusWin.alpha = 1;
                this.bonusSparklePlay = true;
                this.butterfly = false;
                this.revealed = false;
                this.matched = false;
                this.y = -1000;
                this.number = undefined;
                this.dropTween = undefined;
                this.symbolLetter = undefined;
                this.winningSymbol = false;
                this.parentIndexPosition = undefined;
                this._filters = [];
                resolve();
            });
        }

        async drop(symbolIndex, reset) {
            let _this = this;

            await new Promise(resolve => {

                let dropTimeLine = new TimeLine({
                    delay: (gameConfig.symbolDelay * symbolIndex),
                    onComplete:resolve
                });

                var dropSpeed = reset === undefined ? gameConfig.dropSpeed : (gameConfig.dropSpeed/2);
                this.dropTween = dropTimeLine.to(this, dropSpeed, {
                    ease: reset === undefined ? Bounce : window.Sine.easeIn,
                    y: reset === undefined ? this.endPosition : this.endPosition + this.endPosition + 700,
                    onUpdate: () => {
                        if (this.dropTween !== undefined) {
                            if (this.dropTween.getActive().length > 0 && reset === undefined) {
                                if (this.dropTween.getActive()[0].totalProgress() >= 0.6 &&
                                    this.dropTween.getActive()[0].data === undefined
                                ) {
                                    this.dropTween.getActive()[0].data = {};
                                    this.dropTween.getActive()[0].data['beforeBounce'] = true;

                                    if(symbolIndex < 3) {
                                        msgBus.publish('animation.play', { index:'dustBurst'+symbolIndex,anim:'dustBurst'});
                                    }
                                    if (_this.symbolLetter === 'W') {
                                        _this.bonusPopulate(0.5);
                                    }
                                    audio.playSequential('blockDrop');
                                }
                            }
                        }
                    },
                    onComplete:()=>{
                        if(reset) {
                            msgBus.publish('game.checkReset');
                        }
                    }
                }, 0);
                //
                // if (_this.symbolLetter === 'W') {
                //     dropTimeLine.to({}, 0, {
                //         delay: ((gameConfig.dropSpeed) + (gameConfig.symbolDelay * symbolIndex))/10,
                //         onComplete: () => {
                //             _this.highlightPulse();
                //         }
                //     }, 0);
                // }
            });
        }

        match() {
            this.matched = true;
            this.win.visible = true;
            this.noWin.visible = false;
        }

        nonWin() {
            return new Promise(resolve => {
                resolve();
            });
        }

        showWinText(val) {
            let textData = "";
            let data = undefined;

            if(val !== undefined) {
                textData = val.text;
                data = symbol[val.data];
            } else {
                textData = prizeData.prizeTable[this.symbolLetter];
                data = symbol[this.symbolLetter];
            }

            text.update(this.winAmmountValue, textStyles['winLine' + data]);
            this.winAmmountValue.text = SKBeInstant.formatCurrency(textData).formattedAmount;
            this.winAmmountValue.visible = true;


            this.parentIndexPosition = this.parent.parent.getChildIndex(this.parent);

            this.parent.parent.addChildAt(this.parent,this.parent.parent.children.length-1);
        }

        hideWinText() {
            this.winAmmountValue.text = " ";
            this.winAmmountValue.visible = false;

            this.parent.parent.addChildAt(this.parent,this.parentIndexPosition);

        }

        static fromContainer(container, startPosition, endPosition) {
            const symbol = new Symbol(startPosition, endPosition);
            container.addChild(symbol);
            container.symbol = symbol;
            return symbol;
        }
    }


    return Symbol;
});
