Router.configure({
	layoutTemplate: 'layout'
});

Router.route('/', {name: 'projectsList'})

Router.route('/projects/:_id', {
	name: 'projectPage',
	data: function() {return Projects.findOne(this.params._id);}
});