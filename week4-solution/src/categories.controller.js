(function () {
'use strict';

angular.module('MenuApp')
  .controller('CategoriesController', CategoriesController);

// Inject categories collection into the application
CategoriesController.$inject = ['categories'];
function CategoriesController(categories) {
  var menuCategories = this;
  menuCategories.categories = categories;
}

})();
