(function () {
'use strict';

angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.lunchMenu;
  $scope.lunchAdvise;

  /**
   * Provide advise on the lunch items entered.
   * Advise for <= three items is "Enjoy!"
   * Adise for > three items is "Too much!"
   * Issue error message when no valid items are entered.
   */
  $scope.checkLunch = function () {
    if ($scope.lunchMenu) {
      var items = $scope.lunchMenu.split(',');

      // Count valid (non-empty) items
      var itemCount = 0;
      for (var i = 0; i < items.length; i++) {
      	if (items[i] && items[i].trim() != '')
      	  itemCount++;
      }

      // Provide advise
      if (itemCount == 0) {
        $scope.lunchAdvise = "Please enter data first";
        $scope.checkTextClass = "invalid-text";
        $scope.checkBorderClass = "invalid-border";
      } else if (itemCount <= 3) {
        $scope.lunchAdvise = "Enjoy!";
        $scope.checkTextClass = "valid-text";
        $scope.checkBorderClass = "valid-border";
      } else {
        $scope.lunchAdvise = "Too much!";
        $scope.checkTextClass = "valid-text";
        $scope.checkBorderClass = "valid-border";
      }
    } else {
      $scope.lunchAdvise = "Please enter data first"; 
      $scope.checkTextClass = "invalid-text";
      $scope.checkBorderClass = "invalid-border";
    }
  };
}

})();
