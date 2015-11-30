Projects = new Mongo.Collection('projects');

Projects.allow({
	update: function(userId, project) {return ownsDocument(userId, project);},
	remove: function(userId, project) {return ownsDocument(userId, project);}
});

Projects.deny({
	update: function(userId, project, fieldNames) {
		//user may only edit the follwing fields:
		return (_.without(fieldNames, 'name', 'blurb', 'summary').length > 0);
	}
});

Projects.deny({
	update: function(userId, project, fieldNames, moodifier) {
		var errors = validateProject(modifier.$set);
		return errors.name || errors.blurb || errors.summary;
	}
});

Meteor.methods({
	projectInsert: function(postAttributes){
		check(Meteor.userId(), String);
		check(postAttributes,{
			name: String,
			blurb: String,
			summary: String
		});

		var errors = validateProject(postAttributes);
		if (errors.name || errors.blurb || errors.summary) {
			throw new Meteor.Error('invalid-post', "You have incomplete fields in your submmission.");
		}

		var user = Meteor.user();
		var project = _.extend(postAttributes, {
			creatorId: user._id,
			submitted: new Date()
		});

		var projectId = Projects.insert(project);

		return {
			_id: projectId
		};
	}
});

validateProject = function(project) {
	var errors = {};

	if (!project.name){
		errors.name = "Please give your project a name.";
	}

	if (!project.blurb){
		errors.blurb = "Please give your project a blurb.";
	}

	if (!project.summary){
		errors.summary = "Please give your project a summary.";
	}

	return errors;
};