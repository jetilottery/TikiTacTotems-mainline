define(require => {

    const WinLine = require('game/components/WinLine');
    const prizeData = require('skbJet/componentManchester/standardIW/prizeData');
    const scenarioData = require('skbJet/componentManchester/standardIW/scenarioData');
    const meterData = require('skbJet/componentManchester/standardIW/meterData');

    let availableWinLines = {};
    let winningLines = {};

    const data = {
        'A': 'S01',
        'B': 'S02',
        'C': 'S03',
        'D': 'S04',
        'E': 'S05',
        'F': 'S06',
    };

    function init() {
        availableWinLines = {
            0: new WinLine({x: 58, y: 470}, 0, 1),
            1: new WinLine({x: 58, y: 240}, 0, 1),
            2: new WinLine({x: 58, y: 20}, 0, 1),
            3: new WinLine({x: -168, y: 240}, (Math.PI / 2), 1),
            4: new WinLine({x: 55, y: 240}, (Math.PI / 2), 1),
            5: new WinLine({x: 278, y: 240}, (Math.PI / 2), 1),
            6: new WinLine({x: 58, y: 240}, Math.PI / -4, 1.3),
            7: new WinLine({x: 58, y: 240}, (Math.PI / 4), 1.3),
        };
    }

    async function showWinlines(highlight) {
        let winValue = 0;

        if (Object.keys(winningLines).length > 0) {
            for (var i = 0; i < Object.keys(winningLines).length; i++) {
                if(highlight !== undefined) {
                    winValue = highlight(Object.keys(winningLines)[i]);
                }
                await winningLines[Object.keys(winningLines)[i]].show(i);
                meterData.win += winValue;
            }
        }
        else {
            return false;
        }
    }

    function parseWinningData(pass) {
        if (Object.keys(winningLines).length > 0) {
            for (let e of Object.keys(winningLines)) {
                pass(e);
            }
        }
    }

    function checkForWins(set) {
        scenarioData.scenario[set].forEach((e, i) => {
            if (e !== false) {
                availableWinLines[i].assign(data[e], prizeData.prizeTable[e]);
                winningLines[i] = availableWinLines[i];
            }
        });
    }

    function reset() {
        winningLines = {};
        Object.keys(availableWinLines).forEach((e) => {
            availableWinLines[e].reset();
        });
    }

    return {
        init,
        showWinlines,
        checkForWins,
        parseWinningData,
        reset
    };
});