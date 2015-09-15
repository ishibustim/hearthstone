(function() {
  var app = angular.module('cardSort', []);

  app.directive('sortButtons', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/sort-buttons.html',
      controller: function() {
        this.sorts = {
          name: ['name'],
          cost: ['cost', 'name'],
          attack: ['attack', 'name'],
          health: ['health', 'name']
        };
        this.sort = this.sorts.name;
        this.sortReversed = false;

        this.setSort = function(newSort) {
          if(this.sort === newSort && !this.sortReversed) {
            this.sort[0] = '-' + this.sort[0];
            this.sortReversed = true;
          }//end if
          else if (this.sort === newSort && this.sortReversed) {
            this.sort[0] = this.sort[0].replace('-', '');
            this.sortReversed = false;
          }//end else if
          else {
            newSort[0] = newSort[0].replace('-', '');
            this.sort = newSort;
          }//end else
        };//end setSort
      },
      controllerAs: 'sortCtrl'
    };
  });
})();
