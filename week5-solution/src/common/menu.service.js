(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  // User preferences
  service.userPrefs = {};

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };

  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }
    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  // Get information on the favorite dish
  service.getFavoriteDish = function (short_name) {
    const url = `${ApiPath}/menu_items/${short_name}.json`;
    return $http.get(url)
      .then(function (response) {
        return response.data;
      }, function (response) {
        return null;
      });
  };

  // Get user preferences
  service.getUserPrefs = function () {
    return service.userPrefs;
  }

  // Save user preferences
  service.saveUserPrefs = function (userPrefs) {
    service.userPrefs = userPrefs;
  }
}

})();
