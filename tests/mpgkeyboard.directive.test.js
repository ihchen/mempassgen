"use strict";

describe('mpgKeyboard Directive', function() {
	var scope, keyboard, controller;

	beforeEach(function() {
		module('MemPassGen');
		module('templates');
		inject(function(_$rootScope_, $compile, _FingerKeyMap_) {
			scope = _$rootScope_;
			scope.testFingerMap = _FingerKeyMap_.DEFAULT_FINGER_MAP;
			var element = angular.element(`<mpg-keyboard current-map="testFingerMap"></mpg-keyboard>`);
			keyboard = $compile(element)(scope);
			scope.$digest();
			controller = element.controller('mpgKeyboard');
		});
	});

	describe('link function', function() {
		it('should reveal real-menu and hide init-menu on mpgKey mouseup', function() {
			keyboard.find('mpg-key').triggerHandler('mouseup');
			expect(keyboard.html()).toContain('<div class="init-menu" style="display: none;">');
			expect(keyboard.html()).toContain('<div class="real-menu" style="display: block;">');
		});
	});

	describe('mpgKey', function() {
		it('should update currentKey when a mpgKey is clicked', function() {
			var mpgkey = angular.element(keyboard.find('mpg-key')[0]);
			mpgkey.triggerHandler('click');
			expect(controller.currentKey).toEqual(mpgkey);
		});
	});

	describe('controller.updateFingerMap', function() {
		describe('change html properties', function() {
			var mpgkey;
			
			beforeEach(function() {
				mpgkey = angular.element(keyboard.find('mpg-key')[0]);
				mpgkey.triggerHandler('click');
				angular.element(keyboard.find('button')[2]).triggerHandler('click');	// Lring button
			});

			it('should change the finger (color) class properly', function() {
				expect(mpgkey.hasClass('ring')).toBeTruthy();
				expect(mpgkey.hasClass('pinky')).toBeFalsy();
			});

			it('should change the attributes properly', function() {
				expect(mpgkey.attr('finger')).toBe('Lring');
			});
		});

		describe('change finger map values', function() {
			it('should update finger map properly for letters', function() {
				var mpgkey = angular.element(keyboard.find('mpg-key')[13]);	// Q key
				mpgkey.triggerHandler('click');
				angular.element(keyboard.find('button')[2]).triggerHandler('click');

				expect(controller.fingerMap.Lpinky.shiftOn).not.toContain("Q");
				expect(controller.fingerMap.Lpinky.shiftOff).not.toContain("q");
				expect(controller.fingerMap.Lring.shiftOn).toContain("Q");
				expect(controller.fingerMap.Lring.shiftOff).toContain("q");
			});

			it('should update finger map properly for symbols', function() {
				var mpgkey = angular.element(keyboard.find('mpg-key')[0]);
				mpgkey.triggerHandler('click');
				angular.element(keyboard.find('button')[2]).triggerHandler('click');

				expect(controller.fingerMap.Lpinky.shiftOn).not.toContain("~");
				expect(controller.fingerMap.Lpinky.shiftOff).not.toContain("`");
				expect(controller.fingerMap.Lring.shiftOn).toContain("~");
				expect(controller.fingerMap.Lring.shiftOff).toContain("`");
			});

			it('should update finger map properly for numbers', function() {
				var mpgkey = angular.element(keyboard.find('mpg-key')[1]);
				mpgkey.triggerHandler('click');
				angular.element(keyboard.find('button')[2]).triggerHandler('click');

				expect(controller.fingerMap.Lpinky.shiftOn).not.toContain("!");
				expect(controller.fingerMap.Lpinky.shiftOff).not.toContain("1");
				expect(controller.fingerMap.Lring.shiftOn).toContain("!");
				expect(controller.fingerMap.Lring.shiftOff).toContain("1");
			});
		});
	});

	describe('controller.clearFingerMapChanges', function() {
		var clearBtn, mpgKey;

		beforeEach(function() {
			mpgKey = angular.element(keyboard.find('mpg-key')[0]);
			mpgKey.triggerHandler('click');
			angular.element(keyboard.find('button')[2]).triggerHandler('click');	// Lring button

			clearBtn = keyboard.find('button');
			clearBtn = angular.element(clearBtn[clearBtn.length-1]);
			clearBtn.triggerHandler('click');
		});

		it('should replace keyboard fingerMap with currentMap', function() {
			expect(controller.fingerMap).toEqual(keyboard.isolateScope().currentMap);
		});

		it('should change color class on differing elements', function() {
			expect(mpgKey.hasClass('pinky')).toBeTruthy();
			expect(mpgKey.hasClass('ring')).toBeFalsy();
		});

		it('should change finger attribute on differing elements', function() {
			expect(mpgKey.attr('finger')).toBe('Lpinky');
		});
	});

	describe('active key', function() {
		it('clicked key should add active class', function() {
			var mpgKey = angular.element(keyboard.find('mpg-key')[0]);
			mpgKey.triggerHandler('click');
			expect(mpgKey.hasClass('active')).toBeTruthy();
		});

		it('clicking a key should remove active class from previously active key', function() {
			var mpgKey = angular.element(keyboard.find('mpg-key')[0]);
			mpgKey.triggerHandler('click');
			angular.element(keyboard.find('mpg-key')[1]).triggerHandler('click');
			expect(mpgKey.hasClass('active')).toBeFalsy();
		});
	});
});