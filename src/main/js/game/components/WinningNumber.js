define((require) => {
  const PIXI = require('com/pixijs/pixi');
  const utils = require('skbJet/componentManchester/standardIW/layout/utils');

  const NumberCard = require('./NumberCard');
  
  class WinningNumber extends NumberCard {
    constructor() {
      super();
      if (PIXI.utils.TextureCache.luckyNumberBackground !== undefined) {
        this.background.texture = PIXI.Texture.fromFrame('luckyNumberBackground');
      }
      var revealFrames = utils.findFrameSequence('luckyNumberCover');
      this.revealAnim.textures = revealFrames.map(PIXI.Texture.from);
      var idleFrames = utils.findFrameSequence('luckyNumberIdle');
      if (idleFrames) {
        this.idleAnim.textures = idleFrames.map(PIXI.Texture.from);
      }

      this.reset();
    }

    static fromContainer(container) {
      const card = new WinningNumber();
      container.addChild(card);
      return card;
    }
  }

  return WinningNumber;
});
