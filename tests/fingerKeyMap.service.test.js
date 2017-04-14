"use strict";

describe('Finger Key Map Service', function() {
	beforeEach(module("MemPassGen"));

	var FingerKeyMap;
	var testfingermap = 
	{
		"finger": {
			"shiftOn": {
				"symbols":["~"],
				"chars":["Q", "A"]
			},
			"shiftOff": {
				"symbols":["`"],
				"numbers":["1"],
				"chars":["q", "a"]
			}
		}
	}
	var testkeymap = 
	{
		"Q": ["~","A"],
		"q": ["`","1","a"],
		"A": ["~","Q"],
		"a": ["`","1","q"]
	}

	beforeEach(inject(function(_FingerKeyMap_) {
		FingerKeyMap = _FingerKeyMap_;
	}));

	it('it should convert finger to key map properly', function() {
		expect(FingerKeyMap.convertFingerToKey(testfingermap)).toEqual(testkeymap);
	});
})