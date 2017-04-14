angular.module('MemPassGen')
.controller('PasswordController', function(FingerKeyMap) {
	var self = this;

	self.fingerMap = FingerKeyMap.DEFAULT_FINGER_MAP;
	self.keyMap = FingerKeyMap.convertFingerToKey(self.fingerMap);

	self.password = '';
	/* Options
		shiftMatch
		include letters
	*/

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
		var validKeys = FingerKeyMap.getListOfNearByKeys(char, self.keyMap);
		return validKeys[Math.round(Math.random()*(validKeys.length-1))];
	}
})