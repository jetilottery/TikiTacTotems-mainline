/**
* @module splashLoadController
* @description load translated text and asset in splash page.
*/
define([
	'skbJet/component/resourceLoader/ResourceLoader',
	'skbJet/component/resourceLoader/subLoaders/HtmlTagSubLoader',
	'skbJet/component/resourceLoader/subLoaders/TextFilesSubLoader'
], function(
	ResourceLoader, 
	HtmlTagSubLoader,
	TextFilesSubLoader
){
	
	function load(onLoadDone){
		var assetPack = window.location.search.match(/&?assetPack=(\w+)&?/)[1];
		var languageCode = window.location.search.match(/&?language=([^&]+)&?/)[1];
		var skinCode = window.location.search.match(/&?skincode=(\w+)&?/)[1];
		ResourceLoader.initDefault('assetPacks/'+assetPack, languageCode, skinCode);
		var defaultLoader = ResourceLoader.getDefault();
		var i18nSubLoader = new TextFilesSubLoader({type:'i18n', parseJson:true});
		i18nSubLoader.origLoad = i18nSubLoader.load;
		i18nSubLoader.load = function(fileMap, options){
			for(var url in fileMap){
				if(!url.match(/splash\.json$/)){//remove splash.json
					delete fileMap[url];
				}
			}
			this.origLoad(fileMap, options);
		};
		defaultLoader.addSubLoader('i18n', i18nSubLoader);
		defaultLoader.addSubLoader('splashSprites', new TextFilesSubLoader({
			type:'splash',
			parseJson:true,
			fileExtFilterList: ['json']
		}));
		defaultLoader.addSubLoader('splash', new HtmlTagSubLoader({
			type:'splash',
			tagName:'img',
			fileExtFilterList: ['jpg', 'png'],
		}));
		defaultLoader.load(function(){//onFileLoaded
			if(defaultLoader.currentProgress().complete){
				if(onLoadDone){
					onLoadDone();
				}
			}
		}, function(){//onFileLoadFailed
			console.log('Splash resource load error!');
		});
	}
	
	return {
		load:load
	};
});
