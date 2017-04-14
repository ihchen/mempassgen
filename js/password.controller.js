angular.module('MemPassGen')
.controller('PasswordController', function(FingerKeyMap) {
	var self = this;

	self.fingerMap = FingerKeyMap.DEFAULT_FINGER_MAP;
	self.keyMap = FingerKeyMap.convertFingerToKey(self.fingerMap);

	self.password = '';
	self.oldInput = '';

	this.getListOfNearByKeys = function getListOfNearByKeys(char, keyMap) {
		if(char in keyMap) {
			var validKeys =  [];

			validKeys = validKeys.concat(keyMap[char].symbols).concat(keyMap[char].chars);
			if(char.charCodeAt() >= 97) {
				validKeys = validKeys.concat(keyMap[char.toUpperCase()].symbols).concat(keyMap[char.toUpperCase()].chars);
				validKeys = validKeys.concat(keyMap[char].numbers);
			}
			else {
				validKeys = validKeys.concat(keyMap[char.toLowerCase()].symbols).concat(keyMap[char.toLowerCase()].chars).concat(keyMap[char.toLowerCase()].numbers);
			}
			return validKeys;
		}
		else return undefined;
	}
})