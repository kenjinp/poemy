(function() {
	var app = angular.module('poemy', []);
	app.controller('PoemController', function() {
		this.poems = samplePoems;
		this.getPoems =  function($scope, $http) {
			$http.get('/api/index.html')
            .success(function(data) {
                $scope.poems = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('error: ' + data);
            });
        };
	});

	app.controller("LineController", function() {
		function completePoem(poem) {
			if (poem.numLines > poem.lines.length) {
				poem.complete = false;
			} else {
				poem.complete = true;
			}
		};
		this.newLine = "";
		this.addNewLine = function(poem) {
			poem.lines.push(this.newLine);
			this.newLine = "";
			completePoem(poem);
		}
	});

	var samplePoems = [{
		title: "Sample Poem",
		numLines: 3,
		type: "Haiku",
		lines: ["this is a first line,", "But the second is best,", "and the third is last."],
		complete: true
	}, {
		title: "Poem 2",
		numLines: 3,
		type: "Haiku",
		lines: ['An old silent pond...', 'A frog jumps into the pond,'],
		complete: false
	}, {
		title: "Poem 3",
		numLines: 3,
		type: "Haiku",
		lines: ["Light of the moon"],
		complete: false
	}, {
		title: "Poem 4",
		numLines: 3,
		type: "Haiku",
		lines: ["A cricket disturbed", "the sleeping child; on the porch", "a man smoked and smiled."],
		complete: true
	}];
})();



//GET request to display one poems
	//pass poem object to PoemController

//POST new line from addNewLine 

//Button listener POST