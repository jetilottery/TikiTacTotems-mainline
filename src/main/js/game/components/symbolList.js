define(require => {
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const Symbol = require('game/components/Symbol');
    const winLines = require('game/components/winLines');
    const bonusParticles = require('game/components/bonusParticles');
    const winSequence = require('game/components/winSequence');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');

    require('com/gsap/TweenMax');
    const TweenMax = window.TweenMax;

    let symbolRelation = {
        0: [0, 1, 2],
        1: [3, 4, 5],
        2: [6, 7, 8],
        3: [0, 3, 6],
        4: [1, 4, 7],
        5: [2, 5, 8],
        6: [0, 4, 8],
        7: [6, 4, 2]
    };

    let symbolPositioning = [
        [-164,467],
        [62, 476],
        [289, 476],
        [-164, 245],
        [62, 245],
        [289, 245],
        [-164, 13],
        [62, 13],
        [289, 13]
    ];

    const startData = [
        'ABADDCAFD',
    ];

    let resetBlocks = 0;

    let symbols;
    let numbers;

    function init() {
        symbols = [
            Symbol.fromContainer(displayList.symbol1, -163, 13),
            Symbol.fromContainer(displayList.symbol2, 62, 13),
            Symbol.fromContainer(displayList.symbol3, 289, 13),

            Symbol.fromContainer(displayList.symbol4, -164, 245),
            Symbol.fromContainer(displayList.symbol5, 62, 245),
            Symbol.fromContainer(displayList.symbol6, 289, 245),

            Symbol.fromContainer(displayList.symbol7, -164, 476),
            Symbol.fromContainer(displayList.symbol8, 62, 476),
            Symbol.fromContainer(displayList.symbol9, 289, 476),
        ];

        symbols[0].position.set(symbolPositioning[0][0],symbolPositioning[0][1]);
        symbols[1].position.set(symbolPositioning[1][0],symbolPositioning[1][1]);
        symbols[2].position.set(symbolPositioning[2][0],symbolPositioning[2][1]);
        symbols[3].position.set(symbolPositioning[3][0],symbolPositioning[3][1]);
        symbols[4].position.set(symbolPositioning[4][0],symbolPositioning[4][1]);
        symbols[5].position.set(symbolPositioning[5][0],symbolPositioning[5][1]);
        symbols[6].position.set(symbolPositioning[6][0],symbolPositioning[6][1]);
        symbols[7].position.set(symbolPositioning[7][0],symbolPositioning[7][1]);
        symbols[8].position.set(symbolPositioning[8][0],symbolPositioning[8][1]);

        let index = parseInt(((Math.random() * startData.length) + 1) - 1);

        startData[index].toString().split("").forEach((e, i) => {
            symbols[i].populate(e);
            symbols[i].enable();
        });

        winLines.init();
        winSequence.init({
            symbols: symbols,
            symbolRelation: symbolRelation
        });
        displayList.playerNumbers.mask = displayList.symbolMask;

    }

    function populate(data, set) {
        numbers = data;
        winLines.checkForWins(set);
    }

    function enable() {
        return symbols.map(async symbol => {
            await symbol.enable();
        });
    }

    function reset(num) {
        return new Promise(resolve => {
            let groupA = [];
            let groupB = [];
            let groupC = [];

            symbols.map((symbol,index) => {
                if([0,3,6].indexOf(index) > -1) {
                    groupA.push(symbol);
                }
                if([1,4,7].indexOf(index) > -1) {
                    groupB.push(symbol);
                }
                if([2,5,8].indexOf(index) > -1) {
                    groupC.push(symbol);
                }
            });

            groupA.forEach((e,i)=>{
                TweenMax.delayedCall(gameConfig.dropSpeed + 0,async ()=>{
                    await e.drop(i,true);
                    await e.reset();
                });
            });
            groupB.forEach((e,i)=>{
                TweenMax.delayedCall((gameConfig.dropSpeed + 0.1),async ()=>{
                    await e.drop(i,true);
                    await e.reset();
                });
            });
            groupC.forEach((e,i)=>{
                TweenMax.delayedCall((gameConfig.dropSpeed + 0.2),async ()=>{
                    await e.drop(i,true);
                    await e.reset();

                    if(symbols.every(e=>{
                        return e.number === undefined;
                    })){

                        if(num === undefined) {
                            num = 0;
                        }

                        TweenMax.delayedCall(num,resolve);
                    }
                });
            });
        });
    }


    async function drop() {
        resetBlocks = 0;
        let promise = symbols.map(async symbol => {
            const nextData = numbers.shift();
            symbol.populate(nextData);
            let dropList = [6,7,8,3,4,5,0,1,2];

            await symbol.drop(dropList[symbols.indexOf(symbol)]);



            if (symbol.symbolLetter === 'W') {
                bonusParticles.bonusSymbol = symbol;
            }
            msgBus.publish('Game.PlayerNumber', nextData[0]);
        });

        await Promise.all(promise).then(winSequence.sequence);
    }


    msgBus.subscribe('drop', drop);
    msgBus.subscribe('game.checkReset',()=>{
        resetBlocks++;
       if(resetBlocks === 9) {
           TweenMax.delayedCall(1,drop);
       }
    });


    return {
        init: init,
        enable: enable,
        populate: populate,
        reset: reset,
    };
});