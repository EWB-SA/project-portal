Template.projectPage.helpers({
	projectCreator: function() {
		return this.creatorId === Meteor.userId();
	}
});