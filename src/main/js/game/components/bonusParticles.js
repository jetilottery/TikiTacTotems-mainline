define(require => {
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const PIXI = require('com/pixijs/pixi');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');

    require('com/gsap/TimelineMax');
    require('com/gsap/easing/CustomEase');
    require('com/gsap/plugins/BezierPlugin');
    require('com/pixijs/pixi-particles');
    // require('com/pixijs/pixi-filters');

    const TimeLine = window.TimelineMax;

    let options = {
        "alpha": {
            "start": 1,
            "end": 0
        },
        "scale": {
            "start": 0.1,
            "end": 0.7,
            "minimumScaleMultiplier": 1
        },
        "color": {
            "start": "#ff8800",
            "end": "#ffd89e"
        },
        "speed": {
            "start": 10,
            "end": 5,
            "minimumSpeedMultiplier": 10
        },
        "acceleration": {
            "x": 0,
            "y": 0
        },
        "maxSpeed": 0,
        "startRotation": {
            "min": 0,
            "max": 360
        },
        "noRotation": false,
        "rotationSpeed": {
            "min": 1,
            "max": 0
        },
        "lifetime": {
            "min": 0.1,
            "max": 1
        },
        "blendMode": "screen",
        "frequency": 0.001,
        "emitterLifetime": -1,
        "maxParticles": 5000,
        "pos": {
            "x": 0,
            "y": 1
        },
        "addAtBack": true,
        "spawnType": "point"
    };

    let points = [];

    let startParams = {
        x: 0,
        y: 0,
        alpha: 1
    };

    let endParams = {
        bezier: {
            values: points,
            autoRotate: true
        },
        alpha: 0
    };

    let currentBonusSymbol;

    function init() {
        for (let i = 0; i < 3; i++) {
            displayList['particlesContainer_' + (i + 1)].particleEmitter = new PIXI.particles.Emitter(
                displayList['particlesContainer_' + (i + 1)],
                [PIXI.Texture.from('Single_Sparkle_2')],
                options
            );
            // displayList['particlesContainer_' + (i + 1)].filters = [new PIXI.filters.AdvancedBloomFilter({
            //     threshold: 0.1,
            //     bloomScale: 1,
            //     brightness: 0.8,
            //     blur: 2,
            //     quality: 6
            // })];
            displayList['particlesContainer_' + (i + 1)].particleEmitter.autoUpdate = true;
            displayList['particlesContainer_' + (i + 1)].particleEmitter.emit = false;
            displayList['particlesContainer_' + (i + 1)].visible = false;
        }
    }

    function emit(index) {
        return new Promise(resolve => {
            setPoints(index);
            let emitter = displayList['particlesContainer_' + (index + 1)].particleEmitter;
            displayList['particlesContainer_' + (index + 1)].visible = true;
            currentBonusSymbol.bonusWinSparkle(index === 0);
            let timeLine = new TimeLine({
                onComplete: () => {
                    emitter.emit = false;
                    resolve();
                }
            });

            timeLine.fromTo(emitter.ownerPos, gameConfig.bonusParticleSpeed,
                startParams,
                endParams
            );
            emitter.emit = true;
        });
    }

    function reset() {
        for (let i = 0; i < 3; i++) {
            displayList['particlesContainer_' + (i + 1)].visible = false;
            displayList['particlesContainer_' + (i + 1)].position.set(0);
        }
    }

    function setPoints(index) {
        points = [];

        let startX = currentBonusSymbol.toGlobal({x: 0, y: 0}).x;
        let startY = currentBonusSymbol.toGlobal({x: 0, y: 0}).y;

        startParams.x = startX;
        startParams.y = startY;

        let endX = orientation.get() === orientation.LANDSCAPE ? 200 : 162;
        let endY = orientation.get() === orientation.LANDSCAPE ? 435 : 1000 ;

        let offset = 0;

        if(index%2) {
            offset = orientation.get() === orientation.LANDSCAPE ?  605 : 243;
        } else {
            offset = orientation.get() === orientation.LANDSCAPE ? 205 :  81;
        }



        points.push({x: startX, y: startY});
        points.push({
            x: orientation.get() === orientation.LANDSCAPE ? (startX - endX) : offset,
            y: orientation.get() === orientation.LANDSCAPE ? offset : startY});
        points.push({x: endX, y: endY});

        endParams.bezier.values = points;
    }

    return {
        get bonusSymbol() {
            return currentBonusSymbol;
        },
        set bonusSymbol(val) {
            currentBonusSymbol = val;
        },
        init,
        emit,
        reset,
        setPoints,
    };


});
