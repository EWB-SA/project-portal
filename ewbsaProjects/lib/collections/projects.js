Projects = new Mongo.Collection('projects');

Projects.allow({
	insert: function(userId, doc){
		return !! userId;
	}
});