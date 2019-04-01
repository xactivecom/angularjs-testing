(function () {
'use strict';

angular.module('data')
  .service('MenuDataService', MenuDataService)
  .constant('MenuDataUrl', 'https://davids-restaurant.herokuapp.com');

//MenuDataService.$inject = ['$q', '$timeout']
MenuDataService.$inject = ['$http', 'MenuDataUrl']
function MenuDataService($http, MenuDataUrl) {
  var service = this;

  // Category cache
  var allCategories = null;

  // Test categories
  // var testCategories = [
  //   {
  //     "id":10, 
  //     "short_name": "B", 
  //     "name": "Breakfast", 
  //     "special_instructions": "", 
  //     "url": "https://davids-restaurant.herokuapp.com/categories/10.json"
  //   },
  //   {
  //     "id":20, 
  //     "short_name": "L", 
  //     "name": "Lunch", 
  //     "special_instructions": "Seasonal", 
  //     "url": "https://davids-restaurant.herokuapp.com/categories/20.json"
  //   }
  // ];

  // Test items
  // var testItemsA = [
  //   {
  //     "id": 100,
  //     "short_name": "BB",
  //     "name": "Big Breakfast",
  //     "description": "three eggs with bacon or sausage",
  //     "price_small": 4.50,
  //     "price_large": 5.00,
  //     "small_portion_name":"two eggs",
  //     "large_portion_name":"three eggs"
  //   },
  //   {
  //     "id": 101,
  //     "short_name": "BC",
  //     "name": "Big Cake",
  //     "description": "three pancakes with bacon or sausage",
  //     "price_small": 5.50,
  //     "price_large": 7.00,
  //     "small_portion_name":"two pancakes",
  //     "large_portion_name":"three pancakes"
  //   }
  // ];
  // var testItemsL = [
  //   {
  //     "id": 200,
  //     "short_name": "BL",
  //     "name": "Club Sandwich with Chicken",
  //     "description": "chicken-stuffed club sandwich with fries or salad",
  //     "price_small": 6.00,
  //     "price_large": 9.00,
  //     "small_portion_name": "sandwich only",
  //     "large_portion_name": "includes fries or salad"
  //   },
  //   {
  //     "id": 201,
  //     "short_name": "BL",
  //     "name": "Pasta with Chicken",
  //     "description": "Penne pasta bowl with garlic bread",
  //     "price_small": 8.00,
  //     "price_large": 9.00,
  //     "small_portion_name": "no garlic bread",
  //     "large_portion_name": "includes garlic bread"
  //   }
  // ];

  // Get all categories
  service.getAllCategories = function() {
    var url = `${MenuDataUrl}/categories.json`;
    //console.log(`enter getAllCategories ${url}`);

    return $http.get(url)
      .then(function(response) {
        allCategories = response.data;
        return response.data;
      });
  	// var deferred = $q.defer();
  	// $timeout(function() {
  	//   deferred.resolve(testCategories);
  	// }, 1000);
  	// return deferred.promise;
  }

 // Call name for category shortName>
   service.getNameForCategory = function(shortName) {
    var searchTerm = shortName.toLowerCase();
    //console.log(`enter getNameForCategory ${searchTerm}`);
    
    var found = [];
    if (allCategories) {
      found = allCategories.filter(cat => {
        return (cat.short_name.toLowerCase().indexOf(searchTerm) !== -1);
      }, []);
    }
    else {
      console.log('no category info');
    }
    return (found && found[0]) ? found[0].name : "";
  };

  // Call menu items for category shortName
  service.getItemsForCategory = function(shortName) {
    var url = `${MenuDataUrl}/menu_items.json?category=${shortName}`;
    //console.log(`enter getItemsForCategory ${url}`);

    return $http.get(url)
      .then(function(response) {
        return response.data.menu_items;
      });
  	// var deferred = $q.defer();
  	// $timeout(function() {
  	//   deferred.resolve(shortName === 'B' ? testItemsA : testItemsL);
  	// }, 1000);
  	// return deferred.promise;
  }
}

})();
