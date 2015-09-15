(function() {
  var app = angular.module('Hearthstone', ['cardSort', 'cardFilter']);

  app.controller('HearthstoneController', ['$http', function($http) {
    this.title = 'Hearthstone';
    this.info = 'by Randy Ehret';
    this.imgBase = 'http://wow.zamimg.com/images/hearthstone/cards/enus/original/';
    this.imgSuffix = '.png';
    this.cards = this.cards || [];
    var that = this;

    // load card array
    $http.get('AllSets.json').success(function(data) {
      for (var cardSet in data) {
        for (var card in data[cardSet]) {
          if ((data[cardSet][card].collectible || data[cardSet][card].type === 'Minion')
            && data[cardSet][card].type !== 'Hero'
            && data[cardSet][card].type !== 'Hero Power'
            && data[cardSet][card].id !== 'XXX_094'
            && data[cardSet][card].id !== 'PlaceholderCard') {
            data[cardSet][card].attack = data[cardSet][card].attack || -1;
            data[cardSet][card].health = data[cardSet][card].health || -1;
            that.cards.push(data[cardSet][card]);
          }//end if
        }//end for
      }//end for
    });

  }]);//end HearthstoneController

})();
