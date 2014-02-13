"use strict";

var ContentRegion = Backbone.Marionette.Region.extend({
	el:'#content',
	slideIn:function(view) {
		this.transition(view, 'slide in', 'slide out easy');
	},
	slideInFromRight:function(view) {
		this.transition(view, 'slide in left', 'slide out easy right');
	},
	transition:function(view, animIn, animOut) {
		this.ensureEl();

		var isReplacingAView = this.currentView!=undefined;

		if (isReplacingAView) {

			this.currentView.$el
				.addClass(animOut)
				.on('webkitAnimationEnd', _.bind(function(){
					this.$el.off('webkitAnimationEnd');
					this.close();
					this.remove();
				}, this.currentView));

			view.render();

			view.$el
				.addClass(animIn)
				.one('webkitAnimationEnd', _.bind(function(){
					this.off('webkitAnimationEnd')
						.removeClass(animIn)
						.trigger('pageshow')
				}, view.$el));

			this.$el.append(view.el);
			
			this.currentView = view;

		} else {
			this.show(view);
			view.$el.trigger('pageshow');
		}
	}
});