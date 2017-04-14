angular.module('MemPassGen')
.controller('PasswordController', function(FingerKeyMap) {
	var self = this;

	self.fingerMap = FingerKeyMap.DEFAULT_FINGER_MAP;
	self.keyMap = FingerKeyMap.convertFingerToKey(self.fingerMap);

	self.password = '';

	var prevInput = '';

	self.generateMemorablePassword = function(input) {
		var password = '';
		
		for(var i = 0; i < input.length; i++) {
			password += getNearByKey(input[i]);
		}

		self.password = password;
		prevInput = input;
	}

	self.updatePassword = function(input) {
		var newPassword = "";
		for(var i = 0; i < input.length; i++)
			if(input[i] != prevInput[i])
				newPassword += getNearByKey(input[i]);
			else
				newPassword += self.password[i];

		self.password = newPassword;			
	}

	function getNearByKey(char) {
		var validKeys = getListOfNearByKeys(char, self.keyMap);
		return validKeys[Math.round(Math.random()*(validKeys.length-1))];
	}

	function getListOfNearByKeys(char, keyMap) {
		if(char in keyMap) {
			var validKeys =  [];

			validKeys = validKeys.concat(keyMap[char]);
			if(char.charCodeAt() >= 97) {
				validKeys = validKeys.concat(keyMap[char.toUpperCase()]);
			}
			else {
				validKeys = validKeys.concat(keyMap[char.toLowerCase()]);
			}
			return validKeys;
		}
		else return undefined;
	}
})