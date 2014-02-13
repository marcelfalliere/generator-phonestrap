"use strict";

var HeaderRegion = Backbone.Marionette.Region.extend({
	el:'#header',
	initialize:function(){
		this.headerView = new HeaderView();
	},

	setTitle:function(title){
		this.ensureEl();
		this.$title.html(title);
		return this;
	},

	hideButton:function(buttonId){
		this.ensureEl();
		var button = this.buttons[buttonId];
		if (button) {
			if (button.hasClass('shown')) {
				button
					.removeClass('shown')
					.addClass('hidebuttonanim')
					.on('webkitAnimationEnd', _.bind(function(){
							this.off('webkitAnimationEnd')
								.addClass('hidden')
								.removeClass('hidebuttonanim');
						}, button));

			} else {
				button.addClass('hidden');
			}
		}
		return this;
	},

	showButton:function(buttonId, possibleRoute) {
		this.ensureEl();
		var button = this.buttons[buttonId];
		if (button) {
			button
				.removeClass('hidden')
				.addClass('showbuttonanim')
				.on('webkitAnimationEnd', _.bind(function(){
						this.off('webkitAnimationEnd')
							.addClass('shown')
							.removeClass('showbuttonanim');
					}, button));
			if (possibleRoute) {
				button.attr('data-route', possibleRoute)
			}
		}
		return this;
	},

	ensureEl:function(){
		Backbone.Marionette.Region.prototype.ensureEl.call(this);
		this.buttons = {
			// -> declare the headers buttons here !
			//back: this.$el.find('.button.back'),
			//about: this.$el.find('.button.about')
		};
		this.$title = this.$el.find('h1');
	}
});