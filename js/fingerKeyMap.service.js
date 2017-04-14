angular.module("MemPassGen")
.service('FingerKeyMap', function() {
	this.DEFAULT_FINGER_MAP = {
		"Lpinky": {
			"shiftOn": {
				"symbols": ["~", "!"],
				"chars": ["Q","A","Z"] },
			"shiftOff": {
				"symbols": ["`"],
				"numbers": ["1"],
				"chars": ["q","a","z"] } },
		"Lring": {
			"shiftOn": {
				"symbols": ["@"],
				"chars": ["W","S","X"] },
			"shiftOff": {
				"symbols": [],
				"numbers": ["2"],
				"chars": ["w","s","x"] } },
		"Lmiddle": {
			"shiftOn": {
				"symbols": ["#"],
				"chars": ["E","D","C"] },
			"shiftOff": {
				"symbols": [],
				"numbers": ["3"],
				"chars": ["e","d","c"] } },
		"Lindex": {
			"shiftOn": {
				"symbols": ["$", "%"],
				"chars": ["R","F","V","T","G","B"] },
			"shiftOff": {
				"symbols": [],
				"numbers": ["4","5"],
				"chars": ["r","f","v","t","g","b"] } },
		"Rindex": {
			"shiftOn": {
				"symbols": ["^","&"],
				"chars": ["Y","H","N","U","J","M"] },
			"shiftOff": {
				"symbols": [],
				"numbers": ["6","7"],
				"chars": ["y","h","n","u","j","m"] } },
		"Rmiddle": {
			"shiftOn": {
				"symbols": ["*","<"],
				"chars": ["I","K"] },
			"shiftOff": {
				"symbols": [","],
				"numbers": ["8"],
				"chars": ["i","k"] } },
		"Rring": {
			"shiftOn": {
				"symbols": ["(",">"],
				"chars": ["O","L"] },
			"shiftOff": {
				"symbols": ["."],
				"numbers": ["9"],
				"chars": ["o","l"] } },
		"Rpinky": {
			"shiftOn": {
				"symbols": [")",":","?","_","{","\"","+","}","|"],
				"chars": ["P"] },
			"shiftOff": {
				"symbols": [";","/","-","[","'","=","]","\\"],
				"numbers": ["0"],
				"chars": ["p"] } }
	};

	this.convertFingerToKey = function(fingerMap) {
		var keyMap = {};

		for(var finger in fingerMap) {
			if(fingerMap.hasOwnProperty(finger)) {
				var shiftKeys = fingerMap[finger].shiftOn;
				var notShiftKeys = fingerMap[finger].shiftOff;

				for(var i = 0; i < shiftKeys.chars.length; i++) {
					keyMap[shiftKeys.chars[i]] = [].concat.call([], 
						shiftKeys.symbols, 
						(function() {var x = shiftKeys.chars.slice(); x.splice(i,1); return x;})()
					)
				}

				for(var i = 0; i < notShiftKeys.chars.length; i++) {
					keyMap[notShiftKeys.chars[i]] = [].concat.call([],
						notShiftKeys.symbols,
						notShiftKeys.numbers,
						(function() {var x = notShiftKeys.chars.slice(); x.splice(i,1); return x;})()
					)
				}
			}
		}

		return keyMap;
	}

	this.getListOfNearByKeys = function(char, keyMap, options) {
		if(char in keyMap) {
			var validKeys =  keyMap[char];

			if(!options.shiftMatch) {
				if(char.charCodeAt() >= 97) {
					validKeys = validKeys.concat(keyMap[char.toUpperCase()]);
				}
				else {
					validKeys = validKeys.concat(keyMap[char.toLowerCase()]);
				}
			}
			return validKeys;
		}
		else return undefined;
	}
});