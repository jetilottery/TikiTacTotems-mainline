define({
    _BASE_APP: {
        children: [
            'background',
            'transitionLayer',
            'dropButton',
            'logo',
            'winUpTo',
            'playerNumbers',
            'infoText',
            'totalWinBar',
            'scoreBoard',
            'scoreBoardButton',
            'scoreBoardClose',
            'symbolMask',
            'particlesLayer'
        ],
    },

    /*
     * BACKGROUND
     */
    background: {
        type: 'container',
        children: [
            'backgroundBaseGame',
            'backgroundBonusGame',
            'bonusTurnsContainer'
        ],
    },

    backgroundBaseGame: {
        type: 'container',
    },
    backgroundBonusGame: {
        type: 'container',
    },
    infoText: {
        type: 'text',
        style: 'infoText',
        wordWrap: true,
        alpha: 0.7,
        anchor: 0.5,
        align: 'center',
        landscape: {
            x: 160,
            y: 455,
            wordWrapWidth: 1100,
            maxWidth:320,
            string: 'infoText'
        },
        portrait: {
            x: 405,
            y: 950,
            wordWrapWidth: 560,
            maxWidth:800,
            string:'infoTextPortrait'
        },
    },

    transitionLayer: {
        type:'container'
    },

    /*
     * LOGO
     */
    logo: {
        type: 'sprite',
        anchor: 0.5,
        landscape: {
            x: 218,
            y: 82,
            texture: 'landscape_gameLogo',
        },
        portrait: {
            x: 405,
            y: 49,
            texture: 'portraitLogo',
        },
    },

    /*
     * WIN UP TO
     */
    winUpTo: {
        type: 'container',
        children: ['winUpToIn', 'winUpToOut'],
        landscape: {x: 180, y: 257},
        portrait: {x: 405, y: 135},
    },
    winUpToIn: {
        type: 'container',
        children: ['winUpToInText'],
    },
    winUpToInText: {
        type: 'text',
        style: 'winUpTo',
        string: 'winUpTo',
        anchor: 0.5,
        maxWidth: 400,
        align: 'center'
    },
    winUpToOut: {
        type: 'container',
        children: ['winUpToOutText'],
    },
    winUpToOutText: {
        type: 'text',
        style: 'winUpTo',
        string: 'winUpTo',
        anchor: 0.5,
        maxWidth: 400,
        align: 'center'
    },

    particlesLayer: {
        children: [
            'particlesContainer_1',
            'particlesContainer_2',
            'particlesContainer_3',
            'animationLayer',
        ],
        type: 'container',
    },

    particlesContainer_1: {
        type: 'container',
    },
    particlesContainer_2: {
        type: 'container',
    },
    particlesContainer_3: {
        type: 'container',
    },

    animationLayer:{
        landscape:{
            x:720,y:405
        },
        portrait: {
            x:405,y:614
        },
        type:'sprite',

        anchor:0.5
    },

    /*
     * PLAYER NUMBERS
     */
    bonusCard: {
        type: 'sprite',
        children: ['bonusWin', 'bonusNoWin', 'bonusCover'],
        texture: 'bonusBackground',
        anchor: 0.5,
        landscape: {x: 320, y: 587},
        portrait: {x: 405, y: 496},
    },
    bonusWin: {
        type: 'container',
        children: ['bonusWinText'],
    },
    bonusWinText: {
        type: 'text',
        style: 'bonusWin',
        anchor: 0.5,
        maxWidth: 320,
    },
    bonusNoWin: {
        type: 'text',
        string: 'bonusNoWin',
        style: 'bonusNoWin',
        anchor: 0.5,
        maxWidth: 320,
    },
    bonusCover: {
        type: 'animatedSprite',
        children: ['bonusLabel'],
        textures: 'bonusCover',
        anchor: 0.5,
    },
    bonusLabel: {
        type: 'text',
        string: 'bonus',
        style: 'bonusLabel',
        anchor: 0.5,
        maxWidth: 320,
    },

    /*
     * PLAYER NUMBERS
     */
    playerNumbers: {
        type: 'container',
        children: [
            'symbol1',
            'symbol2',
            'symbol3',
            'symbol4',
            'symbol5',
            'symbol6',
            'symbol7',
            'symbol8',
            'symbol9',
        ],
        landscape: {x: 665, y: 138, scale: 0.88},
        portrait: {x: 348, y: 284, scale:1},
    },

    symbol1: {
        type: 'container',
    },
    symbol2: {
        type: 'container',
    },
    symbol3: {
        type: 'container',
    },
    symbol4: {
        type: 'container',
    },
    symbol5: {
        type: 'container',
    },
    symbol6: {
        type: 'container',
    },
    symbol7: {
        type: 'container',
    },
    symbol8: {
        type: 'container',
    },
    symbol9: {
        type: 'container',
    },

    symbolMask: {
        type: 'rectangle',
        fill: '0x000000',
        fillAlpha: 1,
        landscape: {
            x: 220,
            y: 0,
            width: 1000,
            height: 650,
            anchor: 0.5
        },
        portrait: {
            x: -100,
            y: 170,
            width: 1000,
            height: 700,
            anchor: 0.5
        }
    },

    scoreBoard: {
        children: [
            'scoreBoardBackground',
            'scoreBoard_fishContainer',
            'scoreBoard_flowerContainer',
            'scoreBoard_moonMaskContainer',
            'scoreBoard_parrotContainer',
            'scoreBoard_starMaskContainer',
            'scoreBoard_straightFacedContainer'
        ],
        type: 'container',
        landscape: {x: 1200, y: 250, scale: 0.70},
        portrait: {x: 750, y: 180, scale: 1},
    },

    scoreBoardBackground: {
        type: 'sprite',
        portrait: {
            x: 150,
            y: 230,
            texture: 'portraitPaytableBackground',
            anchor: 0.5,
        }
    },
    scoreBoardButton: {
        type: 'button',
        portrait: {x: 740, y: 140},
        textures: {
            enabled: 'paytableDropdown_Enabled',
            over: 'paytableDropdown_Over',
            pressed: 'paytableDropdown_Pressed',
            disabled: 'paytableDropdown_Disaabled',
        },
    },
    scoreBoardClose: {
        type: 'button',
        portrait: {x: 740, y: 140},
        textures: {
            enabled: 'portrait_PaytableClose',
            over: 'portrait_PaytableClose_Over',
            pressed: 'portrait_PaytableClose_Pressed',
            disabled: 'portrait_PaytableClose',
        },
    },
    scoreBoard_fishContainer: {
        children: [
            'scoreBoard_fishSymbol',
            'scoreBoard_fishValue'
        ],
        type: 'container',
        landscape: {x: 0, y: 360},
        portrait: {x: 0, y: 360},
    },

    scoreBoard_fishSymbol: {
        type: 'sprite',
        anchor: 0.5,
        landscape: {
            texture: "paytable_s05",
            x: 0, y: 0
        },
        portrait: {
            texture: "paytable_s05",
            x: 0, y: 0
        },
    },

    scoreBoard_fishValue: {
        type: 'text',
        style: 'scoreBoardValue',
        wordWrap: true,
        align: 'left',
        fill: '#0d2218',
        anchor: {X: 0, y: 0.5},
        landscape: {x: 70, y: 0, wordWrapWidth: 1100, maxWidth:230},
        portrait: {x: 90, y: 0, wordWrapWidth: 560},
        alpha: 0.7
    },

    scoreBoard_flowerContainer: {
        children: [
            'scoreBoard_flowerSymbol',
            'scoreBoard_flowerValue'
        ],
        type: 'container',
        landscape: {x: 0, y: 450},
        portrait: {x: 0, y: 450},
    },

    scoreBoard_flowerSymbol: {
        type: 'sprite',
        anchor: 0.5,
        landscape: {
            texture: "paytable_s06",
            x: 0, y: 0
        },
        portrait: {
            texture: "paytable_s06",
            x: 0, y: 0
        },
    },

    scoreBoard_flowerValue: {
        type: 'text',
        style: 'scoreBoardValue',
        wordWrap: true,
        fill: '#431c52',
        align: 'left',
        anchor: {X: 0, y: 0.5},
        landscape: {x: 70, y: 0, wordWrapWidth: 1100, maxWidth:230},
        portrait: {x: 90, y: 0, wordWrapWidth: 560},
        alpha: 0.7
    },


    scoreBoard_moonMaskContainer: {
        children: [
            'scoreBoard_moonMaskSymbol',
            'scoreBoard_moonMaskValue',
        ],
        type: 'container',
        landscape: {x: 0, y: 90},
        portrait: {x: 0, y: 90},
    },

    scoreBoard_moonMaskSymbol: {
        type: 'sprite',
        anchor: 0.5,
        landscape: {
            texture: "paytable_s02",
            x: 0, y: 0
        },
        portrait: {
            texture: "paytable_s02",
            x: 0, y: 0
        },
    },

    scoreBoard_moonMaskValue: {
        type: 'text',
        style: 'scoreBoardValue',
        wordWrap: true,
        align: 'left',
        fill: '#142b59',
        anchor: {X: 0, y: 0.5},
        landscape: {x: 70, y: 0, wordWrapWidth: 1100, maxWidth:230},
        portrait: {x: 90, y: 0, wordWrapWidth: 560},
        alpha: 0.7
    },


    scoreBoard_parrotContainer: {
        children: [
            'scoreBoard_parrotSymbol',
            'scoreBoard_parrotValue'
        ],
        type: 'container',
        landscape: {x: 0, y: 270},
        portrait: {x: 0, y: 270},
    },

    scoreBoard_parrotSymbol: {
        type: 'sprite',
        anchor: 0.5,
        landscape: {
            texture: "paytable_s04",
            x: 0, y: 0
        },
        portrait: {
            texture: "paytable_s04",
            x: 0, y: 0
        },
    },

    scoreBoard_parrotValue: {
        type: 'text',
        style: 'scoreBoardValue',
        wordWrap: true,
        align: 'left',
        fill: '#450b02',
        anchor: {X: 0, y: 0.5},
        landscape: {x: 70, y: 0, wordWrapWidth: 1100, maxWidth:230},
        portrait: {x: 90, y: 0, wordWrapWidth: 560},
        alpha: 0.7
    },

    scoreBoard_starMaskContainer: {
        children: [
            'scoreBoard_starMaskSymbol',
            'scoreBoard_starMaskValue'
        ],
        type: 'container',
        landscape: {x: 0, y: 0},
        portrait: {x: 0, y: 0},
    },

    scoreBoard_starMaskSymbol: {
        type: 'sprite',
        anchor: 0.5,
        landscape: {
            texture: "paytable_s01",
            x: 0, y: 0
        },
        portrait: {
            texture: "paytable_s01",
            x: 0, y: 0
        },
    },

    scoreBoard_starMaskValue: {
        type: 'text',
        style: 'scoreBoardValue',
        wordWrap: true,
        align: 'left',
        fill: '#240241',
        anchor: {X: 0, y: 0.5},
        landscape: {x: 70, y: 0, wordWrapWidth: 1100, maxWidth:230},
        portrait: {x: 90, y: 0, wordWrapWidth: 560},
        alpha: 0.7
    },

    scoreBoard_straightFacedContainer: {
        children: [
            'scoreBoard_straightFacedMaskSymbol',
            'scoreBoard_straightFacedMaskValue'
        ],
        type: 'container',
        landscape: {x: 0, y: 180},
        portrait: {x: 0, y: 180},
    },

    scoreBoard_straightFacedMaskSymbol: {
        type: 'sprite',
        anchor: 0.5,
        landscape: {
            texture: "paytable_s03",
            x: 0, y: 0
        },
        portrait: {
            texture: "paytable_s03",
            x: 0, y: 0
        },
    },

    scoreBoard_straightFacedMaskValue: {
        type: 'text',
        style: 'scoreBoardValue',
        wordWrap: true,
        align: 'left',
        fill: '#2e490f',
        anchor: {X: 0, y: 0.5},
        landscape: {x: 70, y: 0, wordWrapWidth: 1100, maxWidth:230},
        portrait: {x: 90, y: 0, wordWrapWidth: 560},
        alpha: 0.7
    },

    totalWinBar: {
        type: 'container',
        children: [
            'totalWinLabel',
            'totalWinValue'
        ],
        anchor: 0.5,
        landscape: {
            x: 720, y: 420
        },
        portrait: {
            x: 410, y: 630
        }
    },
    totalWinLabel: {
        type: 'text',
        string: 'totalWin',
        anchor: 0.5,
        style: 'totalWinLabel',
        landscape: {x: 0, y: -60},
        portrait: {x: 0, y: -60},
    },
    totalWinValue: {
        type: 'text',
        anchor: 0.5,
        style: 'totalWinValue',
        landscape: {x: 0, y: 55},
        portrait: {x: 0, y: 55},
    },

    bonusTurnsContainer: {
        children: [
            'bonusTurn1Plaque',
            'bonusTurn2Plaque',
            'bonusTurn3Plaque',
            'bonusTurnsText',
            'bonusParticles',
        ],
        type: 'container',
    },

    bonusTurn1Plaque: {
        type: 'sprite',
        landscape: {
            texture: 'bonusNumber1',
            x: 0, y: 0
        },
        portrait: {
            texture: 'bonusNumber1',
            x: 0, y: 0
        }
    },

    bonusTurn2Plaque: {
        type: 'sprite',
        landscape: {
            texture: 'bonusNumber2',
            x: 0, y: 0
        },
        portrait: {
            texture: 'bonusNumber2',
            x: 0, y: 0
        }
    },

    bonusTurn3Plaque: {
        type: 'sprite',
        landscape: {
            texture: 'bonusNumber3',
            x: 0, y: 0
        },
        portrait: {
            texture: 'bonusNumber3',
            x: 0, y: 0
        }
    },

    bonusParticles: {
        type: 'container',
        landscape: {x: 0, y: 0},
        portrait: {x: 0, y: 0}
    },

    bonusTurnsText: {
        type: 'text',
        style: 'infoText',
        alpha: 0.7,
        wordWrap: true,
        anchor: 0.5,
        align: 'center',
        string: 'bonusTurn',
        landscape: {x: 110, y: 220, wordWrapWidth: 1100, fontSize:30},
        portrait: {x: 460, y: 88, wordWrapWidth: 560, fontSize: 60},
    },


    /*
     * How To Play
     */
    howToPlayPages: {
        type: 'container',
        children: ['howToPlayPage1'],
    },
    howToPlayBackground: {
        type: 'sprite',
        landscape: {x: 720, y: 48, texture: 'landscape_tutorialBackground'},
        portrait: {x: 405, y: 0, texture: 'portrait_tutorialBackground'},
        anchor: {x: 0.5},
    },

    dropButton: {
        type: 'button',
        landscape: {x: 720, y: 700},
        portrait: {x: 405, y: 1070},
        string: 'button_drop',
        textures: {
            enabled: 'mainButtonEnabled',
            over: 'mainButtonOver',
            pressed: 'mainButtonPressed',
            disabled: 'mainButtonDisabled',
        },
        style: {
            enabled: 'mainButtonEnabled',
            over: 'mainButtonOver',
            pressed: 'mainButtonPressed',
            disabled: 'mainButtonDisabled',
        },
    },

    howToPlayPage1: {
        type: 'text',
        string: 'page1',
        style: 'howToPlayText',
        fontSize: 30,
        wordWrap: true,
        anchor: 0.5,
        align: 'center',
        landscape: {x: 720, y: 415, wordWrapWidth: 1100},
        portrait: {x: 405, y: 550, wordWrapWidth: 560},
    },
    winPlaqueMessage: {
        type: 'text',
        string: 'message_win',
        style: 'winPlaqueBody',
        y: -120,
        anchor: 0.5,
        portrait: { maxWidth: 700 },
        landscape: { maxWidth: 1000 },
    },
    ticketSelectCostValue: {
        type: 'text',
        portrait: { y: -30 },
        landscape: { y: -30 },
        anchor: 0.5,
        style: 'ticketSelectCostValue',
        maxWidth: 420
    }
});
