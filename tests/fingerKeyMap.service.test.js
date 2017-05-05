"use strict";

describe('Finger Key Map Service', function() {
	beforeEach(module("MemPassGen"));

	var FingerKeyMap, testfingermap, testkeymap;


	beforeEach(inject(function(_FingerKeyMap_) {
		FingerKeyMap = _FingerKeyMap_;

		testfingermap = 
		{
			"finger": {
				"shiftOn": ["~","Q","A"],
				"shiftOff": ["`","1","q","a"]
			}
		}
		testkeymap = 
		{
			"Q": ["~","Q","A"],
			"q": ["`","1","q","a"],
			"A": ["~","Q","A"],
			"a": ["`","1","q","a"]
		}
	}));

	it('should convert finger to key map properly', function() {
		expect(FingerKeyMap.convertFingerToKey(testfingermap)).toEqual(testkeymap);
	});

	describe('this.getListOfNearByKeys', function() {
		it('default options should return all values from lowercase and uppercase input', function() {
			var nearbyKeys = FingerKeyMap.getListOfNearByKeys("q", testkeymap, FingerKeyMap.DEFAULT_OPTIONS);
			expect(nearbyKeys.sort()).toEqual(["~","Q","A","`","1","a","q"].sort());
		});

		it('shiftMatch option should return all values just from input minus input', function() {
			var nearbyKeys = FingerKeyMap.getListOfNearByKeys("q", testkeymap, {shiftMatch:true});
			expect(nearbyKeys.sort()).toEqual(["`", "1", "a"].sort());
		});

		it('no includeInput option should return all values from lower/upper case mins input', function() {
			var nearbyKeys = FingerKeyMap.getListOfNearByKeys("a", testkeymap, {includeInput:false});
			expect(nearbyKeys.sort()).toEqual(["`","1","q","~","Q"].sort());
		});

		it('shiftMatch and includeInput option should return all values from input', function() {
			var nearbyKeys = FingerKeyMap.getListOfNearByKeys("A", testkeymap, {includeInput:true, shiftMatch:true});
			expect(nearbyKeys.sort()).toEqual(["~","Q","A"].sort());
		});

		it('closeProx should return those in close proximity map for both upper and lowercase minux input', function() {
			var nearbyKeys = FingerKeyMap.getListOfNearByKeys("a", testkeymap, {closeProx:true});
			expect(nearbyKeys.sort()).toEqual(["q","Q"].sort());
		});

		it('closeProx and shiftMatch should return those in close proximity map minux input', function() {
			var nearbyKeys = FingerKeyMap.getListOfNearByKeys("a", testkeymap, {closeProx:true, shiftMatch:true});
			expect(nearbyKeys.sort()).toEqual(["q"]);
		});

		it('closeProx and includeInput should return those in prox map for both upper and lowercase', function() {
			var nearbyKeys = FingerKeyMap.getListOfNearByKeys("a", testkeymap, {closeProx:true, includeInput:true});
			expect(nearbyKeys.sort()).toEqual(["q","a","Q","A"].sort());
		});
	});

	it('should clone fingerMap properly', function() {
		var newmap = FingerKeyMap.cloneFingerMap(testfingermap);
		newmap.finger.shiftOn = ["!"];
		expect(testfingermap.finger.shiftOn).toEqual(["~", "Q", "A"]);
	});
});