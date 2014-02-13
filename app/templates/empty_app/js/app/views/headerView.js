var HeaderView = Backbone.Marionette.ItemView.extend({
	el:'#header',
	events:{
		'tap .button.back': 'onBackClicked',
		'tap .button.about': 'onAboutClicked'
	},
	initialize:function(){
		this.$backButton = this.$el.find('.back.button');
	},
	onBackClicked:function(){
		app.router.navigate('home', {trigger:true});
	},
	onAboutClicked:function(){
		app.router.navigate('about', {trigger:true});
	}
});