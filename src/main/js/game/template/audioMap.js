define({
    // IMPLEMENT: Map SFX to channels

    /* 
     * If audio assets are named nicely you can do:
     * {
     *  fileName: channelNumber
     * }
     * 
     * Otherwise use a nice name for the keys and include the filename and channel as an array:
     * {
     *  soundName: ['Ugly_sound_file_V2-final', channelNumber]
     * }
     */

    music: ['MusicLoopDay', 0],
    musicNight: ['MusicLoopNight', 0],
    winTerminator: ['MusicTermWin', 1],
    loseTerminator: ['MusicTermLose', 1],
    winTerminatorNight: ['MusicNightTermWin', 1],
    loseTerminatorNight: ['MusicNightTermLose', 1],
    click: ['Click', 4],
    costDown: ['BetDown', 1],
    costUp: ['BetUp', 2],
    bonusDrop:['bonusDrop',11],
    costMax: ['BetMax', 3],
    transition: ['FreeSpinsTransition',2],
    bonusTurnIncrease1: ['BonusTurnsIncrease', 9],
    bonusTurnIncrease2: ['BonusTurnsIncrease', 10],
    bonusTurnIncrease3: ['BonusTurnsIncrease', 11],
    ambient: ['Ocean20s_mono', 12],
    start: ['BuyButton',2],
    preShow : ['BonusDrop',1],


    /*
     * Audio groups
     * A game can include multiple variations of each of these sounds. Ensure each variation starts
     * with the same name plus some kind of ordered suffix. Each time a sound group plays the next 
     * item in the group will be used.
     */

    lineMatch01:['LineMatch01',2],
    lineMatch02:['LineMatch02',3],
    lineMatch03:['LineMatch03',4],
    lineMatch04:['LineMatch04',5],
    lineMatch05:['LineMatch05',6],
    lineMatch06:['LineMatch06',7],
    lineMatch07:['LineMatch07',8],
    lineMatch08:['LineMatch08',9],

    blockDrop01:['BlockDrop01',2,0.6],
    blockDrop02:['BlockDrop02',3,0.6],
    blockDrop03:['BlockDrop03',4,0.6],
    blockDrop04:['BlockDrop04',5,0.6],
    blockDrop05:['BlockDrop05',6,0.6],
    blockDrop06:['BlockDrop06',7,0.6],
    blockDrop07:['BlockDrop07',8,0.6],
    blockDrop08:['BlockDrop08',9,0.6],
    blockDrop09:['BlockDrop09',10,0.6],


    /*
     * Optional audio
     * The following audio is optional and will be ignored if not included
     */

    //  buy: ['BuyButton', 4],
    //  revealAll: ['RevealAllButton', 4],
});
