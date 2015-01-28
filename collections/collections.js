Continents = new Mongo.Collection('continents');
OperatingSystems = new Mongo.Collection('operatingSystems');

Counter = {};
Counter.collection = new Meteor.Collection('counters-collection');

Counter.get = function(name) {
  var doc = Counter.collection.findOne(name);
  if(doc) {
    return doc.count;
  } else {
    return 0;
  }
};