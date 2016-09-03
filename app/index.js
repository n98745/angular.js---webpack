var angular = require('angular');
angular.module('myApp', [])
	.controller('titleCtrl',  function ($scope) {
	    $scope.title = "webpack+angular.js";   
	});


