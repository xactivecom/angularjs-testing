(function () {
'use strict';

angular.module('MenuApp')
  .component('categoriesComponent', {
    templateUrl: 'src/templates/categories.template.html',
    bindings: {
      categories: '<'
    }
  });

})();
