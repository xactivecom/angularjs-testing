(function () {
'use strict';

angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('MenuServiceBasePath', 'https://davids-restaurant.herokuapp.com')
  .directive('foundItems', FoundItemsDirective);

// Controller for the menu search
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menuCtrl = this;
  menuCtrl.searchTerm = "";
  menuCtrl.found = [];

  // Delegate menu search to service
  menuCtrl.search = function() {
    // Check for no input
    if (menuCtrl.searchTerm === "") {
      return;
    }

    var promise = MenuSearchService.getMatchedMenuItems(menuCtrl.searchTerm);
    promise.then(function(response) {
      menuCtrl.found = response;
      //console.log(`searched ${JSON.stringify(menuCtrl.found)}`);
    })
    .catch(error => {
      console.log(error);
    });
  }

  // Remove menu item
  menuCtrl.removeItem = function(itemIndex) {
    menuCtrl.found.splice(itemIndex, 1);
  }
}

// Service to process menu items information
MenuSearchService.$inject = ['$http', 'MenuServiceBasePath'];
function MenuSearchService($http, MenuServiceBasePath) {
  var service = this;

  // Get the menu items that match the search criteria
  service.getMatchedMenuItems = function(searchTerm) {
    var searchTerm = searchTerm.toLowerCase();
    return $http({
      method: 'GET',
      url: `${MenuServiceBasePath}/menu_items.json`
    })
    .then(result => {
      var foundItems = [];
      if (result.data) {
        var menuItems = result.data.menu_items;
        foundItems = menuItems.filter(item => {
          return (item.description.toLowerCase().indexOf(searchTerm) !== -1);
        }, []);
      }
      else {
       console.log('No result data returned from API');
      }
      return foundItems;
    });
  }
}

// Directive to display menu items
function FoundItemsDirective() {
  return {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };
}

function FoundItemsDirectiveController() {
  var list = this;

  // Check if list is empty
  list.checkFoundList = function () {
    return typeof list.items !== 'undefined' && list.items.length === 0
  };
}

})();
