(function() {
  var app = angular.module('cardFilter', []);

  app.directive('cardFilter', function() {
    return {
      controller: function() {
        this.filter = '';
      },//end controller
      controllerAs: 'filterCtrl'
    };
  });

  app.directive('collectibleCheckbox', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/collectible-checkbox.html',
      controller: function() {
        this.onlyCollectible = true;
      },//end controller
      controllerAs: 'collectibleCtrl'
    };
  });

  app.filter('cardSearch', function() {
    return function(input, filter, onlyCollectible) {
      filter = filter || '';
      var filters = ['cost', 'attack', 'health', 'type', 'race'];
      var filterArray = filter.split(/\s/);
      var out = [];
      input.forEach(function(card) {
        if (!onlyCollectible || card.collectible) {
          var cardSearchPerformed = false;
          var cardSearchPassed = false;
          var cardFilterPassed = true;
          filterArray.forEach( function(query) {
            if (query.indexOf(':') === -1) {
              cardSearchPerformed = true;
              if (equal(card.name, query)) {
                cardSearchPassed = true;
              }//end if
            }//end if
            // process filters
            else if (query.indexOf(':') !== -1) {
              filters.forEach(function(cardFilter) {
                if(query.indexOf(cardFilter) === 0) {
                  var filterSearch = query.substr(query.indexOf(':') + 1);
                  var filterSearchArray = filterSearch.split(',');
                  var onePassed = false;
                  filterSearchArray.forEach(function(value) {
                    if(!value.length || (card.hasOwnProperty(cardFilter) && equal(card[cardFilter], value))) {
                      onePassed = true;
                    }//end if
                  });//end forEach
                  if (!onePassed) {
                    cardFilterPassed = false;
                  }//end if
                }//end if
              });//end forEach
            }//end else if
          });//end forEach
          if ((!cardSearchPerformed || cardSearchPassed) && cardFilterPassed) {
            out.push(card);
          }//end if
        }//end if
      });//end forEach
      return out;
    };
  });

  function equal(val1, val2) {
    var stringComp = true;
    if (typeof(val1) === 'string') {
      val1 = val1.toLowerCase();
    }//end if
    else {
      stringComp = false;
    }//end else
    if (typeof(val2) === 'string') {
      val2 = val2.toLowerCase();
    }//end if
    else {
      stringComp = false;
    }//end else

    if (stringComp) {
      return val1.indexOf(val2) !== -1;
    }//end if
    else {
      return val1 == val2;
    }//end else
  }

})();
