Router.route('/', {
	waitOn: function (argument) {
		// return Meteor.subscribe('continents');
	},
	action: function (argument) {
		if(this.ready()){
			this.layout('layout');
			this.render('home');
		}
	}
});

Router.route('/setup/:step', {
	name: "setup",
	action: function() {
		this.layout('layout');
		this.render('setupWizard');
	}
});