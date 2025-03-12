define(require => {
  const PIXI = require('com/pixijs/pixi');
  const utils = require('skbJet/componentManchester/standardIW/layout/utils');
  const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
  const FittedText = require('skbJet/componentManchester/standardIW/components/fittedText');
  const textStyles = require('skbJet/componentManchester/standardIW/textStyles');

  const NumberCard = require('./NumberCard');

  const TEXT_Y_POS = 65;
  const TEXT_PADDING = 10;
  const Y_OFFSET = -15;

  class PlayerNumber extends NumberCard {
    constructor() {
      super();

      // Set background and cover textures
      if (PIXI.utils.TextureCache.yourNumberValueBackground !== undefined) {
        this.background.texture = PIXI.Texture.fromFrame('yourNumberValueBackground');
      }
      const revealFrames = utils.findFrameSequence('yourNumberCover');
      this.revealAnim.textures = revealFrames.map(PIXI.Texture.from);
      const idleFrames = utils.findFrameSequence('yourNumberIdle');
      if (idleFrames.length > 0) {
        this.idleAnim.textures = idleFrames.map(PIXI.Texture.from);
      }

      // Add text for prize value
      this.valueText = new FittedText('XXXXXX');
      this.valueText.anchor.set(0.5);
      this.valueText.y = TEXT_Y_POS;
      this.valueText.style = textStyles.parse('prizeValueNoWin');
      this.valueText.maxWidth = this.WIDTH - TEXT_PADDING * 2;
      this.noWin.addChild(this.valueText);
      this.valueTextWin = new FittedText('XXXXXX');
      this.valueTextWin.anchor.set(0.5);
      this.valueTextWin.y = TEXT_Y_POS;
      this.valueTextWin.style = textStyles.parse('prizeValueWin');
      this.valueTextWin.maxWidth = this.WIDTH - TEXT_PADDING * 2;
      this.win.addChild(this.valueTextWin);

      // Offset everything to account for the value text at the bottom
      this.win.y = Y_OFFSET;
      this.noWin.y = Y_OFFSET;

      this.reset();
    }

    populate([number, value]) {
      this.number = number;
      this.value = value;
      this.valueText.text = SKBeInstant.formatCurrency(value).formattedAmount;
      
      this.valueTextWin.text = this.valueText.text;
      super.populate(number);
    }

    reset() {
      super.reset();
      this.valueText.text = '';
      this.valueTextWin.text = '';
    }

    static fromContainer(container) {
      const card = new PlayerNumber();
      container.addChild(card);
      return card;
    }
  }

  return PlayerNumber;
});
