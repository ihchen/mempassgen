"use strict";

describe('Password Controller', function() {
	beforeEach(module("MemPassGen"));

	var ctrl, FingerKeyMap, getValidKeys;

	beforeEach(inject(function($controller, _FingerKeyMap_){
		FingerKeyMap = _FingerKeyMap_;
		ctrl = $controller('PasswordController', {FingerKeyMap: FingerKeyMap});
		getValidKeys = function(lowerChar, options=ctrl.options) {
			return FingerKeyMap.getListOfNearByKeys(lowerChar, ctrl.keyMap, options);
		}
	}));

	describe('generateMemorablePassword', function() {
		var userInput;

		beforeEach(function() {
			userInput = "thisisatest";
			ctrl.generateMemorablePassword(userInput);
		});

		it('should generate a password of the same length as the input', function() {
			expect(ctrl.password.length).toBe(userInput.length);
		});

		it('should generate a valid password based on the keymap', function() {
			for(var i = 0; i < userInput.length; i++)
				expect(getValidKeys(userInput[i])).toContain(ctrl.password[i]);
		});

		it('should return input if the input was not in keymap', function() {
			userInput = "#";
			ctrl.generateMemorablePassword(userInput);
			expect(ctrl.password).toBe(userInput);
		});

		it('should return shifted or not shifted keys based on input if shiftMatch set', function() {
			ctrl.options.shiftMatch = true;
			ctrl.generateMemorablePassword(userInput);
			for(var i = 0; i < userInput.length; i++)
				expect(getValidKeys(userInput[i], {shiftMatch: true})).toContain(ctrl.password[i]);
		});
	});

	describe('self.updatePass', function() {
		var userInput;

		beforeEach(function() {
			userInput = "thisisa";
			ctrl.generateMemorablePassword(userInput);
		});

		describe('Password should be same length as input', function() {
			afterEach(function() {
				ctrl.updatePassword(userInput);
				expect(ctrl.password.length).toBe(userInput.length);
			});

			it('appending to user input', function() {
				userInput += "test";
			});

			it('slicing from user input', function() {
				userInput = userInput.slice(0,4);
			});

			it('changing substring values without affecting length', function() {
				userInput = "thisaba";
			});

			it('changing substring and adding', function() {
				userInput = "thisitortilla";
			});

			it('changing substring and removing', function() {
				userInput = "thong";
			});
		});

		describe('Previously generated keys should be preserved if input character not changed', function() {
			var oldPassword;

			beforeEach(function() {
				oldPassword = ctrl.password;
			});

			it('user appended more input', function() {
				userInput += "test";
				ctrl.updatePassword(userInput);

				expect(ctrl.password.slice(0, 7)).toBe(oldPassword);
				for(var i = 7; i < ctrl.password.length; i++)
					expect(getValidKeys(userInput[i])).toContain(ctrl.password[i]);
			});

			it('user removed some input', function() {
				userInput = userInput.slice(0,4);
				ctrl.updatePassword(userInput);

				expect(ctrl.password).toBe(oldPassword.slice(0,4));
			});

			it('user changed substring without affecting length', function() {
				userInput = "thisaba";
				ctrl.updatePassword(userInput);

				expect(ctrl.password.slice(0,4)).toBe(oldPassword.slice(0,4));
				expect(ctrl.password[ctrl.password.length-1]).toBe(oldPassword[oldPassword.length-1]);
				for(var i = 4; i < 6; i++)
					expect(getValidKeys(userInput[i])).toContain(ctrl.password[i]);
			});

			it('user changed substring while adding', function() {
				userInput = "thisitortilla";
				ctrl.updatePassword(userInput);

				expect(ctrl.password.slice(0,5)).toBe(oldPassword.slice(0,5));
				for(var i = 5; i < ctrl.password.length; i++)
					expect(getValidKeys(userInput[i])).toContain(ctrl.password[i]);
			});

			it('user changed substring while removing', function() {
				userInput = "thong";
				ctrl.updatePassword(userInput);

				expect(ctrl.password.slice(0,2)).toBe(oldPassword.slice(0,2));
				for(var i = 2; i < ctrl.password.length; i++)
					expect(getValidKeys(userInput[i])).toContain(ctrl.password[i]);
			});
		});
	});
});