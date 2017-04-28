angular.module('MemPassGen')
.directive('mpgKeyboard', function(FingerKeyMap, $location) {
	function controller($scope, $element) {
		var self = this;

		this.fingerMap = FingerKeyMap.cloneFingerMap($scope.currentMap);
		this.currentKey;	//Contains the jqlite element of the key that has been selected

		this.updateFingerMap = function(newfinger) {
			var oldfinger = this.currentKey.attr('finger');
			var text = this.currentKey.text();
			var shiftOnChar = text[0];
			var shiftOffChar = text[1];
			// If not dual key, then it's a letter
			if(!text[1])
				shiftOffChar = shiftOnChar.toLowerCase();

			changeFingerAttr(this.currentKey, oldfinger, newfinger);

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

		this.clearFingerMapChanges = function() {
			this.fingerMap = FingerKeyMap.cloneFingerMap($scope.currentMap);
			mapColorsToFingerMap(this.fingerMap);
		}

		function changeFingerAttr(element, oldfinger, newfinger) {
			element.attr('finger', newfinger);
			element.removeClass(oldfinger.slice(1, oldfinger.length));
			element.addClass(newfinger.slice(1, newfinger.length));
		}

		function mapColorsToFingerMap(fingerMap) {
			var keyToFingerMap = getKeyToFingerMap(fingerMap);

			angular.forEach($element.find('mpg-key'), function(mpgkey) {
				mpgkey = angular.element(mpgkey);
				var oldfinger = mpgkey.attr('finger');
				var key = mpgkey.text()[0];
				var newfinger = keyToFingerMap[key];

				if(oldfinger != newfinger)
					changeFingerAttr(mpgkey, oldfinger, newfinger);
			});
		}

		function getKeyToFingerMap(fingerMap) {
			var keyToFinger = {};

			for(var finger in fingerMap) {
				var shiftOnArr = fingerMap[finger].shiftOn;	//Only need shifted chars only

				for(var i = 0; i < shiftOnArr.length; i++)
					keyToFinger[shiftOnArr[i]] = finger;
			}

			return keyToFinger;
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
			save: '&',
			currentMap: '='
		},
		templateUrl: $location.absUrl()+'templates/mpgKeyboard.tmpl.html',
		controller: controller,
		controllerAs: 'kbc',
		link: link
	};
})
.directive('mpgKey', function() {
	function link(scope, element, attrs, ctrls) {
		var keyboard = ctrls[0];
		var onKeyClick = function() {
			if(keyboard.currentKey)
				keyboard.currentKey.removeClass('active');
			element.addClass('active');

			keyboard.currentKey = element;
			scope.$apply();
		}
		element.on('click', onKeyClick);
	}

	return {
		restrict: 'E',
		transclude: true,
		scope: {},
		template: '<ng-transclude class="key-contents"></ng-transclude>',
		require: ['^mpgKeyboard'],
		link: link
	}
});	