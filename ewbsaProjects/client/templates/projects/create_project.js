Template.createProject.events({
	'submit form': function(e) {
		e.preventDefault();

		var project = {
			name: $(e.target).find('#project-name').val(),
			blurb: $(e.target).find('#project-blurb').val(),
			summary: $(e.target).find('#project-summary').text()
		};

		project._id = Projects.insert(project);
		Router.go('projectPage', project);
	}
});