"use strict";

describe('Finger Key Map Service', function() {
	beforeEach(module("MemPassGen"));

	var FingerKeyMap;
	var testfingermap = 
	{
		"finger": {
			"shiftOn": {
				"symbols":["~"],
				"chars":["Q"]
			},
			"shiftOff": {
				"symbols":["`"],
				"numbers":["1"],
				"chars":["q"]
			}
		}
	}
	var testkeymap = 
	{
		"Q": {
			"symbols": ["~"],
			"chars": []
		},
		"q": {
			"symbols": ["`"],
			"numbers": ["1"],
			"chars": []
		}
	}

	beforeEach(inject(function(_FingerKeyMap_) {
		FingerKeyMap = _FingerKeyMap_;
		FingerKeyMap.setFingerMap(testfingermap);
	}));

	it('should default to our test json file', function() {
		expect(FingerKeyMap.fingerMap).toEqual(testfingermap);
	});

	it('key map should convert properly', function() {
		expect(FingerKeyMap.keyMap).toEqual(testkeymap);
	});
})