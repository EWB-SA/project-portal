Template.createProject.events({
	'submit form': function(e) {
		e.preventDefault();

		var project = {
			name: $(e.target).find('#project-name').val(),
			blurb: $(e.target).find('#project-blurb').val(),
			summary: $(e.target).find('#project-summary').val()
		};

		Meteor.call('projectInsert', project, function(error, result) {
			// display the error to the user and abort
			if (error){
				return alert(error.reason);
			}
			Router.go('projectPage', {_id: result._id});
		});
	}
});