if (Meteor.isClient) {
  Template.home.helpers({
    number: function() {
      return Session.get("numberEntries");
    }
  });
  Template.home.rendered = function() {
    Meteor.subscribe('getCounter', 'counter-continents');
    Tracker.autorun(function() {
      Session.set("numberEntries",Counter.get('counter-continents'));
    });
  };
  Template.home.events({
    'click #startWizard': function() {
      Router.go('setup', {
        step: 'origin'
      });
    }
  });
  Template.setupWizard.helpers({
    steps: function() {
      return [{
        id: 'origin',
        title: 'Your Origin',
        template: 'setupStepOne',
        formId: 'setup-step-one-form'
      }, {
        id: 'os',
        title: 'Your OS',
        template: 'setupStepTwo',
        formId: 'setup-step-two-form',
        onSubmit: function(data, mergedData) {
          // increase continent counter
          Meteor.call('increaseContinentCount', mergedData.location);
          // increase os counter
          Meteor.call('increaseOsCount', data.os, function(error, result) {
            if (!error) {
              Router.go('/');
            }
          });
        }
      }];
    }
  });

  Template.setupStepOne.helpers({
    schema: function() {
      return new SimpleSchema({
        'name': {
          type: String,
          label: 'Your Name',
          min: 2,
          max: 30
        },
        'location': {
          type: String,
          label: 'Your origin',
          min: 4,
          allowedValues: ['Asia', 'Africa', 'North America', 'South America', 'Antarctica', 'Europe', 'Australia'],
          autoform: {
            options: function() {
              return _.map(['Asia', 'Africa', 'North America', 'South America', 'Antarctica', 'Europe', 'Australia'], function(c, i) {
                return {
                  label: c,
                  value: c
                };
              });
            }
          }
        }
      });
    }
  });

  Template.setupStepTwo.helpers({
    schema: function() {
      return new SimpleSchema({
        'os': {
          type: String,
          label: 'Which OS are you using',
          min: 2,
          max: 30,
          allowedValues: ['Windows', 'Mac', 'Linux'],
          autoform: {
            options: function() {
              return _.map(['Windows', 'Mac', 'Linux'], function(c, i) {
                return {
                  label: c,
                  value: c
                };
              });
            }
          }
        }
      });
    }
  });
}