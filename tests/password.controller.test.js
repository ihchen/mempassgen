describe('Password Controller', function() {
	beforeEach(module("MemPassGen"));

	var controller, FingerKeyMap;

	beforeEach(inject(function($controller, _FingerKeyMap_){
		FingerKeyMap = _FingerKeyMap_;
		controller = $controller('PasswordController', {FingerKeyMap: FingerKeyMap});
	}));

	describe('generateMemorablePassword', function() {
		var userInput;

		beforeEach(function() {
			userInput = "thisisatest";
			controller.generateMemorablePassword(userInput);
		});

		it('should generate a password of the same length as the input', function() {
			expect(controller.password.length).toEqual(userInput.length);
		});

		it('should generate a valid password based on the keymap', function() {
			for(var i = 0; i < userInput.length; i++) {
				expect(controller.keyMap[userInput[i]].concat(controller.keyMap[userInput[i].toUpperCase()]))
					.toContain(controller.password[i]);
			}
		});
	});

	// describe('self.updatePass', function() {
	// 	it('should only append new keys if user added more input', function() {

	// 	});
	// });
});