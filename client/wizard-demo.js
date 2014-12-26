if (Meteor.isClient) {
  Template.home.events({
    'click #startWizard': function() {
      Router.go('setup', {
        step: 'accountInfo'
      });
    }
  });
  Template.setupWizard.helpers({
    steps: function() {
      return [{
        id: 'accountInfo',
        title: 'Step 1. Your account',
        template: 'setupStepOne',
        formId: 'setup-step-one-form'
      }, {
        id: 'confirmInfo',
        title: 'Step 2. Confirm',
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