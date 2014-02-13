"use strict";

function main(){
	window.app = new Backbone.Marionette.Application();
	initializeApp();
	app.start();
}

function initializeApp(){
	initializeRegions();
	initializeHammer();
	initializeRouterAfterEverythingElse();
}

function initializeRegions(){
	app.addRegions({
		header:HeaderRegion,
		content:ContentRegion
	});
}

function initializeHammer(){
	$("#viewport").hammer();
}

function initializeRouterAfterEverythingElse() {
	app.on("initialize:after", function(options){
	  this.router = new MainRouter();
	  Backbone.history.start({pushState: false});
	});
}

document.querySelector("body").onload = main;