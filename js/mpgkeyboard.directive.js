angular.module('MemPassGen', [])
.directive('mpgKeyboard', function() {
	function link(scope, element, attrs) {

	}
	return {
		restrict: 'E',
		scope: {},
		templateUrl: '../templ/mpgKeyboard.tmpl.html',
		link: link
	};
});