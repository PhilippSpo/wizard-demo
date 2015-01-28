Counter = function(name, cursor, interval) {
  this.name = name;
  this.cursor = cursor;
  this.interval = interval || 1000 * 10;
  this._collectionName = 'counters-collection';
};

// every cursor must provide a collection name via this method
Counter.prototype._getCollectionName = function() {
  return "counter-" + makeid();
};

// the api to publish
Counter.prototype._publishCursor = function(sub) {
  var self = this;

  var count = 0;
  this.cursor.forEach(function(obj) {
    if (obj.hasOwnProperty('amount')) {
      count += obj.amount;
    }
  });
  sub.added(self._collectionName, self.name, {
    count: count
  });

  var timeoutHandle = Meteor.setInterval(function() {
    var count = 0;
    self.cursor.forEach(function(obj) {
      if (obj.hasOwnProperty('amount')) {
        count += obj.amount;
      }
    });
    sub.changed(self._collectionName, self.name, {
      count: count
    });
  }, self.interval);

  sub.onStop(function() {
    Meteor.clearTimeout(timeoutHandle);
  });
};

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}