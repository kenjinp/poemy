(function() {
	var app = angular.module('poemy', []);
	app.controller('PoemController', function() {
		this.poems = samplePoems;
	});

	app.controller("LineController", function() {
		this.newLine = "";
		this.addNewLine = function(poem) {
			poem.lines.push(this.newLine);
			this.newLine = "";
		}
	});

	var samplePoems = [{
		title: "Sample Poem",
		type: "Haiku",
		lines: ["this is a first line,", "But the second is best,", "and the third is last."],
		complete: true
	}, {
		title: "Poem 2",
		type: "Haiku",
		lines: ['An old silent pond...', 'A frog jumps into the pond,'],
		complete: false
	}, {
		title: "Poem 3",
		type: "Haiku",
		lines: ["Light of the moon"],
		complete: false
	}, {
		title: "Poem 4	",
		type: "Haiku",
		lines: ["A cricket disturbed", "the sleeping child; on the porch", "a man smoked and smiled."],
		complete: true
	}];
})();
