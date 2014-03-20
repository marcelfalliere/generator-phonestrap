"use strict";

function main(){
	window.app = new Backbone.Marionette.Application();
	initialize();
	app.start();
}

function initialize(){
	initializeLibs();
	initializeApp();
}

function initializeLibs(){
	initializeXhr();
	initializeBackbone();
	initializeHammer();
}

function initializeApp(){
	initializePlatformsSquirk();
	initializeRegions();
	initializeRouterAfterEverythingElse();
}

function initializeXhr(){
	$.ajaxSetup({ cache: false });
}

function initializeBackbone(){
	Backbone.emulateHTTP = true;
}

function initializeHammer(){
	$("#viewport").hammer();
}

function initializePlatformsSquirk(){
	if (isIOS7()) {
		$('html').attr('data-ios7',true);
	}
}

function initializeRegions(){
	app.addRegions({
		header:HeaderRegion,
		content:ContentRegion
	});
}

function initializeRouterAfterEverythingElse() {
	app.on("initialize:after", function(options){
	  this.router = new MainRouter();
	  Backbone.history.start({pushState: false});
	});
}

function isIOS7(){
	return navigator.userAgent.match(/(iPad|iPhone|iPod touch);.*CPU.*OS 7_\d/i)!=null
}
