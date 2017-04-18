angular.module('MemPassGen')
.controller('PasswordController', function(FingerKeyMap, zxcvbn) {
	var self = this;

	self.fingerMap = FingerKeyMap.DEFAULT_FINGER_MAP;
	self.keyMap = FingerKeyMap.convertFingerToKey(self.fingerMap);

	self.password = '';
	self.options = FingerKeyMap.DEFAULT_OPTIONS;
	self.zxcvbnOnInput;
	self.zxcvbnOnPassword;

	var prevInput = '';

	self.generatePassword = function(input) {
		var newPassword = '';
		
		for(var i = 0; i < input.length; i++) {
			newPassword += getNearByKey(input[i]);
		}

		updateModels(input, newPassword);
	}

	self.updatePassword = function(input) {
		var newPassword = "";
		for(var i = 0; i < input.length; i++)
			if(input[i] != prevInput[i])
				newPassword += getNearByKey(input[i]);
			else
				newPassword += self.password[i];

		updateModels(input, newPassword);
	}

	self.loadFingerMap = function(fingerMap) {
		self.fingerMap = FingerKeyMap.cloneFingerMap(fingerMap);
		self.keyMap = FingerKeyMap.convertFingerToKey(self.fingerMap);
	}

	function updateModels(input, password) {
		self.password = password;
		prevInput = input;
		self.zxcvbnOnInput = zxcvbn(input);
		self.zxcvbnOnPassword = zxcvbn(password);
	}

	function getNearByKey(char) {
		var validKeys = FingerKeyMap.getListOfNearByKeys(char, self.keyMap, self.options);
		if(validKeys)
			return validKeys[Math.round(Math.random()*(validKeys.length-1))];
		else
			return char;
	}
});