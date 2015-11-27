Projects = new Mongo.Collection('projects');

Projects.allow({
	insert: function(userId, doc){
		return !! userId;
	}
});

Meteor.methods({
	projectInsert: function(postAttributes){
		check(Meteor.userId(), String);
		check(postAttributes,{
			name: String,
			blurb: String,
			summary: String
		})

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