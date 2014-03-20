"use strict";

var MainRouter = Backbone.Router.extend({
	routes:{
		'':'index'
	},
	index:function(){
		app.header.setTitle('<%= foldername %>');

		app.content.slideInFromRight(new HomeVC());
	}
});

