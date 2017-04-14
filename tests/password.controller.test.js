describe('Password Controller', function() {
	beforeEach(module("MemPassGen"));

	var controller, FingerKeyMap;

	beforeEach(inject(function($controller, _FingerKeyMap_){
		FingerKeyMap = _FingerKeyMap_;
		controller = $controller('PasswordController', {FingerKeyMap: FingerKeyMap});
	}));

	it('returns valid nearby keys', function() {
		expect(controller.getListOfNearByKeys('s', controller.keyMap).sort()).toEqual(['x','w','2','@','W','X'].sort())
	});
});