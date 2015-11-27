Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading'
});

Router.route('/', {name: 'projectsList'});

Router.route('/projects/:_id', {
	name: 'projectPage',
	data: function() {return Projects.findOne(this.params._id);}
});

Router.route('/create-project', {
	name: 'createProject'
});

var requireLogin = function() {
	if (! Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');
		}
	} else {
		this.next();
	}
}

Router.onBeforeAction('dataNotFound', {only: 'postPage'});

Router.onBeforeAction(requireLogin, {only: 'createProject'});