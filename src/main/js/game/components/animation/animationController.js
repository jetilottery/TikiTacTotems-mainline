define(require => {

    const resources = require('skbJet/component/resourceLoader/resourceLib');
    const PIXI = require('com/pixijs/pixi');

    require('com/gsap/TweenLite');

    const Tween = window.TweenLite;


    let animationList = {

    };

    function addAnimation(value) {
        let anim =  new PIXI.spine.Spine( resources.spine[value.file].spineData );
        animationList[value.index] = {};
        animationList[value.index].index = value.index;
        animationList[value.index].spineObject = anim;
        animationList[value.index].name = value.name;
        animationList[value.index].loop = value.loop;

        anim.position.set(
            value.x,
            value.y
        );

        anim.pivot.set(
            value.pivotX,
            value.pivotY
        );

        if(value.back === undefined) {
            value.container.addChild(anim);
        } else {
            value.container.addChildAt(anim,0);
        }

    }

    function getAnimation(value) {
        return animationList[value];
    }

    function getAnimationList() {
        return animationList;
    }

    function playAnimation(value) {
        animationList[value.index].spineObject.state.setAnimation(
            0,
            value.anim,
            value.loop === undefined ? animationList[value.index].loop : value.loop
        );
    }

    function queueAnimation(value) {
        animationList[value.index].spineObject.state.addAnimation(
            0,
            value.anim,
            value.loop === undefined ? animationList[value.index].loop : value.loop
        );
    }

    function fadeBetween(current,next,time) {
        Tween.to(current,time,{
           alpha:0
        });
        Tween.to(next,time,{
            alpha:1
        });
    }

    return {
        getAnimation,
        playAnimation,
        queueAnimation,
        fadeBetween,
        getAnimationList,
        addAnimation,
    };

});