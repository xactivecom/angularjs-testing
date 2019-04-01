(function () {
'use strict';

angular.module('MenuApp')
  .controller('ItemsController', ItemsController);

// Inject selected category and items collection into the application
ItemsController.$inject = ['category', 'categoryName', 'items'];
function ItemsController(category, categoryName, items) {
  var menuItems = this;
  menuItems.category = category;
  menuItems.categoryName = categoryName;
  menuItems.items = items;
}

})();
