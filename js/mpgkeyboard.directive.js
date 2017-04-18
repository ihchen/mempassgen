angular.module('MemPassGen')
.directive('mpgKeyboard', function(FingerKeyMap) {
	function controller() {
		var self = this;

		this.fingerMap = FingerKeyMap.cloneFingerMap(FingerKeyMap.DEFAULT_FINGER_MAP);
		this.currentKey;	//Contains the jqlite element of the key that has been selected

		this.updateFingerMap = function(newfinger) {
			var oldfinger = this.currentKey.attr('finger');
			var text = this.currentKey.text();
			var shiftOnChar = text[0];
			var shiftOffChar = text[1];
			// If not dual key, then it's a letter
			if(!text[1])
				shiftOffChar = shiftOnChar.toLowerCase();

			// Change key color
			this.currentKey.removeClass(oldfinger.slice(1, oldfinger.length));
			this.currentKey.addClass(newfinger.slice(1, newfinger.length));
			// Update attribute
			this.currentKey.attr('finger', newfinger);

			// Update finger map
			var shiftOnKeys = this.fingerMap[oldfinger].shiftOn;
			var shiftOffKeys = this.fingerMap[oldfinger].shiftOff;
			// Remove from old finger
			shiftOnKeys.splice(shiftOnKeys.indexOf(shiftOnChar), 1);
			shiftOffKeys.splice(shiftOffKeys.indexOf(shiftOffChar), 1);
			// Add to new finger
			this.fingerMap[newfinger].shiftOn.push(shiftOnChar);
			this.fingerMap[newfinger].shiftOff.push(shiftOffChar);
		}
	}

	function link(scope, element, attrs) {
		var keys = element.find('mpg-key');
		var menu = angular.element(element.children()[2]);

		var onKeysClick = function() {
			angular.element(menu.children()[0]).css('display', 'none');		//init-menu
			angular.element(menu.children()[1]).css('display', 'block');	//real-menu
			keys.off('mouseup');
		}
		keys.on('mouseup', onKeysClick);
	}

	return {
		restrict: 'E',
		scope: {
			save: '&'
		},
		templateUrl: '../templates/mpgKeyboard.tmpl.html',
		controller: controller,
		controllerAs: 'kbc',
		link: link
	};
})
.directive('mpgKey', function() {
	function link(scope, element, attrs, ctrls) {
		var keyboard = ctrls[0];
		var onKeyClick = function() {
			keyboard.currentKey = element;
			scope.$apply();
		}
		element.on('click', onKeyClick);
	}

	return {
		restrict: 'AE',
		scope: {},
		require: ['^mpgKeyboard'],
		link: link
	}
});	