"use strict";

describe('zxcvbn service', function() {
	beforeEach(module('MemPassGen'));

	var zxcvbn;

	beforeEach(inject(function(_zxcvbn_) {
		zxcvbn = _zxcvbn_;
	}));

	it('should return an object with certain properties', function() {
		var object = zxcvbn("password");
		expect(object.hasOwnProperty("guesses")).toBeTruthy();
		expect(object.hasOwnProperty("score")).toBeTruthy();
		expect(object.hasOwnProperty("feedback")).toBeTruthy();
	});
});