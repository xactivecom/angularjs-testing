(function () {
"use strict";

angular.module('public')
	.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService'];
function SignUpController(MenuService) {
  var ctrl = this;

  // UI artifacts
  ctrl.isShowMessage = false;
  ctrl.isShowError = false;

  // Data containers
  ctrl.userPrefs = {};
  ctrl.favoriteDish = {};

  ctrl.signUp = function (form) {
    ctrl.isShowMessage = false;
    ctrl.isShowError = false;

    // Handle invalid form
  	console.log(`signUp`);
  	if (form.$invalid) {
  		return;
  	}

    // Validate favorite dish
    console.log(`calling getFavoriteDish ${ctrl.userPrefs.favoriteDish}`)
	  MenuService.getFavoriteDish(ctrl.userPrefs.favoriteDish)
		  .then(function(response) {
        if (response) {
          ctrl.userPrefs.favoriteDishDetail = response;

          // Save user preferences
          MenuService.saveUserPrefs(ctrl.userPrefs);
          ctrl.isShowMessage = true;            
        }
        else {
          ctrl.isShowError = true;
        }
		  });

  }
}

})();
