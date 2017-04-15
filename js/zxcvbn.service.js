angular.module('MemPassGen')
.factory('zxcvbn', function() {
	return function(input) {
		return zxcvbn(input);
	};
});