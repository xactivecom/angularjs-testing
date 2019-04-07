(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['MenuService', 'ApiPath'];
function MyInfoController (MenuService, ApiPath) {
  var ctrl = this;

  // Image URL
  ctrl.apiPath = ApiPath;

  // Signed up indicator
  ctrl.isSignedUp = false;

  // Get user preferences, and determine if signed up 
  ctrl.userPrefs = MenuService.getUserPrefs();
  //console.log(`check ${JSON.stringify(ctrl.userPrefs)}`)
  ctrl.isSignedUp = (ctrl.userPrefs && ctrl.userPrefs.favoriteDish);
}

})();
