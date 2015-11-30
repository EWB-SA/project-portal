Template.editProject.onCreated(function() {
	Session.set('editProjectErrors', {});
});

Template.editProject.helpers({
	errorMessage: function(field){
		return Session.get('editProjectErrors')[field];
	},
	errorClass: function(field) {
		return !!Session.get('editProjectErrors')[field] ? 'has-error' : '';
	}
});

Template.editProject.events({
	'submit form': function(e) {
		e.preventDefault();
		var currentProjectId = this._id;
		var projectProperties = {
			name: $(e.target).find('#project-name').val(),
			blurb: $(e.target).find('#project-blurb').val(),
			summary: $(e.target).find('#project-summary').val()
		}

		var errors = validateProject(projectProperties);
		if (errors.name || errors.blurb || errors.summary) {
			return Session.set('editProjectErrors', errors);
		}

		Projects.update(currentProjectId, {$set: projectProperties}, function(error) {
			if (error) {
				// display the error to the user
				throwError(error.reason);
			} else {
				Router.go('projectPage', {_id: currentProjectId});
			}
		});
	},

	'click .delete': function(e) {
		e.preventDefault();
		if (confirm("Delete this project?")) {
			var currentProjectId = this._id;
			Projects.remove(currentProjectId);
			Router.go('projectsList');
		}
	}
});