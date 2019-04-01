(function () {
'use strict';

angular.module('MenuApp')
  .config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {
  // Default route
  $urlRouterProvider.otherwise('/');

  $stateProvider
  	.state('home', {
  	  // Home page
  	  url: '/',
  	  templateUrl: 'src/views/home.html'
  	})

  	.state('categories', {
  	  // Category selection page
  	  url: '/categories',
  	  templateUrl: 'src/views/categories.html',
  	  controller: 'CategoriesController as menuCategories',
  	  resolve: {
  	  	categories: ['MenuDataService', function(MenuDataService) {
  	  	  return MenuDataService.getAllCategories();
  	  	}]
  	  }
  	})

  	.state('items', {
  	  // Category items page
  	  url: '/items?category',
  	  templateUrl: 'src/views/items.html',
  	  controller: 'ItemsController as menuItems',
  	  resolve: {
  	  	category: ['$stateParams', function($stateParams) {
  	  	  return $stateParams.category;
  	  	}],
  	  	categoryName: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {
  	  	  return MenuDataService.getNameForCategory($stateParams.category);  	  		
  	  	}],
  	  	items: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {
  	  	  return MenuDataService.getItemsForCategory($stateParams.category);  	  		
  	  	}]
  	  }
  	});
}

})();
