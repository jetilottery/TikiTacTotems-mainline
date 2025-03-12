define(require => {
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const resources = require('skbJet/component/pixiResourceLoader/pixiResourceLoader');

    return data => ({
        cells: {
            prizeLevel: data.division,
            description: resources.i18n.Paytable.descriptionList[String(data.division)],
            prizeValue: SKBeInstant.formatCurrency(data.prize).formattedAmount,
        },
    });
});
