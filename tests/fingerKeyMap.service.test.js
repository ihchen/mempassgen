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
	}));

	it('it should convert finger to key map properly', function() {
		expect(FingerKeyMap.convertFingerToKey(testfingermap)).toEqual(testkeymap);
	});
})