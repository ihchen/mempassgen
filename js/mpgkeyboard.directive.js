angular.module('MemPassGen')
.directive('mpgKeyboard', function(FingerKeyMap) {
	function controller() {
		var self = this;

		this.fingerMap = FingerKeyMap.cloneFingerMap(FingerKeyMap.DEFAULT_FINGER_MAP);
		this.currentKey;	//Contains the jqlite element of the key that has been selected

		this.updateFingerMap = function(newfinger) {
			var oldfinger = this.currentKey.attr('finger');
			var text = this.currentKey.text();
			var shiftChar = text[0];
			var notShiftChar = text[1];
			var letter = false;
			// If not dual key, then it's a letter
			if(!text[1]) {
				notShiftChar = shiftChar.toLowerCase();
				letter = true;
			}

			// Change key color
			this.currentKey.removeClass(oldfinger.slice(1, oldfinger.length));
			this.currentKey.addClass(newfinger.slice(1, newfinger.length));
			// Update attribute
			this.currentKey.attr('finger', newfinger);

			if(letter) {
				var shiftChars = this.fingerMap[oldfinger].shiftOn.chars;
				var notShiftChars = this.fingerMap[oldfinger].shiftOff.chars;
				
				// Remove
				shiftChars.splice(shiftChars.indexOf(shiftChar), 1);
				notShiftChars.splice(notShiftChars.indexOf(notShiftChar), 1);
				// Add
				this.fingerMap[newfinger].shiftOn.chars.push(shiftChar);
				this.fingerMap[newfinger].shiftOff.chars.push(notShiftChar);
			}
			else {
				var shiftSymbols = this.fingerMap[oldfinger].shiftOn.symbols;
				var notShiftSymbols = this.fingerMap[oldfinger].shiftOff.symbols;
				var numbers = false;
				if(notShiftChar.charCodeAt() >= 48 && notShiftChar.charCodeAt() <= 57) {
					notShiftSymbols = this.fingerMap[oldfinger].shiftOff.numbers;
					numbers = true;
				}

				// Remove
				shiftSymbols.splice(shiftSymbols.indexOf(shiftChar), 1);
				notShiftSymbols.splice(notShiftSymbols.indexOf(notShiftChar), 1);
				// Add
				this.fingerMap[newfinger].shiftOn.symbols.push(shiftChar);
				if(numbers)
					this.fingerMap[newfinger].shiftOff.numbers.push(notShiftChar);
				else
					this.fingerMap[newfinger].shiftOff.symbols.push(notShiftChar);
			}
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
		scope: {},
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