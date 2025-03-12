define(() => {
    // const prizeData = require('skbJet/componentManchester/standardIW/prizeData');
    // const debug = require('game/components/debug/force');

    // const dummyString = "DDDADADBW|DDCBCEBAC|CCAEAEAFD|AFDEADCFA";

    return function scenarioTransform(scenarioString) {
        // split the string into the three components; winning, instant and player numbers
        let [baseGame, bonusGame_1, bonusGame_2, bonusGame_3] = scenarioString.split('|');

        function parseLine(...input) {
            return input.reduce((a, c) => ((c === a && a) || (c === 'W' && a) || (a === 'W' && c)));
        }

        let wildCard = baseGame.indexOf('W') > -1;

        let baseGameWins = [
            parseLine(baseGame[0], baseGame[1], baseGame[2]),
            parseLine(baseGame[3], baseGame[4], baseGame[5]),
            parseLine(baseGame[6], baseGame[7], baseGame[8]),
            parseLine(baseGame[0], baseGame[3], baseGame[6]),
            parseLine(baseGame[1], baseGame[4], baseGame[7]),
            parseLine(baseGame[2], baseGame[5], baseGame[8]),
            parseLine(baseGame[0], baseGame[4], baseGame[8]),
            parseLine(baseGame[6], baseGame[4], baseGame[2])
        ];
        let bonusGameWins_1 = [
            parseLine(bonusGame_1[0], bonusGame_1[1], bonusGame_1[2]),
            parseLine(bonusGame_1[3], bonusGame_1[4], bonusGame_1[5]),
            parseLine(bonusGame_1[6], bonusGame_1[7], bonusGame_1[8]),
            parseLine(bonusGame_1[0], bonusGame_1[3], bonusGame_1[6]),
            parseLine(bonusGame_1[1], bonusGame_1[4], bonusGame_1[7]),
            parseLine(bonusGame_1[2], bonusGame_1[5], bonusGame_1[8]),
            parseLine(bonusGame_1[0], bonusGame_1[4], bonusGame_1[8]),
            parseLine(bonusGame_1[6], bonusGame_1[4], bonusGame_1[2])
        ];
        let bonusGameWins_2 = [
            parseLine(bonusGame_2[0], bonusGame_2[1], bonusGame_2[2]),
            parseLine(bonusGame_2[3], bonusGame_2[4], bonusGame_2[5]),
            parseLine(bonusGame_2[6], bonusGame_2[7], bonusGame_2[8]),
            parseLine(bonusGame_2[0], bonusGame_2[3], bonusGame_2[6]),
            parseLine(bonusGame_2[1], bonusGame_2[4], bonusGame_2[7]),
            parseLine(bonusGame_2[2], bonusGame_2[5], bonusGame_2[8]),
            parseLine(bonusGame_2[0], bonusGame_2[4], bonusGame_2[8]),
            parseLine(bonusGame_2[6], bonusGame_2[4], bonusGame_2[2])
        ];
        let bonusGameWins_3 = [
            parseLine(bonusGame_3[0], bonusGame_3[1], bonusGame_3[2]),
            parseLine(bonusGame_3[3], bonusGame_3[4], bonusGame_3[5]),
            parseLine(bonusGame_3[6], bonusGame_3[7], bonusGame_3[8]),
            parseLine(bonusGame_3[0], bonusGame_3[3], bonusGame_3[6]),
            parseLine(bonusGame_3[1], bonusGame_3[4], bonusGame_3[7]),
            parseLine(bonusGame_3[2], bonusGame_3[5], bonusGame_3[8]),
            parseLine(bonusGame_3[0], bonusGame_3[4], bonusGame_3[8]),
            parseLine(bonusGame_3[6], bonusGame_3[4], bonusGame_3[2])
        ];

        baseGame = baseGame.split('');
        bonusGame_1 = bonusGame_1.split('');
        bonusGame_2 = bonusGame_2.split('');
        bonusGame_3 = bonusGame_3.split('');


        return {
            baseGame,
            bonusGame_1,
            bonusGame_2,
            bonusGame_3,
            baseGameWins,
            bonusGameWins_1,
            bonusGameWins_2,
            bonusGameWins_3,
            wildCard
        };
    };
});
