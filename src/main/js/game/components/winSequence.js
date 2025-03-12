define(require => {

    const winLines = require('game/components/winLines');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const prizeData = require('skbJet/componentManchester/standardIW/prizeData');
    const audio = require('skbJet/componentManchester/standardIW/audio');

    require('com/gsap/TweenLite');
    const Tween = window.TweenLite;

    let symbols = [];
    let symbolRelation = {};

    function init(data) {
        symbols = data.symbols;
        symbolRelation = data.symbolRelation;
    }

    function highlightSymbols(val) {
        let winValue = 0;

        symbols.forEach(e => {
            e.hideWinText();
        });

        const lineArr = symbolRelation[val];

        lineArr.forEach(async (e, i) => {
            if (i === 1) {
                winValue = prizeData.prizeTable[symbols[e].symbolLetter];
                if(winValue !== undefined) {
                    symbols[e].showWinText();
                } else {
                    // TIKITT-292 - URGENT P1 IIM Winning claim tikitactoe
                    // Chances are this is a Wildcard symbol
                    // So look for the previous prize in this line
                    const prevPrize = symbols[lineArr[i-1]].symbolLetter;
                    // And now check it in the prizeTable
                    winValue = prizeData.prizeTable[prevPrize];
                    symbols[e].showWinText({
                        text:winValue,
                        data:prevPrize
                    });
                }

            }
            await symbols[e].highlight(gameConfig.winLineDelay);
        });
        return winValue;
    }


    function assignWinningSymbols(val) {
        symbolRelation[val].forEach(e => {
            symbols[e].winningSymbol = true;
        });
    }

    function showAllWinningSymbols() {
        return new Promise(async resolve=>{
            symbols.forEach( e => {
                if (e.winningSymbol) {
                    e.preShow(gameConfig.displayAllWins);
                }
            });

            let any = symbols.some((e)=>{
                if(e.winningSymbol === true) {
                    return true;
                }
            });

            if(any) {
                audio.play('preShow');
            }

            Tween.delayedCall(gameConfig.displayAllWinsResolve,resolve);
        });
    }

    function sequence() {
        Tween.delayedCall(gameConfig.delayBeforeWinSequence, async () => {

            winLines.parseWinningData(assignWinningSymbols);

            let promise = symbols.map(async symbol => {
                if (symbol.winningSymbol === false) {
                    symbol.nonWin();
                }
            });

            await Promise.all(promise);
            await showAllWinningSymbols();
            await winLines.showWinlines(highlightSymbols);

            await new Promise(resolve => {
                symbols.forEach(e => {
                    e.hideWinText();
                });
                resolve();
            });

            msgBus.publish('Game.CheckNextGameState');
        });
    }


    return {
        init,
        sequence
    };

});