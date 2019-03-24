(function () {
'use strict';

var shoppingList = [
  { name: "avocados", quantity: 3 },
  { name: "dates", quantity: 12 },
  { name: "lemons", quantity: 5 },
  { name: "mangos", quantity: 2 },
  { name: "pineapple", quantity: 1 },
  { name: "pistachios", quantity: 36 },
  { name: "strawberries", quantity: 24 }
];

angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListService', ShoppingListService);

// Controller for the purchase view
ToBuyController.$inject = ['ShoppingListService'];
function ToBuyController(shoppingListService) {
  var toBuyCtrl = this;

  // Get purchase items from service
  toBuyCtrl.items = shoppingListService.getToBuyItems();

  // Buy item and update remaining purchase list
  toBuyCtrl.boughtItem = function(selectItem) {
    shoppingListService.boughtItem(selectItem);
    toBuyCtrl.items = shoppingListService.getToBuyItems();
  }
}

// Controller for the purchased view
AlreadyBoughtController.$inject = ['ShoppingListService'];
function AlreadyBoughtController(shoppingListService) {
  var boughtCtrl = this;

  // Get bought items from service
  boughtCtrl.items = shoppingListService.getBoughtItems();
}

// Service for communication between controllers
function ShoppingListService() {
  var service = this;

  // Initialization
  var toBuyItems = shoppingList;
  var boughtItems = [];

  // Get the list of purchase items
  service.getToBuyItems = function() {
    return toBuyItems;
  }

  // Get the list of bought items
  service.getBoughtItems = function() {
    return boughtItems;
  }

  // Buy the selected item
  service.boughtItem = function(selectItem) {
    toBuyItems = toBuyItems.filter((item) => { return item.name !== selectItem.name })
    boughtItems.push({ name: selectItem.name, quantity: selectItem.quantity });
  }
}

})();
