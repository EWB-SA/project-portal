Template.createProject.events({
	'submit form': function(e) {
		e.preventDefault();

		var project = {
			name: $(e.target).find('#project-name').val(),
			blurb: $(e.target).find('#project-blurb').val(),
			summary: $(e.target).find('#project-summary').val()
		};

		var errors = validateProject(project);
		if (errors.name || errors.blurb || errors.summary) {
			return Session.set('createProjectErrors', errors);
		}

		Meteor.call('projectInsert', project, function(error, result) {
			// display the error to the user and abort
			if (error){
				return throwError(error.reason);
			}
			Router.go('projectPage', {_id: result._id});
		});
	}
});

Template.createProject.onCreated(function(){
	Session.set('createProjectErrors', {});
});

Template.createProject.helpers({
	errorMessage: function(field){
		return Session.get('createProjectErrors')[field];
	},
	errorClass: function(field){
		return !!Session.get('createProjectErrors')[field] ? 'has-error' : '';
	}
});