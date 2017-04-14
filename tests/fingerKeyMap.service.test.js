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
		"Q": ["~","Q","A"],
		"q": ["`","1","q","a"],
		"A": ["~","Q","A"],
		"a": ["`","1","q","a"]
	}

	beforeEach(inject(function(_FingerKeyMap_) {
		FingerKeyMap = _FingerKeyMap_;
	}));

	it('it should convert finger to key map properly', function() {
		expect(FingerKeyMap.convertFingerToKey(testfingermap)).toEqual(testkeymap);
	});

	describe('this.getListOfNearByKeys', function() {
		it('no options should return all values from lowercase and uppercase input minus input', function() {
			var nearbyKeys = FingerKeyMap.getListOfNearByKeys("q", testkeymap, {});
			expect(nearbyKeys.sort()).toEqual(["~","Q","A","`","1","a"].sort());
		});

		it('shiftMatch option should return all values just from input minus input', function() {
			var nearbyKeys = FingerKeyMap.getListOfNearByKeys("q", testkeymap, {shiftMatch:true});
			expect(nearbyKeys.sort()).toEqual(["`", "1", "a"].sort());
		});

		it('includeInput option should return all values from lower/upper case input', function() {
			var nearbyKeys = FingerKeyMap.getListOfNearByKeys("a", testkeymap, {includeInput:true});
			expect(nearbyKeys.sort()).toEqual(["`","1","q","a","~","Q","A"].sort());
		});

		it('shiftMatch and includeInput option should return all values from input', function() {
			var nearbyKeys = FingerKeyMap.getListOfNearByKeys("A", testkeymap, {includeInput:true, shiftMatch:true});
			expect(nearbyKeys.sort()).toEqual(["~","Q","A"].sort());
		});
	});
});