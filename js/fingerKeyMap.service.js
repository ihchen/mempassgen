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

	var PROXIMITY_MAP = {
		'A': ['A','Z','S','W','Q'],
		'B': ['B','V','G','H','N'],
		'C': ['C','X','D','F','V'],
		'D': ['D','S','E','R','F','C','X'],
		'E': ['E','W','S','D','R','#','$'],
		'F': ['F','D','C','V','G','T','R'],
		'G': ['G','F','V','B','H','Y','T'],
		'H': ['H','G','B','N','J','U','Y'],
		'I': ['I','U','J','K','O','*','('],
		'J': ['J','H','N','M','K','U','I'],
		'K': ['K','J','M','I','O','L','<'],
		'L': ['L','K','O','P','<','>',':'],
		'M': ['M','N','J','K','<'],
		'N': ['N','B','H','J','M'],
		'O': ['O','I','K','L','P','(',')'],
		'P': ['P','O','L',':','{',')','_'],
		'Q': ['Q','A','W','!','@'],
		'R': ['R','E','D','F','T','$','%'],
		'S': ['S','A','Z','X','D','E','W'],
		'T': ['T','R','F','G','Y','%','^'],
		'U': ['U','Y','H','J','I','&','*'],
		'V': ['V','C','F','G','B'],
		'W': ['W','Q','A','S','E','@','#'],
		'X': ['X','Z','S','D','C'],
		'Y': ['Y','T','G','H','U','^','&'],
		'Z': ['Z','A','S','X'],
		'a': ['a','z', 's', 'w', 'q'],
		'b': ['b','v', 'g', 'h', 'n'],
		'c': ['c','x', 'd', 'f', 'v'],
		'd': ['d','s', 'e', 'r', 'f', 'c', 'x'],
		'e': ['e','w', 's', 'd', 'r', '3', '4'],
		'f': ['f','d', 'c', 'v', 'g', 't', 'r'],
		'g': ['g','f', 'v', 'b', 'h', 'y', 't'],
		'h': ['h','g', 'b', 'n', 'j', 'u', 'y'],
		'i': ['i','u', 'j', 'k', 'o', '8', '9'],
		'j': ['j','h', 'n', 'm', 'k', 'u', 'i'],
		'k': ['k','j', 'm', 'i', 'o', 'l', ','],
		'l': ['l','k', 'o', 'p', ',', '.', ';'],
		'm': ['m','n', 'j', 'k', ','],
		'n': ['n','b', 'h', 'j', 'm'],
		'o': ['o','i', 'k', 'l', 'p', '9', '0'],
		'p': ['p','o', 'l', ';', '[', '0', '-'],
		'q': ['q','a', 'w', '1', '2'],
		'r': ['r','e', 'd', 'f', 't', '4', '5'],
		's': ['s','a', 'z', 'x', 'd', 'e', 'w'],
		't': ['t','r', 'f', 'g', 'y', '5', '6'],
		'u': ['u','y', 'h', 'j', 'i', '7', '8'],
		'v': ['v','c', 'f', 'g', 'b'],
		'w': ['w','q', 'a', 's', 'e', '2', '3'],
		'x': ['x','z', 's', 'd', 'c'],
		'y': ['y','t', 'g', 'h', 'u', '6', '7'],
		'z': ['z','a', 's', 'x']
	};

	this.DEFAULT_OPTIONS = {
		shiftMatch: false,
		includeInput: true,
		closeProx: false
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
			var closeProxKeys;

			if(!options.shiftMatch) {
				var toggleCaseChar;

				if(char.charCodeAt() >= 97) {
					toggleCaseChar = char.toUpperCase();
				}
				else {
					toggleCaseChar = char.toLowerCase();
				}
				validKeys = validKeys.concat(keyMap[toggleCaseChar]);
				if(options.closeProx) {
					closeProxKeys = PROXIMITY_MAP[char].concat(PROXIMITY_MAP[toggleCaseChar]);
				}
			}
			if(!options.includeInput) {
				validKeys.splice(validKeys.indexOf(char), 1);					
			}
			if(options.closeProx) {
				if(closeProxKeys == undefined) {
					closeProxKeys = PROXIMITY_MAP[char];
				}
				console.log(validKeys," ",closeProxKeys);
				for(var i = 0; i < validKeys.length; i++) {
					var valid = false;
					for(var j = 0; j < closeProxKeys.length; j++) {
						if(validKeys[i] == closeProxKeys[j])
							valid = true;
					}
					if(!valid)
						validKeys.splice(i--, 1);
				}
			}
			return validKeys;
		}
		else return undefined;
	}
});