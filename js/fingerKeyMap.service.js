angular.module("MemPassGen")
.service('FingerKeyMap', function() {
	this.DEFAULT_OPTIONS = {
		shiftMatch: false,
		includeInput: false
	}

	this.convertFingerToKey = function(fingerMap) {
		var keyMap = {};

		for(var finger in fingerMap) {
			if(fingerMap.hasOwnProperty(finger)) {
				var shiftKeys = fingerMap[finger].shiftOn;
				var notShiftKeys = fingerMap[finger].shiftOff;

				for(var i = 0; i < shiftKeys.chars.length; i++) {
					keyMap[shiftKeys.chars[i]] = [].concat.call([], 
						shiftKeys.symbols, 
						shiftKeys.chars
					)
				}

				for(var i = 0; i < notShiftKeys.chars.length; i++) {
					keyMap[notShiftKeys.chars[i]] = [].concat.call([],
						notShiftKeys.symbols,
						notShiftKeys.numbers,
						notShiftKeys.chars
					)
				}
			}
		}

		return keyMap;
	}

	this.getListOfNearByKeys = function(char, keyMap, options) {
		if(char in keyMap) {
			var validKeys =  keyMap[char].slice();

			if(!options.shiftMatch) {
				if(char.charCodeAt() >= 97) {
					validKeys = validKeys.concat(keyMap[char.toUpperCase()]);
				}
				else {
					validKeys = validKeys.concat(keyMap[char.toLowerCase()]);
				}
			}
			if(!options.includeInput) {
				validKeys.splice(validKeys.indexOf(char), 1);					
			}
			return validKeys;
		}
		else return undefined;
	}

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

	this.PROXIMITY_MAP = {
		'A': ['Z','S','W','Q'],
		'B': ['V','G','H','N'],
		'C': ['X','D','F','V'],
		'D': ['S','E','R','F','C','X'],
		'E': ['W','S','D','R','#','$'],
		'F': ['D','C','V','G','T','R'],
		'G': ['F','V','B','H','Y','T'],
		'H': ['G','B','N','J','U','Y'],
		'I': ['U','J','K','O','*','('],
		'J': ['H','N','M','K','U','I'],
		'K': ['J','M','I','O','L','<'],
		'L': ['K','O','P','<','>',':'],
		'M': ['N','J','K','<'],
		'N': ['B','H','J','M'],
		'O': ['I','K','L','P','(',')'],
		'P': ['O','L',':','{',')','_'],
		'Q': ['A','W','!','@'],
		'R': ['E','D','F','T','$','%'],
		'S': ['A','Z','X','D','E','W'],
		'T': ['R','F','G','Y','%','^'],
		'U': ['Y','H','J','I','&','*'],
		'V': ['C','F','G','B'],
		'W': ['Q','A','S','E','@','#'],
		'X': ['Z','S','D','C'],
		'Y': ['T','G','H','U','^','&'],
		'Z': ['A','S','X'],
		'a': ['z', 's', 'w', 'q'],
		'b': ['v', 'g', 'h', 'n'],
		'c': ['x', 'd', 'f', 'v'],
		'd': ['s', 'e', 'r', 'f', 'c', 'x'],
		'e': ['w', 's', 'd', 'r', '3', '4'],
		'f': ['d', 'c', 'v', 'g', 't', 'r'],
		'g': ['f', 'v', 'b', 'h', 'y', 't'],
		'h': ['g', 'b', 'n', 'j', 'u', 'y'],
		'i': ['u', 'j', 'k', 'o', '8', '9'],
		'j': ['h', 'n', 'm', 'k', 'u', 'i'],
		'k': ['j', 'm', 'i', 'o', 'l', ','],
		'l': ['k', 'o', 'p', ',', '.', ';'],
		'm': ['n', 'j', 'k', ','],
		'n': ['b', 'h', 'j', 'm'],
		'o': ['i', 'k', 'l', 'p', '9', '0'],
		'p': ['o', 'l', ';', '[', '0', '-'],
		'q': ['a', 'w', '1', '2'],
		'r': ['e', 'd', 'f', 't', '4', '5'],
		's': ['a', 'z', 'x', 'd', 'e', 'w'],
		't': ['r', 'f', 'g', 'y', '5', '6'],
		'u': ['y', 'h', 'j', 'i', '7', '8'],
		'v': ['c', 'f', 'g', 'b'],
		'w': ['q', 'a', 's', 'e', '2', '3'],
		'x': ['z', 's', 'd', 'c'],
		'y': ['t', 'g', 'h', 'u', '6', '7'],
		'z': ['a', 's', 'x']
	};
});